import { produce } from "immer";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware"; // Import the persist middleware
import AsyncStorage from "@react-native-async-storage/async-storage"; // For AsyncStorage
import Quantity from "./../components/Quantity";
import { deleteAccount, getProducts, updateUser } from "@/assets/res/api";

type ListDataTypes = {
  date: any;
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
  orderHistory: ListDataTypes[];
  userOrderHistory: ListDataTypes[];
  cartTotal: number;
  imageURL: string;
  user: any;
  auth: boolean;
  isLoading: boolean;
  error: string | null;
  userCart: any;
  userFavorite: any;
  fetchStoreData: () => Promise<void>;
  addToFavorite: (id: number) => void;
  addToCart: (data: any, selectedSize: any) => void;
  increaseQuantity: (id: any, size: any) => void;
  decreaseQuantity: (id: any, size: any) => void;
  removeItemFromCart: (id: number, quantity: number) => void;
  calculateTotalCart: () => void;
  logUser: (data: any) => void;
  logoutUser: () => void;
  deleteAccount: (id: string) => void;
  placeOrder: () => void;
};

export const useStore = create<StoreData>()(
  persist(
    (set) => ({
      coffeeList: [],
      favoriteList: [],
      cartList: [],
      orderHistory: [],
      userOrderHistory: [],
      cartTotal: 0,
      imageURL: "",
      user: [],
      auth: false,
      isLoading: false,
      error: null,
      userCart: [],
      userFavorite: [],
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
      addToCart: (data: any, selectedSize: any) => {
        set(
          produce((state) => {
            const addItemToCart = (cartData: any) => {
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
      logUser: (data) => {
        set(
          produce((state) => {
            state.auth = true;
            state.user = data;
            state.userCart = data.userCart || [];
            state.userFavorite = data.userFavorite || [];
            state.userOrderHistory = data.userOrderHistory || [];
          })
        );
      },
      logoutUser: () => {
        set(
          produce((state) => {
            state.userCart = [];
            state.userFavorite = [];
            state.user = [];
            state.userOrderHistory = [];
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
