import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Danish Krone to Euro Calculator - Live DKK EUR Exchange Rate",
  description: "Convert Danish Krone to Euro with live exchange rates. Free DKK to EUR currency calculator with current rates.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}