import React from "react";

interface LoadingComponentProps {
  size?: "small" | "large";
}

const LoadingComponent: React.FC<LoadingComponentProps> = ({
  size = "small",
}) => {
  const sizeClasses = size === "large" ? "h-16 w-16" : "h-8 w-8";
  return (
    <img
      src="/assets/images/Double Ring-1s-200px.png"
      alt="Loader GIF"
      className={`${sizeClasses} m-auto`}
    />
  );
};

export default LoadingComponent;
