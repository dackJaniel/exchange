import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Canadian Dollar to US Dollar Calculator - Live CAD USD Exchange Rate",
  description: "Convert Canadian Dollar to US Dollar with live exchange rates. Free CAD to USD currency calculator with current rates.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}