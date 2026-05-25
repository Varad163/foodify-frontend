import api from "@/lib/axios";

export const placeOrder = async () => {

  const response = await api.post(
    "/order/place"
  );

  return response.data;
};

export const getMyOrders = async () => {

  const response = await api.get(
    "/order/my"
  );

  return response.data;
};