import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Japanese Yen to Euro Calculator - Live JPY EUR Exchange Rate",
  description: "Convert Japanese Yen to Euro with live exchange rates. Free JPY to EUR currency calculator with current rates.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}