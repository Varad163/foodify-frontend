"use client";

import { useEffect, useState } from "react";

import RestaurantCard from "@/components/restuarant/restaurant-card";

import { getAllRestaurants } from "@/services/restaurant.service";

import { Restaurant } from "@/types/restaurant.types";

export default function RestaurantsPage() {
  const [
    restaurants,
    setRestaurants,
  ] = useState<Restaurant[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants =
    async () => {
      try {
        const data =
          await getAllRestaurants();

        setRestaurants(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  if (loading) {
    return (
      <div className="p-10">
        Loading restaurants...
      </div>
    );
  }

  return (
    <main className="p-6">
      <div className="mb-8">
        <h1
          className="
            text-4xl
            font-bold
          "
        >
          Restaurants
        </h1>

        <p className="text-muted-foreground">
          Discover amazing food
        </p>
      </div>

      <div
        className="
          grid
          gap-6
          sm:grid-cols-2
          lg:grid-cols-3
        "
      >
        {restaurants.map(
          (restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
            />
          )
        )}
      </div>
    </main>
  );
}