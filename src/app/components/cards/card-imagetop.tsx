import Image from 'next/image';
import Link from 'next/link';

export default function CardImageTop() {
  return (
    <div
      className="card h-full max-w-full rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
      <Link href="/CATEGORY/RECIPE-NAME">
        <Image
            src="/images/dessert_anise-cookies.jpg"
            alt="ALT"
            className="card__image w-full rounded-t-lg"
            width={400}
            height={200}
            style={{
              objectFit: 'cover',
              // width: '100%',
              height: '150px',
            }}
        />
        <div className="card__body flex flex-col justify-between p-6">
          <h3
            className="mb-2 text-xl text-neutral-800 dark:text-neutral-50">
            Card title
          </h3>
        </div>
      </Link>
    </div>
  )
}
