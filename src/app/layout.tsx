import type { Metadata } from 'next';
import './globals.css';
import { QueryProvider } from '@/shared/providers/QueryProvider';

export const metadata: Metadata = {
  title: 'NovaStream — Streaming de Alto Rendimiento',
  description: 'Plataforma OTT con Next.js, Shaka Player y Core Web Vitals optimizados.',
};

export default function RootLayout({
  children,
  modal, 
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bg-zinc-950 text-white antialiased">
        <QueryProvider>
          {children}
          {modal}
        </QueryProvider>
      </body>
    </html>
  );
}
