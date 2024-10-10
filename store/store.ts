import { produce } from "immer";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware"; // Import the persist middleware
import AsyncStorage from "@react-native-async-storage/async-storage"; // For AsyncStorage
import Quantity from "./../components/Quantity";
import { deleteAccount, updateUser } from "@/assets/res/api";

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
  loading: boolean;
  userCart: any;
  userFavorite: any;
  fetchStoreData: (data: any) => void;
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

// Use the persist middleware to store data
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
              const item = state.coffeeList.find(
                (coffee: any) => coffee.id === id
              );
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
              const item = state.coffeeList.find(
                (coffee: any) => coffee.id === id
              );
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

              console.log("cart list is ", state.userCart);
            } else {
              addItemToCart(state.cartList);
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
