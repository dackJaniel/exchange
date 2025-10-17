import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Euro to Danish Krone Calculator - Live EUR DKK Exchange Rate",
  description: "Convert Euro to Danish Krone with live exchange rates. Free EUR to DKK currency calculator with current rates.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}