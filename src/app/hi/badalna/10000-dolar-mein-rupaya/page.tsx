import { EnhancedConversionPage } from "@/components/pages/EnhancedConversionPage";

export default function ConversionPage() {
  return (
    <EnhancedConversionPage
      fromCurrencyCode="USD"
      toCurrencyCode="PKR"
      amount={10000}
      locale="hi"
    />
  );
}
