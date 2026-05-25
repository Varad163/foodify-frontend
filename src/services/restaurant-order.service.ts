import api from "@/lib/axios";

export const getRestaurantOrders =
  async () => {

    const response =
      await api.get(
        "/restaurant/orders"
      );

    return response.data;
};

export const confirmOrder =
  async (orderId: number) => {

    const response =
      await api.put(
        `/restaurant/confirm/${orderId}`
      );

    return response.data;
};

export const prepareOrder =
  async (orderId: number) => {

    const response =
      await api.put(
        `/restaurant/prepare/${orderId}`
      );

    return response.data;
};

export const outForDelivery =
  async (orderId: number) => {

    const response =
      await api.put(
        `/restaurant/out-for-delivery/${orderId}`
      );

    return response.data;
};

export const deliverOrder =
  async (orderId: number) => {

    const response =
      await api.put(
        `/restaurant/deliver/${orderId}`
      );

    return response.data;
};

export const cancelOrder =
  async (orderId: number) => {

    const response =
      await api.put(
        `/restaurant/cancel/${orderId}`
      );

    return response.data;
};