import { Metadata } from 'next';
import DeepLinkFallback from '@/app/components/DeepLinkFallback';

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    title: 'View your booking on StayKeep',
    description: 'Open the StayKeep app to manage your booking.',
    openGraph: {
      title: 'View your booking on StayKeep',
      url: `https://staykeep.com/booking/${id}`,
    },
  };
}

export default async function BookingPage({ params }: Props) {
  const { id } = await params;
  return <DeepLinkFallback type="booking" id={id} />;
}
