import React from "react";

interface SpinnerProps {
  size?: number;
  color?: string;
  className?: string;
  containerClass?: string;
  backDrop?: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = 24,
  color = '#3b82f6',
  className = '',
  containerClass = '',
  backDrop = false,
}) => {
  return (
    <div
      className={`
        ${backDrop
          ? 'fixed top-0 left-0 w-full h-full bg-black/15 flex items-center justify-center'
          : 'w-screen h-full flex items-center justify-center'
        } 
        ${containerClass}
      `}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div
        className={`
          inline-block rounded-full animate-spin border-4 border-white border-t-blue-500 xl:ms-[250px] ms-[220px]
          ${className}
        `}
        style={{
          width: size,
          height: size,
          borderTopColor: color,
        }}
      />
    </div>
  );
};

export default Spinner;
