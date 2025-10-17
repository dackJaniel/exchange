import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "US Dollar to British Pound Calculator - Live USD GBP Exchange Rate",
  description: "Convert US Dollar to British Pound with live exchange rates. Free USD to GBP currency calculator with current rates.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}