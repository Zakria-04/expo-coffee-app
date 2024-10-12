import { produce } from "immer";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware"; // Import the persist middleware
import AsyncStorage from "@react-native-async-storage/async-storage"; // For AsyncStorage
import Quantity from "./../components/Quantity";
import {
  deleteAccount,
  getProducts,
  registerUser,
  signinUser,
  updateUser,
} from "@/assets/res/api";
import { ListDataTypes } from "@/assets/res/types";

type StoreData = {
  coffeeList: ListDataTypes[];

  // user signed in data
  userCart: ListDataTypes[];
  userFavorite: ListDataTypes[];
  userOrderHistory: ListDataTypes[];

  // user not signed in data
  cartList: ListDataTypes[];
  favoriteList: ListDataTypes[];
  orderHistory: ListDataTypes[];

  cartTotal: number;
  imageURL: string | null;
  user: any;
  auth: boolean;
  isLoading: boolean;
  error: string | null;

  // fetch data function
  fetchStoreData: () => Promise<void>;

  // user functions
  logUser: (form: any) => Promise<void>;
  signupUser: (form: any) => Promise<void>;
  logoutUser: () => void;
  deleteAccount: (id: string) => Promise<void>;

  // cart functions
  addToCart: (data: any, selectedSize: any) => void;
  increaseQuantity: (id: number, size: string) => void;
  decreaseQuantity: (id: number, size: string) => void;
  removeItemFromCart: (id: number, quantity: number) => void;
  calculateTotalCart: () => void;
  placeOrder: () => void;

  // favorite functions
  addToFavorite: (id: number) => void;
};

