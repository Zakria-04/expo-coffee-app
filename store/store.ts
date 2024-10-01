import { produce } from "immer";
import { create } from "zustand";
import Quantity from "./../components/Quantity";
import { deleteAccount, updateUser } from "@/assets/res/api";

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
  imageURL: string;
  user: any;
  auth: boolean;
  loading: boolean;
  userCart: any;
  userFavorite: any;
  fetchStoreData: (data: any) => void;
  addToFavorite: (id: number) => void;
  addToCart: (data: any, selectedSize: any) => void;
  increaseQuantity: (id: any, size: any) => void;
  decreaseQuantity: (id: any, size: any) => void;
  removeItemFromCart: (id: number, quantity: number) => void;
  logUser: (data: any) => void;
  logoutUser: () => void;
  deleteAccount: (id: string) => void;
};

export const useStore = create<StoreData>((set) => ({
  coffeeList: [],
  favoriteList: [],
  cartList: [],
  imageURL: "",
  user: [],
  auth: false,
  loading: false,
  userCart: [],
  userFavorite: [],
  fetchStoreData: (data) => {
    set(
      produce((state) => {
        const store_data = JSON.parse(data);
        state.coffeeList = store_data.products;
        state.imageURL = store_data.baseURL;
      })
    );
  },
  addToFavorite: (id: number) => {
    set(
      produce((state) => {
        if (state.auth) {
          const item = state.coffeeList.find((coffee: any) => coffee.id === id);
          if (item) {
            item.favorite = !item.favorite;
            if (item.favorite) {
              state.userFavorite.unshift(item);
            } else {
              state.userFavorite = state.userFavorite.filter(
                (favItem: any) => favItem.id !== id
              );
            }
          }

          if (state.auth && state.user._id) {
            const x = {
              userID: state.user._id,
              updatedData: {
                userFavorite: state.userFavorite,
              },
            };
            updateUser(x)
              .then((response) => {
                console.log("user favorite list updated", response);
              })
              .catch((err) => {
                console.error("err with updating user favorite list", err);
              });
            console.log("user favorite list is", state.userFavorite);
          }
        } else {
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
        }
      })
    );
  },
  addToCart: (data: any, selectedSize: any) => {
    set(
      produce((state) => {
        if (state.auth) {
          const existingItemIndex = state.userCart.findIndex(
            (item: any) => item.id === data.id
          );

          if (existingItemIndex !== -1) {
            const existingItem = state.userCart[existingItemIndex];
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
            state.userCart.unshift(updatedData);
          }

          if (state.auth && state.user._id) {
            const x = {
              userID: state.user._id,
              updatedData: { userCart: state.userCart },
            };
            updateUser(x)
              .then((response) => console.log("res server", response))
              .catch((err) => console.log(err));
          }
          console.log("cart list is ", state.userCart);
        } else {
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
          // const x = {
          //   userID: state.user._id,
          //   updatedData: { userCart: [{ category: "lattee" }] },
          // };
          // if (state.auth) {
          //   updateUser(x);
          // }
        }
      })
    );
  },
  increaseQuantity: (id, size) => {
    set(
      produce((state) => {
        if (state.auth) {
          const findItemByID = state.userCart.find(
            (item: any) => item.id === id
          );
          if (findItemByID) {
            const findSize = findItemByID.prices.find(
              (item: any) => item.size === size
            );
            if (findSize) {
              findSize.quantity += 1;
            }
          }

          if (state.auth && state.user._id) {
            const x = {
              userID: state.user._id,
              updatedData: { userCart: state.userCart },
            };
            updateUser(x)
              .then((response) => console.log("res server", response))
              .catch((err) => console.log(err));
          }
        } else {
          const findItemByID = state.cartList.find(
            (item: any) => item.id === id
          );
          if (findItemByID) {
            const findSize = findItemByID.prices.find(
              (item: any) => item.size === size
            );
            if (findSize) {
              findSize.quantity += 1;
            }
          }
        }
      })
    );
  },
  decreaseQuantity: (id, size) => {
    set(
      produce((state) => {
        if (state.auth) {
          const findByID = state.userCart.find((item: any) => item.id === id);
          if (findByID) {
            const findSize = findByID.prices.find(
              (item: any) => item.size === size
            );
            if (findSize) {
              findSize.quantity -= 1;
            }
          }

          if (state.auth && state.user._id) {
            const x = {
              userID: state.user._id,
              updatedData: { userCart: state.userCart },
            };
            updateUser(x)
              .then((response) => console.log("res server", response))
              .catch((err) => console.log(err));
          }
        } else {
          const findByID = state.cartList.find((item: any) => item.id === id);
          if (findByID) {
            const findSize = findByID.prices.find(
              (item: any) => item.size === size
            );
            if (findSize) {
              findSize.quantity -= 1;
            }
          }
        }
      })
    );
  },
  removeItemFromCart: (id, size) => {
    set(
      produce((state) => {
        if (state.auth) {
          const findItemByID = state.userCart.find(
            (item: any) => item.id === id
          );
          if (findItemByID) {
            findItemByID.prices = findItemByID.prices.filter(
              (price: any) => price.size !== size
            );
            if (findItemByID.prices.length === 0) {
              state.userCart = state.userCart.filter(
                (item: any) => item.id !== id
              );
            }
          }

          if (state.auth && state.user._id) {
            const x = {
              userID: state.user._id,
              updatedData: { userCart: state.userCart },
            };
            updateUser(x)
              .then((response) => console.log("res server", response))
              .catch((err) => console.log(err));
          }
        } else {
          const findItemByID = state.cartList.find(
            (item: any) => item.id === id
          );
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
        }
      })
    );
  },
  logUser: (data) => {
    set(
      produce((state) => {
        state.auth = true;
        state.user = data;
        state.userCart = data.userCart || [];
        state.userFavorite = data.userFavorite || [];
      })
    );
  },
  registerNewUser: () => {
    set(produce((state) => {}));
  },
  logoutUser: () => {
    set(
      produce((state) => {
        state.userCart = [];
        state.userFavorite = [];
        state.user = [];
        state.auth = false;
      })
    );
  },
  deleteAccount: (id) => {
    set(
      produce((state) => {
        if (state.user._id === id) {
          const blog = {
            userID: id,
          };
          deleteAccount(blog)
            .then((response) => {
              console.log("user has been deleted ", response);
            })
            .catch((err) => {
              console.error("error with delete account", err);
            });
        }
      })
    );
  },
}));
