import Image from 'next/image';
import Link from 'next/link';
import { IRecipe } from '@/app/utils/types/types';

interface IRecipeCardProps {
  category: string;
  index: number;
  recipe: IRecipe;
}

/**
 * The RecipeCard component generates a recipe card for a given category.
 * @constructor
 * @param {string} category - The recipe category.
 * @param {string} index - The recipe index.
 * @param {string} recipe - The recipe.
 */
export default function RecipeCard({ 
  category,
  index,
  recipe, 
}: IRecipeCardProps) {
  return (
    <div className="recipe-card h-full max-w-full rounded-lg border border-gray-200 hover:border-gray-300 bg-white shadow hover:shadow-xl opacity-100 transition duration-300 ease-in-out hover:opacity-90">
      <Link href={`${category}/${recipe.name_slug}`} className="text-black">
        <Image
            src={`/images/${recipe.image ? recipe.image : 'image_placeholder.jpg'}`}
            width={400}
            height={0}
            className="card__image w-full rounded-t-lg"
            alt={recipe.image ? 'Recipe for ' + recipe.name : ''}
            style={{
              objectFit: 'cover',
              height: '150px',
            }}
            priority={index <= 10 ? true : false}
        />
        <div className="card__body flex flex-col justify-between px-4 py-4">
          <p className="card__title mb-0 text-xl">
            {recipe.name}
          </p>
        </div>
      </Link>
    </div>
  )
}
