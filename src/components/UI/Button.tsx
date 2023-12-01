import React from 'react';
import { RightArrow } from '../svg-components';

interface ButtonProps {
  label: string;
  type: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  size?: 'medium' | 'large';
  topShadow?: boolean;
  showRightIcon?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  className,
  type,
  size = 'large',
  topShadow,
  disabled = false,
  showRightIcon,
}) => {
  return (
    <button
      disabled={disabled}
      className={`font-satoshiMedium text-left ${
        size === 'medium'
          ? `sm:text-bodySm text-bodyXs ${
              disabled
                ? 'text-Gray bg-TypographyLight'
                : 'text-white bg-Primary bg-gradient-to-b from-Primary to-BtnHover active:from-BtnPressed active:to-BtnPressed bg-pos-0 bg-size-900 hover:bg-pos-100 transition-all duration-[400ms]'
            } rounded-[26px] px-[20px] py-[8px]`
          : `md:text-bodyMd sm:text-bodySm text-bodyXs ${
              disabled
                ? 'text-Gray bg-TypographyLight'
                : 'text-white bg-Primary bg-gradient-to-b from-Primary to-BtnHover active:from-BtnPressed active:to-BtnPressed bg-pos-0 bg-size-900 hover:bg-pos-100 transition-all duration-[400ms]'
            } rounded-[44px] px-[40px] py-[18px]`
      } ${
        topShadow
          ? 'shadow-[inset_1.5px_1.5px_0px_0px_#FFFFFF33]'
          : 'shadow-[inset_-1.5px_-1.5px_0px_0px_#FFFFFF33]'
      }
      ${showRightIcon && 'flex flex-row gap-[30px] justify-between items-center'}
      ${className}`}
      onClick={onClick}
      type={type}
    >
      {label}
      {showRightIcon && <RightArrow fillColor="white" />}
    </button>
  );
};
