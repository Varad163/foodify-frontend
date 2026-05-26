interface Props {

  status: string;
}

const statuses = [

  "CONFIRMED",

  "PREPARING",

  "OUT_FOR_DELIVERY",

  "DELIVERED",
];

export default function
OrderStatusTimeline({
  status,
}: Props) {

  const currentIndex =
    statuses.indexOf(status);

  return (

    <div
      className="
        mt-6
        flex
        items-center
        justify-between
      "
    >

      {statuses.map(
        (step, index) => {

          const active =
            index <= currentIndex;

          return (

            <div
              key={step}
              className="
                flex
                flex-1
                items-center
              "
            >

              {/* CIRCLE */}

              <div
                className={`
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  text-sm
                  font-bold
                  text-white
                  ${
                    active
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }
                `}
              >
                {index + 1}
              </div>

              {/* LINE */}

              {index <
                statuses.length - 1 && (

                <div
                  className={`
                    h-1
                    flex-1
                    ${
                      active
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }
                  `}
                />
              )}
            </div>
          );
        }
      )}

    </div>
  );
}