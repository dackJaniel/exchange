import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Japanese Yen to US Dollar Calculator - Live JPY USD Exchange Rate",
  description: "Convert Japanese Yen to US Dollar with live exchange rates. Free JPY to USD currency calculator with current rates.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}