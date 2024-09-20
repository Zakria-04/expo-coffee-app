import { CoffeeData } from "@/assets/res/data";
import { produce } from "immer";
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
  favoriteList: ListDataTypes[];
  fetchStoreData: () => void;
  addToFavorite: (id: number) => void;
};

export const useStore = create<StoreData>((set) => ({
  coffeeList: [],
  favoriteList: [],
  fetchStoreData: () => {
    set({
      coffeeList: CoffeeData,
    });
  },
  addToFavorite: (id: number) => {
    set(
      produce((state) => {
        const item = state.coffeeList.find((coffee: any) => coffee.id === id);

        if (item) {
          item.favorite = !item.favorite;
          if (item.favorite) {
            state.favoriteList.unshift(item);
          } else {
            state.favoriteList = state.favoriteList.filter(
              (favItem: any) => favItem.id !== id
            );
          }
        }
      })
    );
  },
}));
