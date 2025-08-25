export const metadata = {
  title: 'Grüntek — ASHRAE Level 1',
  description: 'Preliminary audit intake and analysis',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ background: '#fff', color: '#111', margin: 0 }}>{children}</body>
    </html>
  );
}