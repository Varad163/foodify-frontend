type FoodCardProps = {
  food: any;
};

export default function FoodCard({
  food,
}: FoodCardProps) {

  return (

    <div
      className="
        border
        rounded-2xl
        overflow-hidden
        shadow-sm
        hover:shadow-lg
        transition
        bg-white
      "
    >

      <div
        className="
          h-52
          bg-gray-100
          flex
          items-center
          justify-center
          text-gray-400
        "
      >
        No Image
      </div>

      <div className="p-4">

        <div className="
          flex
          items-start
          justify-between
        ">

          <div>

            <h2 className="
              text-lg
              font-bold
            ">
              {food.name}
            </h2>

            <p className="
              text-sm
              text-gray-500
              mt-1
            ">
              {food.description}
            </p>

          </div>

        </div>

        <div className="
          mt-4
          flex
          items-center
          justify-between
        ">

          <span className="
            text-lg
            font-bold
          ">
            ₹{food.price}
          </span>

          <button
            className="
              bg-black
              text-white
              px-4
              py-2
              rounded-lg
              hover:bg-gray-800
              transition
            "
          >
            Add
          </button>

        </div>

      </div>

    </div>
  );
}