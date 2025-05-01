import { useEffect } from "react";
import ProgressBar from "./ProgressBar.jsx";
let timeUntilErase = 3000;
export default function DeleteConfirmation({ onConfirm, onCancel,brandImage,brandName }) {
  useEffect(() => {
    const countDown = setTimeout(() => {
      onConfirm();
    }, timeUntilErase);

    return () => {
      clearTimeout(countDown);
    };
  }, [onConfirm]);

  return (
    <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg max-w-lg mx-auto">
    <h2 className="text-2xl font-semibold mb-4">{brandName}</h2>
    <img src={brandImage} className="w-1/3 object-contain" alt="brand Logo" />

  
    <div className="flex gap-4 w-full mb-4">
      <button
        onClick={onCancel}
        className="flex-1 me-2 text-gray-800 bg-yellow-400 hover:bg-yellow-500 focus:ring-2 focus:ring-yellow-300 font-medium rounded-lg text-sm px-4 py-2.5 transition ease-in-out duration-150"
      >
        No
      </button>
      <button
        onClick={onConfirm}
        className="flex-1 ms-3 text-white bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2.5 transition ease-in-out duration-150"
      >
        Yes
      </button>
    </div>
  
    <p className="text-gray-500 text-sm mb-4 text-center">Time Until button closes</p>
  
    <ProgressBar className="w-full mt-4" />
  </div>
  
  );
}
