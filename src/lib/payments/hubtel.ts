import {
  PaymentProvider,
  PaymentInitRequest,
  PaymentInitResponse,
  PaymentVerifyResponse,
  PaymentWebhookData,
} from "./types";

const HUBTEL_BASE_URL = "https://payproxyapi.hubtel.com/items/initiate";

export class HubtelProvider implements PaymentProvider {
  name = "HUBTEL";
  private clientId: string;
  private clientSecret: string;
  private merchantAccount: string;

  constructor() {
    this.clientId = process.env.HUBTEL_CLIENT_ID || "";
    this.clientSecret = process.env.HUBTEL_CLIENT_SECRET || "";
    this.merchantAccount = process.env.HUBTEL_MERCHANT_ACCOUNT || "";
  }

  private getAuthHeader(): string {
    const credentials = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString("base64");
    return `Basic ${credentials}`;
  }

  async initializePayment(request: PaymentInitRequest): Promise<PaymentInitResponse> {
    try {
      const payload = {
        totalAmount: request.amount,
        description: request.description,
        callbackUrl: request.callbackUrl,
        returnUrl: request.returnUrl,
        cancellationUrl: `${request.returnUrl}?cancelled=true`,
        merchantAccountNumber: this.merchantAccount,
        clientReference: request.reference || request.orderId,
      };

      const response = await fetch(HUBTEL_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: this.getAuthHeader(),
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.responseCode === "0000" || data.status === "Success") {
        return {
          success: true,
          reference: data.data?.clientReference || request.orderId,
          checkoutUrl: data.data?.checkoutUrl || data.data?.checkoutDirectUrl,
        };
      }

      return {
        success: false,
        reference: request.orderId,
        message: data.message || "Payment initialization failed",
      };
    } catch (error) {
      console.error("Hubtel init error:", error);
      return {
        success: false,
        reference: request.orderId,
        message: "Failed to initialize payment",
      };
    }
  }

  async verifyPayment(reference: string): Promise<PaymentVerifyResponse> {
    try {
      const response = await fetch(
        `https://payproxyapi.hubtel.com/items/${reference}/status`,
        {
          headers: {
            Authorization: this.getAuthHeader(),
          },
        }
      );

      const data = await response.json();

      let status: PaymentVerifyResponse["status"] = "pending";
      if (data.status === "Success" || data.responseCode === "0000") {
        status = "success";
      } else if (data.status === "Failed") {
        status = "failed";
      } else if (data.status === "Cancelled") {
        status = "cancelled";
      }

      return {
        success: status === "success",
        status,
        amount: data.data?.amount || 0,
        reference,
        providerRef: data.data?.transactionId,
      };
    } catch (error) {
      console.error("Hubtel verify error:", error);
      return {
        success: false,
        status: "pending",
        amount: 0,
        reference,
        message: "Failed to verify payment",
      };
    }
  }

  verifyWebhookSignature(payload: string, signature: string): boolean {
    // Hubtel uses basic auth for webhooks - verify in middleware
    return true;
  }

  parseWebhookData(payload: unknown): PaymentWebhookData {
    const data = payload as Record<string, unknown>;
    return {
      reference: (data.ClientReference as string) || (data.clientReference as string) || "",
      status: (data.Status as string) || (data.status as string) || "",
      amount: Number(data.Amount || data.amount || 0),
      providerRef: (data.TransactionId as string) || (data.transactionId as string),
    };
  }
}
