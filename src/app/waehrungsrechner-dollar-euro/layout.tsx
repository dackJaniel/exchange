import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "US Dollar to Euro Calculator - Live USD EUR Exchange Rate",
  description: "Convert US Dollar to Euro with live exchange rates. Free USD to EUR currency calculator with current rates.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}