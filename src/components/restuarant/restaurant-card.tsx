import Link from "next/link";

import { Restaurant }
from "@/types/restaurant.types";

interface Props {
  restaurant: Restaurant;
}

export default function RestaurantCard({
  restaurant,
}: Props) {

  return (

    <Link
      href={`/restaurants/${restaurant.id}`}
    >

      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          bg-card
          shadow-sm
          transition
          hover:shadow-lg
          hover:scale-[1.01]
          cursor-pointer
        "
      >

        <div
          className="
            h-48
            w-full
            bg-muted
          "
        >

          {restaurant.imageUrl ? (

            <img
              src={restaurant.imageUrl}
              alt={restaurant.name}
              className="
                h-full
                w-full
                object-cover
              "
            />

          ) : (

            <div
              className="
                flex
                h-full
                items-center
                justify-center
                text-muted-foreground
              "
            >
              No Image
            </div>
          )}
        </div>

        <div className="space-y-3 p-5">

          <div>

            <h2
              className="
                text-xl
                font-bold
              "
            >
              {restaurant.name}
            </h2>

            <p
              className="
                text-sm
                text-muted-foreground
              "
            >
              {restaurant.description}
            </p>

          </div>

          <div
            className="
              flex
              items-center
              justify-between
            "
          >

            <span className="text-sm">
              ⭐ {restaurant.rating || 4.5}
            </span>

            <span
              className="
                text-sm
                text-muted-foreground
              "
            >
              30-40 min
            </span>

          </div>

        </div>

      </div>

    </Link>
  );
}