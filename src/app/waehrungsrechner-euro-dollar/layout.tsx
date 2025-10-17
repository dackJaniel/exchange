import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Euro to US Dollar Calculator - Live EUR USD Exchange Rate",
  description: "Convert Euro to US Dollar with live exchange rates. Free EUR to USD currency calculator with current rates.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}