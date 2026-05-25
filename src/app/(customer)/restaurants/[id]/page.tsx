"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import FoodCard from "@/components/food/food-card";

import {
  getFoodsByRestaurant,
} from "@/services/food.service";

export default function RestaurantFoodsPage() {

  const params = useParams();

  const [foods, setFoods] = useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchFoods = async () => {

      try {

        const data =
          await getFoodsByRestaurant(
            params.id as string
          );

        setFoods(data);

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

        <h1 className="
          text-4xl
          font-bold
        ">
          Restaurant Foods
        </h1>

        <p className="
          text-gray-500
          mt-2
        ">
          Discover delicious meals
        </p>

      </div>

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
        gap-6
      ">

        {foods.map((food: any) => (

          <FoodCard
            key={food.id}
            food={food}
          />
        ))}

      </div>

    </main>
  );
}