import { CoffeeData } from "@/assets/res/data";
import { create } from "zustand";

type ListDataTypes = {
  id: number;
  category: string;
  name: string;
  description: string;
  image: string;
  detailsImg: string;
  prices: any;
  favorite: boolean;
  quantity: number;
};

type StoreData = {
  coffeeList: ListDataTypes[];
  fetchStoreData: () => void;
};

export const useStore = create<StoreData>((set) => ({
  coffeeList: [],

  fetchStoreData: () => {
    set({
      coffeeList: CoffeeData,
    });
  },
}));
