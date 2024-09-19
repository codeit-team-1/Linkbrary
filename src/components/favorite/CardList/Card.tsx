import Image from 'next/image';
import Link from 'next/link';
import { validateLink } from '@/lib/utils/links';
import { timeAgo } from './timeAgo';

interface CardProps {
  card: {
    id: number;
    favorite: boolean;
    url: string;
    title: string;
    imageSource: string;
    description: string;
    createdAt: string;
  };
}

const Card: React.FC<CardProps> = ({ card }) => {
  const defaultImage = '/images/NoImage.jpg';
  const { url } = card;
  const startHttp = validateLink(url);

  return (
    <Link
      className="border rounded-lg overflow-hidden shadow-lg cursor-pointer transition-transform duration-300 transform hover:scale-105 hover:shadow-xl"
      href={`${startHttp ? url : `https://${url}`}`}
      target="_blank"
    >
      <div className="relative w-full h-0 pt-[56.25%]">
        <Image
          priority
          className="rounded-2xl"
          src={card.imageSource || defaultImage}
          alt={card.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <p className="font-pretendard text-[13px] font-[400] leading-[15.51px] text-left text-gray-400 pb-2">
          {timeAgo(card.createdAt)}
        </p>
        <h2 className="font-pretendard text-lg font-normal leading-6 text-left line-clamp-2">
          {card.title}
        </h2>

        <p className="font-pretendard text-[14px] font-[400] leading-[16.71px] text-left text-gray-500 pt-2">
          {new Date(card.createdAt).toLocaleDateString()}
        </p>
      </div>
    </Link>
  );
};

export default Card;
