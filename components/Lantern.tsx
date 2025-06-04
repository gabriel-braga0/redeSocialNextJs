import React from "react";

const Checkbox = () => {
  return (
    <div className="flex w-full h-screen items-center justify-center bg-gray-600">
      <label
        title="Tap to light"
        className="relative flex flex-col items-center justify-center"
      >
        <input type="checkbox" className="peer hidden" />
        <div className="absolute bottom-[55px] mx-auto mt-10 h-[0px] w-[60px] overflow-hidden rounded-2xl bg-gradient-to-t from-[#ffff] duration-500 peer-checked:h-[100px] before:absolute before:h-full before:w-[15px] before:origin-bottom-right before:-rotate-[12deg] before:bg-gray-600 after:absolute after:right-0 after:h-full after:w-[15px] after:origin-bottom-left after:rotate-[12deg] after:bg-gray-600" />
        <svg
          height={50}
          width={50}
          className="-rotate-45 cursor-pointer"
          viewBox="0 0 50 50"
        >
          <path
            fill="#00000"
            d="M31.925 27.325q-.54-.26-.985-.671-3.875-3.596-7.785-7.81-1.215-1.315-1.01-3.079.11-.985 1.125-2.829 4.806-8.74 6.26-11.156.765-1.265 2.385-.575 1.95.829 3.64 2.071.871.635 3.2 2.654 5.8 5.029 9.715 11.1 1.575 2.446-.85 3.835-5.735 3.29-11.54 6.454-1.96 1.065-4.154.004M7.015 33.146q6.685-7.317 13.271-14.481a.27.27 52.1 0 1 .435.054q.904 1.64 2.071 2.8 1.04 1.035 1.065 1.065 3.479 3.704 7.446 6.879a.221.215 43 0 1 .015.329q-9.881 9.144-19.931 18.098-1.01.9-1.785 1.075-1.24.279-2.196-.496-3.965-3.235-6-6-.671-.915-.39-2.05.171-.704 1.004-1.665 2.465-2.835 4.996-5.61m14.448-4.556a1.875 1.875 0 0 0-2.658-.042l-2.219 2.15a1.875 1.875 0 0 0-.042 2.658l.131.135a1.875 1.875 0 0 0 2.658.042l2.219-2.15a1.875 1.875 0 0 0 .042-2.658z"
          />
        </svg>
      </label>
    </div>
  );
};

export default Checkbox;
