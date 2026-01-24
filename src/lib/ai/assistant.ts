import { db } from "@/lib/db";
import { searchProducts } from "@/lib/search";

export interface AIMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface AIAction {
  type: "search" | "recommend" | "compare" | "add_to_cart" | "get_policy" | "check_stock";
  input: Record<string, unknown>;
  output?: Record<string, unknown>;
}

export interface AIResponse {
  message: string;
  actions: AIAction[];
  products?: Array<{
    id: string;
    name: string;
    slug: string;
    price: number;
    brand: string | null;
  }>;
  shouldEscalate?: boolean;
}

const SYSTEM_PROMPT = `You are the Intact Ghana AI Shopping Assistant. You help customers find electronics and technology products.

CAPABILITIES:
- Search and recommend products based on customer needs
- Compare products within the same category
- Explain product specifications
- Answer questions about delivery, warranty, and return policies
- Add items to cart when requested

RULES:
1. NEVER make up product information - only use data from search results
2. NEVER hallucinate prices or stock availability
3. Always be helpful and friendly
4. If you don't know something, say so and offer to connect with human support
5. Keep responses concise but informative
6. When recommending products, explain WHY they match the customer's needs

POLICIES SUMMARY:
- Delivery: 1-2 days in Greater Accra, 2-7 days other regions
- Free delivery on orders above GHS 500 in Greater Accra
- Returns: 7-day return policy for unopened items
- Warranty: All products come with manufacturer warranty as specified
- Payment: MTN MoMo, Vodafone Cash, AirtelTigo Money, Cards, Bank Transfer`;

export async function processUserMessage(
  userMessage: string,
  conversationHistory: AIMessage[],
  sessionId?: string,
  userId?: string
): Promise<AIResponse> {
  const actions: AIAction[] = [];
  let products: AIResponse["products"] = [];

  // Detect intent from user message
  const lowerMessage = userMessage.toLowerCase();

  // Search intent
  if (
    lowerMessage.includes("looking for") ||
    lowerMessage.includes("need") ||
    lowerMessage.includes("want") ||
    lowerMessage.includes("show me") ||
    lowerMessage.includes("find") ||
    lowerMessage.includes("search")
  ) {
    const searchResults = await handleSearchIntent(userMessage);
    actions.push({
      type: "search",
      input: { query: userMessage },
      output: { count: searchResults?.length || 0 },
    });
    products = searchResults || [];
  }

  // Compare intent
  if (lowerMessage.includes("compare") || lowerMessage.includes("difference between")) {
    const comparisonResult = await handleCompareIntent(userMessage);
    actions.push({
      type: "compare",
      input: { query: userMessage },
      output: comparisonResult,
    });
  }

  // Policy questions
  if (
    lowerMessage.includes("delivery") ||
    lowerMessage.includes("shipping") ||
    lowerMessage.includes("return") ||
    lowerMessage.includes("warranty") ||
    lowerMessage.includes("refund")
  ) {
    const policyInfo = await handlePolicyIntent(userMessage);
    actions.push({
      type: "get_policy",
      input: { query: userMessage },
      output: { policy: policyInfo },
    });
  }

  // Stock check
  if (lowerMessage.includes("in stock") || lowerMessage.includes("available")) {
    actions.push({
      type: "check_stock",
      input: { query: userMessage },
    });
  }

  // Generate response based on actions and context
  const response = generateResponse(userMessage, actions, products, conversationHistory);

  // Log conversation
  if (sessionId || userId) {
    await logConversation(userMessage, response.message, actions, sessionId, userId);
  }

  return response;
}

async function handleSearchIntent(query: string): Promise<AIResponse["products"]> {
  // Extract search terms
  const searchTerms = extractSearchTerms(query);
  
  const results = await searchProducts({
    query: searchTerms,
    limit: 5,
  });

  return results.results.map((r) => ({
    id: r.id,
    name: r.name,
    slug: r.slug,
    price: r.price,
    brand: r.brand,
  }));
}

async function handleCompareIntent(query: string): Promise<Record<string, unknown>> {
  // Extract product names to compare
  const products = await db.product.findMany({
    where: { isActive: true },
    include: {
      variants: { take: 1 },
      attributeValues: { include: { attribute: true } },
    },
    take: 2,
  });

  if (products.length < 2) {
    return { error: "Not enough products to compare" };
  }

  return {
    products: products.map((p) => ({
      name: p.name,
      brand: p.brand,
      price: p.variants[0] ? Number(p.variants[0].price) : 0,
      specs: p.attributeValues.map((av) => ({
        name: av.attribute.name,
        value: av.value,
      })),
    })),
  };
}

