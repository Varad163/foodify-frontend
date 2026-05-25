import axiosInstance from "@/lib/axios";

export const getAvailableOrders =
  async () => {

    const response =
      await axiosInstance.get(
        "/delivery/available-orders"
      );

    return response.data;
};

export const acceptDelivery =
  async (orderId: number) => {

    const response =
      await axiosInstance.put(
        `/delivery/accept/${orderId}`
      );

    return response.data;
};

export const pickupOrder =
  async (orderId: number) => {

    const response =
      await axiosInstance.put(
        `/delivery/pickup/${orderId}`
      );

    return response.data;
};

export const deliverOrder =
  async (orderId: number) => {

    const response =
      await axiosInstance.put(
        `/delivery/deliver/${orderId}`
      );

    return response.data;
};