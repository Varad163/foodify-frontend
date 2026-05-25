import api from "@/lib/axios";

export const getMyOrders =
  async () => {

    const response =
      await api.get(
        "/order/my"
      );

    return response.data.data;
};