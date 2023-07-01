import React from "react";

const Loading = ({ text }) => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      Loading {text}...
    </div>
  );
};

export default Loading;
