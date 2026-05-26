import api from "@/lib/axios";

export const payOrder =
  async (
    orderId: number,
    method: string
  ) => {

    const response =
      await api.post(

        `/payment/pay/${orderId}`,

        null,

        {
          params: {
            method,
          },
        }
      );

    return response.data;
};

export const getMyPayments =
  async () => {

    const response =
      await api.get(
        "/payment/my"
      );

    return response.data;
};