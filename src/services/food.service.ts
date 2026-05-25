import api from "@/lib/axios";

export const getFoodsByRestaurant = async (
  restaurantId: string
) => {

  const response = await api.get(
    `/food/restaurant/${restaurantId}`
  );

  return response.data;
};