export const useStore = create<StoreData>()(
  persist(
    (set) => ({
      // store products
      coffeeList: [],

      // user signed in data
      user: [],
      auth: false,
      imageURL: null,
      userCart: [],
      userFavorite: [],
      userOrderHistory: [],

      // user not signed in data
      favoriteList: [],
      cartList: [],
      orderHistory: [],

      // others
      isLoading: false,
      error: null,
      cartTotal: 0,
      fetchStoreData: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(
            "https://expo-coffee-app-server.onrender.com/products"
          );
          const result = await response.json();
          set({
            isLoading: false,
            error: null,
            coffeeList: result.products,
            imageURL: result.baseURL,
          });
          console.log("data has been fetched");
        } catch (err) {
          set({ error: "Failed With Fetching Data", isLoading: false });
          console.error("error message: ", err);
        }
      },
      addToFavorite: (id: number) => {
        set(
          produce((state) => {
            const favoriteFunction = (coffeeData: any) => {
              const item = state.coffeeList.find(
                (coffee: any) => coffee.id === id
              );

              if (item) {
                item.favorite = !item.favorite;

                if (item.favorite) {
                  coffeeData.unshift(item);
                  console.log("Added to favorites", state.favoriteList);
                } else {
                  const filteredList = coffeeData.filter(
                    (favItem: any) => favItem.id !== id
                  );
                  coffeeData.length = 0;
                  coffeeData.push(...filteredList);
                  console.log("Removed from favorites", state.favoriteList);
                }
              }
            };

            if (state.auth) {
              favoriteFunction(state.userFavorite);
              if (state.auth && state.user._id) {
                const updatedUserData = {
                  userID: state.user._id,
                  updatedData: {
                    userFavorite: state.userFavorite,
                  },
                };
                updateUser(updatedUserData)
                  .then(() => {
                    console.log("user favorite list has been updated!");
                  })
                  .catch((err) => {
                    console.error("error on updating user favorite list", err);
                  });
              }
            } else {
              favoriteFunction(state.favoriteList);
            }
          })
        );
      },
      addToCart: (data, selectedSize) => {
        set(
          produce((state) => {
            const addItemToCart = (cartData: ListDataTypes[]) => {
              const existingItemIndex = cartData.findIndex(
                (item: any) => item.id === data.id
              );

              if (existingItemIndex !== -1) {
                const existingItem = cartData[existingItemIndex];
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
                cartData.unshift(updatedData);
              }
            };

            if (state.auth) {
              addItemToCart(state.userCart);

              if (state.user._id) {
                const updatedUserData = {
                  userID: state.user._id,
                  updatedData: { userCart: state.userCart },
                };
                updateUser(updatedUserData)
                  .then((response) => console.log("res server", response))
                  .catch((err) => console.log(err));
              }
            } else {
              addItemToCart(state.cartList);
              console.log("data is");
            }
          })
        );
      },
      increaseQuantity: (id, size) => {
        set(
          produce((state) => {
            const updateQuantity = (cartData: any) => {
              const findItemByID = cartData.find((item: any) => item.id === id);
              if (findItemByID) {
                const findSize = findItemByID.prices.find(
                  (item: any) => item.size === size
                );
                if (findSize) {
                  findSize.quantity += 1;
                }
              }
            };

            if (state.auth) {
              updateQuantity(state.userCart);

              if (state.user._id) {
                const updatedUserData = {
                  userID: state.user._id,
                  updatedData: { userCart: state.userCart },
                };
                updateUser(updatedUserData)
                  .then((response) => console.log("res server", response))
                  .catch((err) => console.log(err));
              }
            } else {
              updateQuantity(state.cartList);
            }
          })
        );
      },
      decreaseQuantity: (id, size) => {
        set(
          produce((state) => {
            const updateQuantity = (cartData: any) => {
              const findByID = cartData.find((item: any) => item.id === id);
              if (findByID) {
                const findSize = findByID.prices.find(
                  (item: any) => item.size === size
                );
                if (findSize && findSize.quantity > 0) {
                  findSize.quantity -= 1;
                }
              }
            };

            if (state.auth) {
              updateQuantity(state.userCart);

              if (state.user._id) {
                const updatedUserData = {
                  userID: state.user._id,
                  updatedData: { userCart: state.userCart },
                };
                updateUser(updatedUserData)
                  .then((response) => console.log("res server", response))
                  .catch((err) => console.log(err));
              }
            } else {
              updateQuantity(state.cartList);
            }
          })
        );
      },
      removeItemFromCart: (id, size) => {
        set(
          produce((state) => {
            const removeItem = (cartData: any) => {
              const itemIndex = cartData.findIndex(
                (item: any) => item.id === id
              );
              if (itemIndex !== -1) {
                const item = cartData[itemIndex];

                item.prices = item.prices.filter(
                  (price: any) => price.size !== size
                );

                if (item.prices.length === 0) {
                  cartData.splice(itemIndex, 1);
                }
              }
            };

            if (state.auth) {
              removeItem(state.userCart);

              if (state.user._id) {
                const updatedUserData = {
                  userID: state.user._id,
                  updatedData: { userCart: state.userCart },
                };
                updateUser(updatedUserData)
                  .then((response) => console.log("res server", response))
                  .catch((err) => console.log(err));
              }
            } else {
              removeItem(state.cartList);
            }
          })
        );
      },
      calculateTotalCart: () => {
        set(
          produce((state) => {
            let total = 0;
            const cartItems = state.auth ? state.userCart : state.cartList;
            if (cartItems.length > 0) {
              cartItems.forEach((item: any) => {
                item.prices.forEach((price: any) => {
                  total += price.price * price.quantity;
                });
              });
            }
            state.cartTotal = total;
          })
        );
      },
      logUser: async (blog) => {
        set({ isLoading: true, error: null });
        try {
          const response = await signinUser(blog);
          set({
            isLoading: false,
            auth: true,
            error: null,
            user: response,
            userCart: response.userCart || [],
            userFavorite: response.userFavorite || [],
            userOrderHistory: response.userOrderHistory || [],
          });
          console.log("user signed in successfully!");
        } catch (err) {
          set({ error: "Error signing in user", isLoading: false });
          console.error("error message ", err);
        }
      },
      signupUser: async (blog) => {
        set({ isLoading: true, error: null });
        try {
          set({ isLoading: false, error: null });
          const response = await registerUser(blog);
          console.log("user has been created successfully!");

          return response;
        } catch (err) {
          set({ error: "Error on creating new account", isLoading: false });
          console.error("error with register new user", err);
        }
      },
      logoutUser: () => {
        set({
          userCart: [],
          userFavorite: [],
          user: [],
          userOrderHistory: [],
          auth: false,
        });
      },
      deleteAccount: async (id) => {
        set({ isLoading: true, error: null });
        set((state) => {
          if (state.user._id === id) {
            const userID = {
              userID: id,
            };
            deleteAccount(userID)
              .then((response) => {
                set({ isLoading: false, error: null, user: null });
                console.log("user has been deleted successfully!");
              })
              .catch((err) => {
                set({
                  isLoading: false,
                  error: "error with deleting user account",
                });
                console.error("error message ", err);
              });
          }
          return state;
        });
      },
      placeOrder: () => {
        set(
          produce((state) => {
            const addOrder = (orderList: any, cart: any, userID: any) => {
              const date = new Date();
              const day = date.getDate();
              const month = date.getMonth() + 1;
              const year = date.getFullYear();
              const orderDate = `${day}/${month}/${year}`;
              const newData = {
                date: orderDate,
                ordersItem: cart,
              };
              orderList.unshift(newData);

              if (userID) {
                const updatUserData = {
                  userID: userID,
                  updatedData: {
                    userCart: [],
                    userOrderHistory: orderList,
                  },
                };
                updateUser(updatUserData);
              }
            };

            if (state.auth) {
              addOrder(state.userOrderHistory, state.userCart, state.user._id);
              state.userCart = [];
            } else {
              addOrder(state.orderHistory, state.cartList, null);
              state.cartList = [];
            }
          })
        );
      },
    }),
    {
      name: "store-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
