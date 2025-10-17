import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "US Dollar to Australian Dollar Calculator - Live USD AUD Exchange Rate",
  description: "Convert US Dollar to Australian Dollar with live exchange rates. Free USD to AUD currency calculator with current rates.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}