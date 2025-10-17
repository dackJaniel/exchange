import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "US Dollar to Japanese Yen Calculator - Live USD JPY Exchange Rate",
  description: "Convert US Dollar to Japanese Yen with live exchange rates. Free USD to JPY currency calculator with current rates.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}