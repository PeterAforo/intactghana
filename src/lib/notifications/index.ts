import { sendSMS } from "./sms";
import { sendEmail } from "./email";
import { formatPrice } from "@/lib/utils";

interface OrderItem {
  productName: string;
  variantName: string;
  quantity: number;
  price: number | { toNumber(): number };
}

export async function sendOrderConfirmationSMS({
  to,
  orderNumber,
  total,
}: {
  to: string;
  orderNumber: string;
  total: number;
}) {
  const message = `Intact Ghana: Your order ${orderNumber} has been confirmed! Total: ${formatPrice(total)}. We'll notify you when it ships. Thank you for shopping with us!`;
  
  return sendSMS(to, message);
}

export async function sendOrderConfirmationEmail({
  to,
  orderNumber,
  total,
  items,
}: {
  to: string;
  orderNumber: string;
  total: number;
  items: OrderItem[];
}) {
  const itemsList = items.map((item) => {
    const price = typeof item.price === 'object' ? item.price.toNumber() : item.price;
    return `- ${item.productName} (${item.variantName}) x${item.quantity} - ${formatPrice(price * item.quantity)}`;
  }).join("\n");

  const html = `
    <h1>Order Confirmed!</h1>
    <p>Thank you for your order at Intact Ghana.</p>
    <h2>Order #${orderNumber}</h2>
    <h3>Items:</h3>
    <pre>${itemsList}</pre>
    <p><strong>Total: ${formatPrice(total)}</strong></p>
    <p>We'll send you another email when your order ships.</p>
    <p>Thank you for shopping with us!</p>
  `;

  return sendEmail({
    to,
    subject: `Order Confirmed - ${orderNumber}`,
    html,
  });
}

export async function sendOrderShippedSMS({
  to,
  orderNumber,
  trackingNumber,
}: {
  to: string;
  orderNumber: string;
  trackingNumber?: string;
}) {
  let message = `Intact Ghana: Your order ${orderNumber} has been shipped!`;
  if (trackingNumber) {
    message += ` Tracking: ${trackingNumber}`;
  }
  message += " Thank you!";
  
  return sendSMS(to, message);
}

export async function sendOrderDeliveredSMS({
  to,
  orderNumber,
}: {
  to: string;
  orderNumber: string;
}) {
  const message = `Intact Ghana: Your order ${orderNumber} has been delivered! We hope you enjoy your purchase. Please leave a review!`;
  
  return sendSMS(to, message);
}

export async function sendPaymentFailedSMS({
  to,
  orderNumber,
}: {
  to: string;
  orderNumber: string;
}) {
  const message = `Intact Ghana: Payment for order ${orderNumber} failed. Please try again or contact support.`;
  
  return sendSMS(to, message);
}

export { sendSMS } from "./sms";
export { sendEmail } from "./email";
