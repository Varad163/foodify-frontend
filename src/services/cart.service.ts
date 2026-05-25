import api from "@/lib/axios";

export const addToCart = async (
  foodId: number
) => {

  const response = await api.post(
    `/cart/add`,
    {
      foodId,
      quantity: 1,
    }
  );

  return response.data;
};

export const getMyCart = async () => {

  const response = await api.get(
    "/cart/my"
  );

  return response.data;
};