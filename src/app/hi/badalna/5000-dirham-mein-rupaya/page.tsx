import { EnhancedConversionPage } from "@/components/pages/EnhancedConversionPage";

export default function ConversionPage() {
  return (
    <EnhancedConversionPage
      fromCurrencyCode="AED"
      toCurrencyCode="INR"
      amount={5000}
      locale="hi"
    />
  );
}
