import { Category } from "./category.interfaces";

export interface SearchParameters {
    selectedCategory: Category | null,
    filterKeyword: string
}