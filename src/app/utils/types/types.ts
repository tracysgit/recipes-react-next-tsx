export interface IRecipe {
  name: string;
  name_slug: string;
  category: string;
  tags?: string;
  ingredients?: string;
  directions?: string;
  source?: string;
  source_link?: string;
  servings?: string;
  image?: string;
  image_fullrecipe?: string;
  ingredients_edited?: string;
  directions_edited?: string;
  tags_array?: string[];
};

