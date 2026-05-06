import type { Metadata } from 'next';
import '../index.css';
import '../newspaper.css';

export const metadata: Metadata = {
  title: 'Editoriale - Premium News Experience',
  description: 'La tua esperienza di lettura premium per le ultime notizie dal mondo.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
