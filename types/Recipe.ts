export type Recipe = {
  id: string;
  name: string;
  email: string;
  title: string;
  description: string;
  ingredients: string;
  instructions: string;
  image: string | File;
  dateAdded: string;
  isFavorite: boolean;
}