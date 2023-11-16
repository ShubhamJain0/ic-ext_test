import React, { useEffect, useRef, useState } from 'react';
import { Email, Expand, Folder, Hashtag, Password, UserAvatar } from '../svg-components';
import { BodyText } from './BodyText';

interface DropdownOptions {
  label: string;
  value: string;
  tag?: string;
}

interface DropdownProps {
  label: string;
  name: string;
  placeholder: string;
  onOptionSelect: (param: DropdownOptions) => void;
  options: DropdownOptions[];
  required?: boolean;
  errorText?: string;
  icon?: 'hashtag' | 'user-avatar' | 'email' | 'password' | 'folder';
  iconColor?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  focusClasses?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  placeholder,
  onOptionSelect,
  name,
  required = false,
  errorText,
  icon,
  iconColor,
  onFocus,
  onBlur,
  focusClasses,
  options,
}) => {
  const inputRef: any = useRef(null);
  const [focusEffects, setFocusEffects] = useState<string>();
  const [rotateExpandIcon, setRotateExpandIcon] = useState('0');
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  //The below code is used to add focus effects to the input field's outer div when input is focused
  const handleFocus = () => {
    setFocusEffects(focusClasses);
    setRotateExpandIcon('180');
    if (onFocus) {
      onFocus();
    }
  };

  //The below code is used to add blur effects to the input field's outer div when input is blurred
  const handleBlur = () => {
    setFocusEffects('');
    setRotateExpandIcon('0');
    setShowOptions(false);
    if (onBlur) {
      onBlur();
    }
  };

  const handleOptionSelect = (option: DropdownOptions) => {
    handleBlur();
    onOptionSelect(option);
    setSelectedOption(option.label);
    //Blur the select div after selecting an option
    inputRef?.current?.blur();
  };

  const handleOnClick = () => {
    if (showOptions) {
      handleBlur();
    } else {
      setShowOptions(true);
    }
  };

  return (
    <div className="relative flex flex-col mb-[5px]">
      <label className="text-TypographyDark font-satoshiMedium text-bodyLg">
        {label}
      </label>
      <div
        tabIndex={0}
        ref={inputRef}
        className={`relative flex flex-row gap-4 items-center bg-InputBG h-[50px] rounded-[12px] px-[18px] py-[20px] mt-[10px] border-[1px] cursor-pointer ${focusEffects} ${
          errorText ? 'border-errorRed bg-errorRed bg-opacity-[0.1]' : 'border-InputBG'
        }`}
        onClick={handleOnClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
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
          ) : icon === 'folder' ? (
            <Folder fillColor={iconColor} />
          ) : null)}
        <BodyText
          content={selectedOption || placeholder}
          color={selectedOption ? 'text-TypographyDark' : 'text-TypographyDarker'}
          xlSize="xl:text-bodyLg"
          lgSize="lg:text-bodyLg"
        />
        <div className="flex flex-1 justify-end">
          <div className={`transition-all rotate-${rotateExpandIcon}`}>
            <Expand />
          </div>
        </div>
        {/* Dropdown Modal */}
        {showOptions && (
          <div className="absolute max-h-[316px] z-[999999] top-[55px] left-0 right-0 p-[12px] bg-white border-[1px] border-TypographyLight rounded-[16px] overflow-y-scroll">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleOptionSelect(option)}
                className="flex flex-row items-center gap-4 justify-between px-[20px] py-[18px] rounded-[12px] hover:bg-[#4519E814] group"
              >
                <BodyText
                  content={option.label}
                  color="text-TypographyDark"
                  xlSize="xl:text-bodyMd"
                  lgSize="lg:text-bodyMd"
                  mediumFont
                />
                <div className="px-[12px] py-[6px] rounded-[4px] bg-[#F4F4F5] group-hover:bg-[#ffffff]">
                  <BodyText
                    content={option.tag!}
                    color="text-TypographyDark"
                    xlSize="xl:text-bodyXs"
                    lgSize="lg:text-bodyXs"
                    mdSize="md:text-bodyXs"
                    smSize="sm:text-bodyXs"
                    xsSize="xs:text-bodyXs"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
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
