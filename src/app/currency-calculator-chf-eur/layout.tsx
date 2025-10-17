import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Swiss Franc to Euro Calculator - Live CHF EUR Exchange Rate",
  description: "Convert Swiss Franc to Euro with live exchange rates. Free CHF to EUR currency calculator with current rates.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}