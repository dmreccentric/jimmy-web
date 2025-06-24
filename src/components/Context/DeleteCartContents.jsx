import React from "react";

const DeleteCartContents = ({ isOpen, onClose, onConfirm }) => {
  //   if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
      <div className="bg-white rounded-xl p-6 shadow-lg w-full max-w-md">
        <p className="text-lg font-medium text-center text-gray-800 mb-6">
          Are you sure you want to delete all cart contents?
        </p>

        <div className="flex justify-center gap-6">
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-gray-200 font-bold text-black rounded-md hover:bg-gray-300  focus:outline-none"
          >
            Yes
          </button>
          <button
            onClick={onClose}
            autoFocus
            className="px-6 py-2 font-semibold text-white rounded-md bg-red hover:bg-red  focus:outline-none"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCartContents;
