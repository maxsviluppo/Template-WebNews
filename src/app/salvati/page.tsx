import App from '../../App';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Articoli Salvati - Editoriale',
  description: 'I tuoi articoli salvati e preferiti.',
};

export default function SavedPage() {
  return <App initialView="saved" />;
}
