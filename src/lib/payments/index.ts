import { PaymentProvider } from "./types";
import { HubtelProvider } from "./hubtel";
import { FlutterwaveProvider } from "./flutterwave";

export * from "./types";

export function getPaymentProvider(): PaymentProvider {
  const provider = process.env.PAYMENTS_PROVIDER || "HUBTEL";

  switch (provider.toUpperCase()) {
    case "FLUTTERWAVE":
      return new FlutterwaveProvider();
    case "HUBTEL":
    default:
      return new HubtelProvider();
  }
}

export function getPaymentMethodType(method: string): "MOBILE_MONEY_MTN" | "MOBILE_MONEY_VODAFONE" | "MOBILE_MONEY_AIRTELTIGO" | "CARD" | "BANK_TRANSFER" {
  switch (method) {
    case "momo_mtn":
      return "MOBILE_MONEY_MTN";
    case "momo_vodafone":
      return "MOBILE_MONEY_VODAFONE";
    case "momo_airteltigo":
      return "MOBILE_MONEY_AIRTELTIGO";
    case "card":
      return "CARD";
    case "bank_transfer":
      return "BANK_TRANSFER";
    default:
      return "MOBILE_MONEY_MTN";
  }
}
