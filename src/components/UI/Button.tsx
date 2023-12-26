import React from 'react';
import { RightArrow } from '../svg-components';

interface ButtonProps {
  label: string;
  type: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  size?: 'medium' | 'large';
  topShadow?: boolean;
  showRightIcon?: boolean;
  loading?: boolean;
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
  variant = 'primary',
  loading = false,
}) => {
  return variant === 'primary' ? (
    <button
      disabled={disabled || loading}
      className={`relative font-satoshiMedium text-center ${
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
      ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}
      ${className}`}
      onClick={onClick}
      type={type}
    >
      <div className={`${loading && 'opacity-0'}`}>{label}</div>
      {loading && (
        <div className="absolute left-0 top-0 flex items-center justify-center w-full h-full">
          <div className="flex space-x-1">
            <div className="bg-white w-[10px] h-[10px] rounded-full animate-dot1"></div>
            <div className="bg-white w-[10px] h-[10px] rounded-full opacity-70 animate-dot2"></div>
            <div className="bg-white w-[10px] h-[10px] rounded-full opacity-40 animate-dot3"></div>
          </div>
        </div>
      )}
      {showRightIcon && <RightArrow fillColor="white" />}
    </button>
  ) : variant === 'secondary' ? (
    <button
      disabled={disabled}
      className={`font-satoshiMedium text-center border-[1px] border-solid border-white ${
        size === 'medium'
          ? `sm:text-bodySm text-bodyXs ${
              disabled
                ? 'text-TypographyDarker border-TypographyDarker'
                : 'text-white bg-transparent bg-gradient-to-b from-transparent to-transparent active:from-BtnPressed active:to-BtnPressed active:border-transparent bg-pos-0 bg-size-900 hover:bg-Primary hover:border-transparent transition-all duration-[400ms]'
            } rounded-[26px] px-[20px] py-[8px]`
          : `md:text-bodyMd sm:text-bodySm text-bodyXs ${
              disabled
                ? 'text-TypographyDarker border-TypographyDarker'
                : 'text-white bg-transparent bg-gradient-to-b from-transparent to-transparent active:from-BtnPressed active:to-BtnPressed active:border-transparent bg-pos-0 bg-size-900 hover:bg-Primary hover:border-transparent transition-all duration-[400ms]'
            } rounded-[44px] px-[40px] py-[18px]`
      }
      ${showRightIcon && 'flex flex-row gap-[30px] justify-between items-center'}
      ${className}`}
      onClick={onClick}
      type={type}
    >
      {label}
      {showRightIcon && <RightArrow fillColor="white" />}
    </button>
  ) : (
    <></>
  );
};
