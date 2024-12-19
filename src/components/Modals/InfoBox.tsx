import React from "react";

interface InfoBoxProps {
  step: number;
  onNext: () => void;
  onPrevious: () => void;
  onDismiss: () => void;
  arrowPosition?: "top" | "bottom" | "left" | "right" | "topLeft" | "topRight";
  className?: string;
}

const InfoBox: React.FC<InfoBoxProps> = ({
  step,
  onNext,
  onPrevious,
  onDismiss,
  arrowPosition = "top",
  className,
}) => {
  const steps = [
    {
      text: "You can choose a logo or image from your gallery and add it to the garment.",
    },
    {
      text: "You can add text to the garment with different fonts, colors and size.",
    },
    {
      text: "You can add numbers to the garment with different fonts, colors and size",
    },
    {
      text: "You can turn the garment to repeat the previous steps on the back of the garment",
    },
    {
      text: "you can see the customizations made in each product",
    },
  ];

  const currentStep = steps[step - 1];

  const arrowStyles = {
    top: "absolute top-[-8px] left-1/2 transform -translate-x-1/2 border-b-8 border-b-white border-l-8 border-l-transparent border-r-8 border-r-transparent",
    bottom:
      "absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 border-t-8 border-t-white border-l-8 border-l-transparent border-r-8 border-r-transparent",
    left: "absolute left-[-8px] top-1/2 transform -translate-y-1/2 border-r-8 border-r-white border-t-8 border-t-transparent border-b-8 border-b-transparent",
    right:
      "absolute right-[-8px] top-1/2 transform -translate-y-1/2 border-l-8 border-l-white border-t-8 border-t-transparent border-b-8 border-b-transparent",
    topLeft:
      "absolute top-[-8px] left-4 border-b-8 border-b-white border-l-8 border-l-transparent border-r-8 border-r-transparent",
    topRight:
      "absolute top-[-8px] right-4 border-b-8 border-b-white border-l-8 border-l-transparent border-r-8 border-r-transparent",
  };

  return (
    <div
      className={`relative max-w-sm p-4 bg-white text-black h-full rounded-md ${className}`}
    >
      <div className={arrowStyles[arrowPosition]}></div>
      <p>{currentStep.text}</p>
      <div className="flex justify-between items-center mt-4 gap-4">
        <button
          onClick={onDismiss}
          className="bg-logo text-white px-3 py-1 rounded-md "
        >
          Dismiss
        </button>
        <span className="text-black">
          {step}/{steps.length}
        </span>
        <div className="flex flex-col lg:flex-row  gap-2  ">
          {step > 1 && (
            <button
              onClick={onPrevious}
              className="bg-logo text-white px-3 py-1 rounded-md "
            >
              Previous
            </button>
          )}
          {step < steps.length && (
            <button
              onClick={onNext}
              className="bg-logo text-white px-3 py-1 rounded-md"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoBox;
