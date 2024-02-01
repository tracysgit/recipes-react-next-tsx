import Image from 'next/image';
import Link from 'next/link';
import { TRecipe } from '@/app/lib/definitions';

interface CardImageTopProps {
  linkRoute?: string;
  card: TRecipe;
  children?: React.ReactNode;
}

export default function CardImageTop({ card, linkRoute }: CardImageTopProps) {
  return (
    <div className="card h-full max-w-full rounded-lg border border-gray-200 hover:border-gray-300 bg-white shadow hover:shadow-xl dark:bg-neutral-700 opacity-100 transition duration-300 ease-in-out hover:opacity-90">
      <Link href={`${linkRoute}/${card.name_slug}`}>
        <Image
            src={`/images/${card.image ? card.image : 'image_placeholder.jpg'}`}
            width={400}
            height={150}
            className="card__image w-full rounded-t-lg"
            alt={card.image ? 'Image of ' + card.name : ''}
            style={{
              objectFit: 'cover',
              // width: '100%',
              height: '150px',
            }}
        />
        <div className="card__body flex flex-col justify-between px-4 py-4">
          <h3 className="card__title mb-0 text-xl">
            {card.name}
          </h3>
        </div>
      </Link>
    </div>
  )
}
