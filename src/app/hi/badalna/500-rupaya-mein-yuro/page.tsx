import { EnhancedConversionPage } from "@/components/pages/EnhancedConversionPage";

export default function ConversionPage() {
  return (
    <EnhancedConversionPage
      fromCurrencyCode="INR"
      toCurrencyCode="EUR"
      amount={500}
      locale="hi"
    />
  );
}
