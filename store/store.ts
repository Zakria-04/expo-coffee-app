import { CoffeeData } from "@/assets/res/data";
import { produce } from "immer";
import { create } from "zustand";
import Quantity from "./../components/Quantity";

type ListDataTypes = {
  id: number;
  category: string;
  name: string;
  description: string;
  image: any;
  detailsImg: string;
  prices: any;
  price?: number;
  size?: string;
  ingredients: string;
  average_rating: number;
  favorite: boolean;
  quantity: number;
};

type StoreData = {
  coffeeList: ListDataTypes[];
  favoriteList: ListDataTypes[];
  cartList: ListDataTypes[];
  fetchStoreData: () => void;
  addToFavorite: (id: number) => void;
  addToCart: (data: any, selectedSize: any) => void;
  increaseQuantity: (id: any, size: any) => void;
  decreaseQuantity: (id: any, size: any) => void;
  removeItemFromCart: (id: number, quantity: number) => void;
};

export const useStore = create<StoreData>((set) => ({
  coffeeList: [],
  favoriteList: [],
  cartList: [],
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
  addToCart: (data: any, selectedSize: any) => {
    set(
      produce((state) => {
        const existingItemIndex = state.cartList.findIndex(
          (item: any) => item.id === data.id
        );

        if (existingItemIndex !== -1) {
          const existingItem = state.cartList[existingItemIndex];
          const priceIndex = existingItem.prices.findIndex(
            (price: any) => price.size === selectedSize.size
          );
          if (priceIndex !== -1) {
            existingItem.prices[priceIndex].quantity += 1;
          } else {
            existingItem.prices.unshift({ ...selectedSize, quantity: 1 });
          }
        } else {
          const updatedData = {
            ...data,
            prices: [{ ...selectedSize, quantity: 1 }],
          };
          state.cartList.unshift(updatedData);
        }
      })
    );
  },
  increaseQuantity: (id, size) => {
    set(
      produce((state) => {
        const findItemByID = state.cartList.find((item: any) => item.id === id);
        if (findItemByID) {
          const findSize = findItemByID.prices.find(
            (item: any) => item.size === size
          );
          if (findSize) {
            findSize.quantity += 1;
          }
        }
      })
    );
  },
  decreaseQuantity: (id, size) => {
    set(
      produce((state) => {
        const findByID = state.cartList.find((item: any) => item.id === id);
        if (findByID) {
          const findSize = findByID.prices.find(
            (item: any) => item.size === size
          );
          if (findSize) {
            findSize.quantity -= 1;
          }
        }
      })
    );
  },
  removeItemFromCart: (id, size) => {
    set(
      produce((state) => {
        const findItemByID = state.cartList.find((item: any) => item.id === id);
        if (findItemByID) {
          findItemByID.prices = findItemByID.prices.filter(
            (price: any) => price.size !== size
          );
          if (findItemByID.prices.length === 0) {
            state.cartList = state.cartList.filter(
              (item: any) => item.id !== id
            );
          }
        }
      })
    );
  },
}));
