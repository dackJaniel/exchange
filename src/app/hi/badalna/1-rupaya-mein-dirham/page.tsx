import { EnhancedConversionPage } from "@/components/pages/EnhancedConversionPage";

export default function ConversionPage() {
  return (
    <EnhancedConversionPage
      fromCurrencyCode="INR"
      toCurrencyCode="AED"
      amount={1}
      locale="hi"
    />
  );
}
