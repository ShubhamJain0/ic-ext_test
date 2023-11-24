import React from 'react';

interface ButtonProps {
  label: string;
  type: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  size?: 'medium' | 'large';
  topShadow?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  className,
  type,
  size = 'large',
  topShadow,
  disabled = false,
}) => {
  return (
    <button
      disabled={disabled}
      className={`font-satoshiMedium ${
        size === 'medium'
          ? `sm:text-bodySm text-bodyXs ${
              disabled
                ? 'text-Gray bg-TypographyLight'
                : 'text-white bg-Primary bg-gradient-to-b from-Primary to-Primary active:from-BtnPressed active:to-BtnPressed hover:from-BtnHover hover:to-BtnHover'
            } rounded-[26px] px-[20px] py-[8px]`
          : `md:text-bodyMd sm:text-bodySm text-bodyXs ${
              disabled
                ? 'text-Gray bg-TypographyLight'
                : 'text-white bg-Primary bg-gradient-to-b from-Primary to-Primary active:from-BtnPressed active:to-BtnPressed hover:from-BtnHover hover:to-BtnHover'
            } rounded-[44px] px-[40px] py-[18px]`
      } ${
        topShadow
          ? 'shadow-[inset_1.5px_1.5px_0px_0px_#FFFFFF33]'
          : 'shadow-[inset_-1.5px_-1.5px_0px_0px_#FFFFFF33]'
      } ${className}`}
      onClick={onClick}
      type={type}
    >
      {label}
    </button>
  );
};
