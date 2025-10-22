import { EnhancedConversionPage } from "@/components/pages/EnhancedConversionPage";

export default function ConversionPage() {
  return (
    <EnhancedConversionPage
      fromCurrencyCode="INR"
      toCurrencyCode="SAR"
      amount={10}
      locale="hi"
    />
  );
}
