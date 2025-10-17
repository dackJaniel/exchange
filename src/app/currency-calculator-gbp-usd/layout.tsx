import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "British Pound to US Dollar Calculator - Live GBP USD Exchange Rate",
  description: "Convert British Pound to US Dollar with live exchange rates. Free GBP to USD currency calculator with current rates.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}