export interface PaymentInitRequest {
  orderId: string;
  amount: number;
  currency: string;
  customerEmail: string;
  customerPhone: string;
  customerName: string;
  description: string;
  callbackUrl: string;
  returnUrl: string;
  reference?: string;
  metadata?: Record<string, string>;
}

export interface PaymentInitResponse {
  success: boolean;
  reference: string;
  checkoutUrl?: string;
  message?: string;
}

export interface PaymentVerifyResponse {
  success: boolean;
  status: "pending" | "success" | "failed" | "cancelled";
  amount: number;
  reference: string;
  providerRef?: string;
  message?: string;
}

export interface PaymentWebhookData {
  reference: string;
  status: string;
  amount: number;
  providerRef?: string;
  metadata?: Record<string, string>;
}

export interface PaymentProvider {
  name: string;
  initializePayment(request: PaymentInitRequest): Promise<PaymentInitResponse>;
  verifyPayment(reference: string): Promise<PaymentVerifyResponse>;
  verifyWebhookSignature(payload: string, signature: string): boolean;
  parseWebhookData(payload: unknown): PaymentWebhookData;
}
