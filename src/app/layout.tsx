import './globals.css';

export const metadata = {
  title: 'Nostr Event Lookup',
  description: 'Look up Nostr events using word sequences',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}