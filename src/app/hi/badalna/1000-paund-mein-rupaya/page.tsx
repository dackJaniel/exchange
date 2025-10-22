import { EnhancedConversionPage } from "@/components/pages/EnhancedConversionPage";

export default function ConversionPage() {
  return (
    <EnhancedConversionPage
      fromCurrencyCode="GBP"
      toCurrencyCode="INR"
      amount={1000}
      locale="hi"
    />
  );
}
