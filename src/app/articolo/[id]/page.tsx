import App from '../../../App';
import { MOCK_NEWS } from '../../../types';
import type { Metadata } from 'next';

type Props = {
  params: { id: string }
};

export function generateMetadata({ params }: Props): Metadata {
  const article = MOCK_NEWS.find(a => a.id === params.id);
  
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

export default function ArticlePage({ params }: Props) {
  return <App initialView="home" initialArticleId={params.id} />;
}
