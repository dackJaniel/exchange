import { EnhancedConversionPage } from "@/components/pages/EnhancedConversionPage";

export default function ConversionPage() {
  return (
    <EnhancedConversionPage
      fromCurrencyCode="JPY"
      toCurrencyCode="KRW"
      amount={100}
      locale="ja"
    />
  );
}
