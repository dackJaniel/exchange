import { EnhancedConversionPage } from "@/components/pages/EnhancedConversionPage";

export default function ConversionPage() {
  return (
    <EnhancedConversionPage
      fromCurrencyCode="INR"
      toCurrencyCode="SAR"
      amount={5000}
      locale="hi"
    />
  );
}
