import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "British Pound to Swiss Franc Calculator - Live GBP CHF Exchange Rate",
  description: "Convert British Pound to Swiss Franc with live exchange rates. Free GBP to CHF currency calculator with current rates.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}