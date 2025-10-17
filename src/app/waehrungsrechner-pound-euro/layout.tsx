import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "British Pound to Euro Calculator - Live GBP EUR Exchange Rate",
  description: "Convert British Pound to Euro with live exchange rates. Free GBP to EUR currency calculator with current rates.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}