import { router } from "expo-router";

export const navigateToScreen = (pathName: any, params?: any) => {
  router.push({ pathname: pathName, params: { data: JSON.stringify(params) } });
};

export const goBackOneStep = () => {
  router.back()
}