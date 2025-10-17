import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Euro to Norwegian Krone Calculator - Live EUR NOK Exchange Rate",
  description: "Convert Euro to Norwegian Krone with live exchange rates. Free EUR to NOK currency calculator with current rates.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}