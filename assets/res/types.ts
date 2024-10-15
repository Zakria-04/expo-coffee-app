export interface PriceTypes {
  price: number;
  size: "S" | "M" | "L";
  quantity: number;
}

export interface ListDataTypes {
  id: number;
  category: string;
  name: string;
  description: string;
  image: string;
  detailsImg: string;
  prices: PriceTypes[];
  price: number;
  size: string;
  ingredients: string;
  average_rating: number;
  favorite: boolean;
  quantity: number;
}

export interface OrderHistoryTypes {
  date: string;
  ordersItem: ListDataTypes[];
}
