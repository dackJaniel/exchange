import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Swedish Krona to Euro Calculator - Live SEK EUR Exchange Rate",
  description: "Convert Swedish Krona to Euro with live exchange rates. Free SEK to EUR currency calculator with current rates.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}