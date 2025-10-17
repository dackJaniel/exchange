import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Euro to Swedish Krona Calculator - Live EUR SEK Exchange Rate",
  description: "Convert Euro to Swedish Krona with live exchange rates. Free EUR to SEK currency calculator with current rates.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}