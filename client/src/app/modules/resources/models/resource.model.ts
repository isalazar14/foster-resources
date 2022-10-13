import { Category } from "./category.model";

export type Resource = {
  _id: string;
  categories?: string [] & Category[];
  name: string;
  description?: string;
  url?: string;
  location?: {
    name: string;
    description: string;
    notes: string;
    mapCoord: {
      lat: number;
      long: number;
    };
  };
  details?: string;
  imageUrl?: string;
	createdAt?: string
	updatedAt?: string
  __v?: number
};
