import { EnhancedConversionPage } from "@/components/pages/EnhancedConversionPage";

export default function ConversionPage() {
  return (
    <EnhancedConversionPage
      fromCurrencyCode="USD"
      toCurrencyCode="PKR"
      amount={1000}
      locale="hi"
    />
  );
}
