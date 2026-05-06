import App from '../../../App';
import { MOCK_NEWS } from '../../../types';
import type { Metadata } from 'next';

type Props = {
  params: { id: string }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const article = MOCK_NEWS.find(a => a.id === id);
  
  if (!article) {
    return {
      title: 'Articolo Non Trovato - Editoriale',
    };
  }

  return {
    title: `${article.title} - Editoriale`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.imageUrl],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { id } = await params;
  return <App initialView="home" initialArticleId={id} />;
}
