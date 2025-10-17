import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Norwegian Krone to Euro Calculator - Live NOK EUR Exchange Rate",
  description: "Convert Norwegian Krone to Euro with live exchange rates. Free NOK to EUR currency calculator with current rates.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}