import React from "react";

type AlertProps = {
  message: string;
  type?: "success" | "error" | "warning" | "info";
  onClose?: () => void;
};

const typeStyles = {
  success: "bg-green-100 text-green-800 border-green-400",
  error: "bg-red-100 text-red-800 border-red-400",
  warning: "bg-yellow-100 text-yellow-800 border-yellow-400",
  info: "bg-blue-100 text-blue-800 border-blue-400",
};

const Alert = ({ message, type = "info", onClose }: AlertProps) => {
  return (
    <div
      className={`border px-4 py-3 rounded relative flex items-center justify-between ${typeStyles[type]}`}
      role="alert"
    >
      <span>{message}</span>
      {onClose && (
        <button
          className="ml-4 text-xl font-bold focus:outline-none"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default Alert