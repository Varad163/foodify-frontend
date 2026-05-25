"use client";

import { useEffect, useState }
from "react";

import { useParams }
from "next/navigation";

import FoodCard
from "@/components/food/food-card";

import {
  getFoodsByRestaurant,
} from "@/services/food.service";

export default function RestaurantFoodsPage() {

  const params = useParams();

  const [foods, setFoods] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchFoods = async () => {

      try {

        const data =
          await getFoodsByRestaurant(
            params.id as string
          );

        console.log(data);

        // IMPORTANT FIX
        setFoods(data.data.content);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

    fetchFoods();

  }, [params.id]);

  if (loading) {

    return (

      <div className="p-6">
        Loading foods...
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
          Restaurant Foods
        </h1>

        <p
          className="
            mt-2
            text-gray-500
          "
        >
          Discover delicious meals
        </p>

      </div>

      {foods.length === 0 ? (

        <div
          className="
            text-gray-500
            text-lg
          "
        >
          No foods available
        </div>

      ) : (

        <div
          className="
            grid
            grid-cols-1
            gap-6
            md:grid-cols-2
            lg:grid-cols-3
          "
        >

          {foods.map((food) => (

            <FoodCard
              key={food.id}
              food={food}
            />
          ))}

        </div>
      )}

    </main>
  );
}