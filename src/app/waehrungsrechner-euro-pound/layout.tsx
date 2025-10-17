import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Euro to British Pound Calculator - Live EUR GBP Exchange Rate",
  description: "Convert Euro to British Pound with live exchange rates. Free EUR to GBP currency calculator with current rates.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}