import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Australian Dollar to US Dollar Calculator - Live AUD USD Exchange Rate",
  description: "Convert Australian Dollar to US Dollar with live exchange rates. Free AUD to USD currency calculator with current rates.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}