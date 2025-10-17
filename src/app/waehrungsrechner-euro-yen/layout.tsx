import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Euro to Japanese Yen Calculator - Live EUR JPY Exchange Rate",
  description: "Convert Euro to Japanese Yen with live exchange rates. Free EUR to JPY currency calculator with current rates.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}