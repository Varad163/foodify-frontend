"use client";

import { addToCart } from "@/services/cart.service";

interface Props {
  food: any;
}

export default function FoodCard({
  food,
}: Props) {

  const handleAddToCart = async () => {

    try {

      await addToCart(food.id);

      alert("Added to cart");

    } catch (error) {

      console.log(error);

      alert("Failed to add cart");
    }
  };

  return (

    <div
      className="
        overflow-hidden
        rounded-2xl
        border
        bg-white
        shadow-sm
        transition
        hover:shadow-lg
      "
    >

      <div
        className="
          h-48
          w-full
          bg-gray-100
          flex
          items-center
          justify-center
          text-gray-400
        "
      >
        Food Image
      </div>

      <div className="p-5 space-y-4">

        <div>

          <h2
            className="
              text-xl
              font-bold
            "
          >
            {food.name}
          </h2>

          <p
            className="
              text-sm
              text-gray-500
              mt-1
            "
          >
            {food.description}
          </p>

        </div>

        <div
          className="
            flex
            items-center
            justify-between
          "
        >

          <span
            className="
              text-lg
              font-semibold
            "
          >
            ₹ {food.price}
          </span>

          <span
            className="
              text-sm
            "
          >
            {food.veg ? "🟢 Veg" : "🔴 Non Veg"}
          </span>

        </div>

        <button
          onClick={handleAddToCart}
          className="
            w-full
            rounded-xl
            bg-black
            py-3
            text-white
            transition
            hover:opacity-90
          "
        >
          Add To Cart
        </button>

      </div>
    </div>
  );
}