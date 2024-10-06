const MainURL = "https://expo-coffee-app-server.onrender.com";
import axios from "axios";

export const getProducts = () => {
  const route = "/products";
  return appFetch(route, "GET");
};

export const registerUser = (form: any) => {
  const route = "/registerUser";
  return appFetch(route, "POST", form);
};

export const signinUser = (form: any) => {
  const route = "/signinUser";
  return appFetch(route, "POST", form);
};

export const updateUser = (form: any) => {
  // console.log("form is ", form);
  const route = "/updateUser";
  return appFetch(route, "POST", form);
};

export const deleteAccount = (form: any) => {
  const route = "/deleteUser";
  return appFetch(route, "POST", form);
};

const appFetch = async (route: string, method: string, body?: any) => {
  const url = MainURL + route;

  const params = {
    "Content-Type": "application/json",
  };

  try {
    const response = await axios(url, {
      method: method || "GET",
      headers: params,
      data: body,
    });
    return response.data;
  } catch (err) {
    console.error("Fetching err", err);
    throw err;
  }
};
