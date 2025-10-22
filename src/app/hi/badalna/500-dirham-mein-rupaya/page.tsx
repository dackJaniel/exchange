import { EnhancedConversionPage } from "@/components/pages/EnhancedConversionPage";

export default function ConversionPage() {
  return (
    <EnhancedConversionPage
      fromCurrencyCode="AED"
      toCurrencyCode="INR"
      amount={500}
      locale="hi"
    />
  );
}
