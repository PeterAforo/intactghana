const MNOTIFY_API_URL = "https://apps.mnotify.net/smsapi";

interface SMSResponse {
  success: boolean;
  message?: string;
}

export async function sendSMS(to: string, message: string): Promise<SMSResponse> {
  const apiKey = process.env.MNOTIFY_API_KEY;
  const senderId = process.env.MNOTIFY_SENDER_ID || "IntactGH";

  if (!apiKey) {
    console.warn("MNOTIFY_API_KEY not configured, skipping SMS");
    return { success: false, message: "SMS not configured" };
  }

  // Normalize phone number
  let phone = to.replace(/\s/g, "");
  if (phone.startsWith("+233")) {
    phone = phone.slice(1); // Remove +
  } else if (phone.startsWith("0")) {
    phone = "233" + phone.slice(1);
  }

  try {
    const params = new URLSearchParams({
      key: apiKey,
      to: phone,
      msg: message,
      sender_id: senderId,
    });

    const response = await fetch(`${MNOTIFY_API_URL}?${params.toString()}`);
    const data = await response.text();

    // mNotify returns "1000" for success
    if (data.includes("1000") || data.includes("success")) {
      return { success: true };
    }

    console.error("SMS send failed:", data);
    return { success: false, message: data };
  } catch (error) {
    console.error("SMS error:", error);
    return { success: false, message: "Failed to send SMS" };
  }
}
