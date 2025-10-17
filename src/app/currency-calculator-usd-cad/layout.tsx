import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "US Dollar to Canadian Dollar Calculator - Live USD CAD Exchange Rate",
  description: "Convert US Dollar to Canadian Dollar with live exchange rates. Free USD to CAD currency calculator with current rates.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}