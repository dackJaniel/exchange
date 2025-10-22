import { EnhancedConversionPage } from "@/components/pages/EnhancedConversionPage";

export default function ConversionPage() {
  return (
    <EnhancedConversionPage
      fromCurrencyCode="SAR"
      toCurrencyCode="INR"
      amount={100}
      locale="hi"
    />
  );
}
