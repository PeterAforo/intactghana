import {
  PaymentProvider,
  PaymentInitRequest,
  PaymentInitResponse,
  PaymentVerifyResponse,
  PaymentWebhookData,
} from "./types";
import crypto from "crypto";

const FLUTTERWAVE_BASE_URL = "https://api.flutterwave.com/v3";

export class FlutterwaveProvider implements PaymentProvider {
  name = "FLUTTERWAVE";
  private publicKey: string;
  private secretKey: string;

  constructor() {
    this.publicKey = process.env.FLUTTERWAVE_PUBLIC_KEY || "";
    this.secretKey = process.env.FLUTTERWAVE_SECRET_KEY || "";
  }

  async initializePayment(request: PaymentInitRequest): Promise<PaymentInitResponse> {
    try {
      const payload = {
        tx_ref: request.reference || `TX-${request.orderId}-${Date.now()}`,
        amount: request.amount,
        currency: request.currency,
        redirect_url: request.returnUrl,
        customer: {
          email: request.customerEmail,
          phonenumber: request.customerPhone,
          name: request.customerName,
        },
        customizations: {
          title: "Intact Ghana",
          description: request.description,
          logo: `${process.env.APP_URL}/logo.png`,
        },
        meta: {
          orderId: request.orderId,
          ...request.metadata,
        },
      };

      const response = await fetch(`${FLUTTERWAVE_BASE_URL}/payments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.secretKey}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.status === "success") {
        return {
          success: true,
          reference: payload.tx_ref,
          checkoutUrl: data.data?.link,
        };
      }

      return {
        success: false,
        reference: payload.tx_ref,
        message: data.message || "Payment initialization failed",
      };
    } catch (error) {
      console.error("Flutterwave init error:", error);
      return {
        success: false,
        reference: request.orderId,
        message: "Failed to initialize payment",
      };
    }
  }

  async verifyPayment(reference: string): Promise<PaymentVerifyResponse> {
    try {
      // First, get transaction by reference
      const response = await fetch(
        `${FLUTTERWAVE_BASE_URL}/transactions/verify_by_reference?tx_ref=${reference}`,
        {
          headers: {
            Authorization: `Bearer ${this.secretKey}`,
          },
        }
      );

      const data = await response.json();

      if (data.status === "success" && data.data) {
        const txData = data.data;
        let status: PaymentVerifyResponse["status"] = "pending";

        if (txData.status === "successful") {
          status = "success";
        } else if (txData.status === "failed") {
          status = "failed";
        } else if (txData.status === "cancelled") {
          status = "cancelled";
        }

        return {
          success: status === "success",
          status,
          amount: txData.amount,
          reference,
          providerRef: txData.flw_ref,
        };
      }

      return {
        success: false,
        status: "pending",
        amount: 0,
        reference,
        message: data.message || "Transaction not found",
      };
    } catch (error) {
      console.error("Flutterwave verify error:", error);
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
    const hash = crypto
      .createHmac("sha256", this.secretKey)
      .update(payload)
      .digest("hex");
    return hash === signature;
  }

  parseWebhookData(payload: unknown): PaymentWebhookData {
    const data = payload as Record<string, unknown>;
    const eventData = (data.data || data) as Record<string, unknown>;

    return {
      reference: (eventData.tx_ref as string) || "",
      status: (eventData.status as string) || "",
      amount: Number(eventData.amount || 0),
      providerRef: (eventData.flw_ref as string) || (eventData.id as string)?.toString(),
    };
  }
}
