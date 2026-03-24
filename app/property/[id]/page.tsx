import { Metadata } from 'next';
import DeepLinkFallback from '@/app/components/DeepLinkFallback';

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    title: 'Check out this stay on StayKeep',
    description: 'Someone recommended this property for you. Open in the StayKeep app.',
    openGraph: {
      title: 'Check out this stay on StayKeep',
      description: 'Someone recommended this property for you.',
      url: `https://staykeep.com/property/${id}`,
    },
  };
}

export default async function PropertyPage({ params }: Props) {
  const { id } = await params;
  return <DeepLinkFallback type="property" id={id} />;
}
