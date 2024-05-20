export interface IThemeListProps {
  selectedCategory: string;
  categories: {
    category_name: string;
    category_image: string;
    _id: string;
  }[];
  onClick: (id: string) => void;
}
