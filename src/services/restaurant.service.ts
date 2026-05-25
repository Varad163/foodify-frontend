import api from "@/lib/axios";

export const getAllRestaurants =
  async () => {
    const response = await api.get(
      "/restaurant/all"
    );

    return response.data;
  };