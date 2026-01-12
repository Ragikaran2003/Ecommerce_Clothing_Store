import React, { useEffect, useState } from "react";

const Loading = ({ size = "w-12 h-12", color = "border-blue-500", message = "Loading..." }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div className={`animate-spin rounded-full border-4 border-t-transparent ${color} ${size}`} />
      <p className="text-gray-700 text-sm">{message}</p>
    </div>
  );
};

export default Loading;
