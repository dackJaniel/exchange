import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Euro to Swiss Franc Calculator - Live EUR CHF Exchange Rate",
  description: "Convert Euro to Swiss Franc with live exchange rates. Free EUR to CHF currency calculator with current rates.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}