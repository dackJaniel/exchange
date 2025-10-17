import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Euro to Polish Zloty Calculator - Live EUR PLN Exchange Rate",
  description: "Convert Euro to Polish Zloty with live exchange rates. Free EUR to PLN currency calculator with current rates.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}