async function handlePolicyIntent(query: string): Promise<string> {
  const lowerQuery = query.toLowerCase();

  if (lowerQuery.includes("delivery") || lowerQuery.includes("shipping")) {
    const policy = await db.policy.findFirst({ where: { type: "DELIVERY" } });
    return policy?.summary || "Delivery: 1-2 days in Greater Accra, 2-7 days for other regions. Free delivery on orders above GHS 500 in Greater Accra.";
  }

  if (lowerQuery.includes("return") || lowerQuery.includes("refund")) {
    const policy = await db.policy.findFirst({ where: { type: "RETURN" } });
    return policy?.summary || "7-day return policy for unopened items in original packaging.";
  }

  if (lowerQuery.includes("warranty")) {
    const policy = await db.policy.findFirst({ where: { type: "WARRANTY" } });
    return policy?.summary || "All products come with manufacturer warranty as specified on the product page.";
  }

  return "Please visit our Help Center for detailed policy information.";
}

function extractSearchTerms(query: string): string {
  // Remove common phrases to get search terms
  const removePatterns = [
    /i('m| am) looking for/gi,
    /i need/gi,
    /i want/gi,
    /show me/gi,
    /can you find/gi,
    /do you have/gi,
    /please/gi,
  ];

  let terms = query;
  for (const pattern of removePatterns) {
    terms = terms.replace(pattern, "");
  }

  return terms.trim();
}

function generateResponse(
  userMessage: string,
  actions: AIAction[],
  products: AIResponse["products"],
  history: AIMessage[]
): AIResponse {
  let message = "";

  // Check if we found products
  if (products && products.length > 0) {
    message = `I found ${products.length} products that might interest you:\n\n`;
    products.forEach((p, i) => {
      message += `${i + 1}. **${p.name}**${p.brand ? ` by ${p.brand}` : ""} - GHS ${p.price.toLocaleString()}\n`;
    });
    message += "\nWould you like more details about any of these, or should I help you compare them?";
  }

  // Check for policy responses
  const policyAction = actions.find((a) => a.type === "get_policy");
  if (policyAction?.output?.policy) {
    message = policyAction.output.policy as string;
  }

  // Default response if no specific action matched
  if (!message) {
    message = "I'd be happy to help you find the perfect product! Could you tell me more about what you're looking for? For example:\n\n- What type of device (laptop, phone, tablet)?\n- What's your budget?\n- Any specific features you need?";
  }

  return {
    message,
    actions,
    products,
    shouldEscalate: false,
  };
}

async function logConversation(
  userMessage: string,
  assistantMessage: string,
  actions: AIAction[],
  sessionId?: string,
  userId?: string
): Promise<void> {
  try {
    // Find or create conversation
    let conversation = await db.aIConversation.findFirst({
      where: sessionId ? { sessionId } : { userId },
      orderBy: { createdAt: "desc" },
    });

    if (!conversation || Date.now() - conversation.updatedAt.getTime() > 30 * 60 * 1000) {
      // Create new conversation if none exists or last one is older than 30 minutes
      conversation = await db.aIConversation.create({
        data: { userId, sessionId },
      });
    }

    // Log messages
    await db.aIMessage.createMany({
      data: [
        { conversationId: conversation.id, role: "USER", content: userMessage },
        { conversationId: conversation.id, role: "ASSISTANT", content: assistantMessage },
      ],
    });

    // Log actions
    for (const action of actions) {
      await db.aIAction.create({
        data: {
          conversationId: conversation.id,
          type: action.type.toUpperCase() as "SEARCH_PRODUCTS" | "GET_PRODUCT_DETAILS" | "COMPARE_PRODUCTS" | "ADD_TO_CART" | "CHECK_STOCK" | "GET_POLICY" | "RECOMMEND_PRODUCTS" | "ESCALATE_TO_HUMAN",
          input: JSON.parse(JSON.stringify(action.input)),
          output: action.output ? JSON.parse(JSON.stringify(action.output)) : undefined,
          status: "SUCCESS",
        },
      });
    }
  } catch (error) {
    console.error("Failed to log conversation:", error);
  }
}

export async function escalateToHuman(
  conversationId: string,
  reason: string
): Promise<{ ticketNumber: string }> {
  const conversation = await db.aIConversation.findUnique({
    where: { id: conversationId },
    include: {
      messages: { orderBy: { createdAt: "asc" } },
      user: true,
    },
  });

  if (!conversation) {
    throw new Error("Conversation not found");
  }

  // Create summary of conversation
  const summary = conversation.messages
    .map((m) => `${m.role}: ${m.content}`)
    .join("\n");

  // Create support ticket
  const ticketNumber = `TKT-${Date.now().toString(36).toUpperCase()}`;

  await db.supportTicket.create({
    data: {
      ticketNumber,
      userId: conversation.userId,
      subject: `AI Escalation: ${reason}`,
      category: "OTHER",
      priority: "MEDIUM",
      messages: {
        create: {
          senderType: "AI",
          content: `AI Assistant escalated this conversation.\n\nReason: ${reason}\n\nConversation Summary:\n${summary}`,
        },
      },
    },
  });

  // Mark conversation as escalated
  await db.aIConversation.update({
    where: { id: conversationId },
    data: { escalated: true, summary },
  });

  return { ticketNumber };
}
