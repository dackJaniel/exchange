import { EnhancedConversionPage } from "@/components/pages/EnhancedConversionPage";

export default function ConversionPage() {
  return (
    <EnhancedConversionPage
      fromCurrencyCode="JPY"
      toCurrencyCode="AUD"
      amount={100000}
      locale="ja"
    />
  );
}
