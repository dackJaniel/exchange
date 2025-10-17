import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Swiss Franc to British Pound Calculator - Live CHF GBP Exchange Rate",
  description: "Convert Swiss Franc to British Pound with live exchange rates. Free CHF to GBP currency calculator with current rates.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}