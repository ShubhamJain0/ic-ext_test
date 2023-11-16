import React, { useEffect, useRef, useState } from 'react';
import { Email, Hashtag, Password, UserAvatar } from '../svg-components';

interface InputProps {
  label: string;
  name: string;
  placeholder: string;
  type: React.HTMLInputTypeAttribute;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  required?: boolean;
  errorText?: string;
  icon?: 'hashtag' | 'user-avatar' | 'email' | 'password';
  iconColor?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  caretColor?: string;
  focusClasses?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  type,
  onChange,
  value,
  name,
  required = false,
  errorText,
  icon,
  iconColor,
  onFocus,
  onBlur,
  caretColor,
  focusClasses,
}) => {
  const inputRef = useRef(null);
  const [focusEffects, setFocusEffects] = useState<string>();

  //The below code is used to add focus effects to the input field's outer div when input is focused
  const handleFocus = () => {
    setFocusEffects(focusClasses);
    if (onFocus) {
      onFocus();
    }
  };

  //The below code is used to add blur effects to the input field's outer div when input is blurred
  const handleBlur = () => {
    setFocusEffects('');
    if (onBlur) {
      onBlur();
    }
  };

  return (
    <div className="relative flex flex-col mb-[5px]">
      <label className="text-TypographyDark font-satoshiMedium text-bodyLg">
        {label}
      </label>
      <div
        className={`flex flex-row gap-4 items-center bg-InputBG h-[50px] rounded-[12px] px-[18px] py-[20px] mt-[10px] border-[1px] ${focusEffects} ${
          errorText ? 'border-errorRed bg-errorRed bg-opacity-[0.1]' : 'border-InputBG'
        }`}
      >
        {icon &&
          (icon === 'user-avatar' ? (
            <UserAvatar fillColor={iconColor} />
          ) : icon === 'email' ? (
            <Email fillColor={iconColor} />
          ) : icon === 'password' ? (
            <Password fillColor={iconColor} />
          ) : icon === 'hashtag' ? (
            <Hashtag fillColor={iconColor} />
          ) : null)}
        <input
          ref={inputRef}
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          required={required}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`text-TypographyDark w-full text-bodySm font-manropeRegular bg-transparent placeholder:text-TypographyDark placeholder:text-bodySm focus:outline-none ${
            caretColor && `caret-[${caretColor}]`
          }`}
        />
      </div>
      <p
        className={`text-errorRed sm:text-bodySm xs:text-bodyXs font-manropeRegular m-0 mt-[10px] absolute -bottom-[22px] opacity-${
          errorText ? '1' : '0'
        }`}
      >
        {errorText}
      </p>
    </div>
  );
};
