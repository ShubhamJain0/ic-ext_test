import React from 'react';

interface HelpTagProps {
  text: string;
  linkText?: string;
  link?: string;
}

export const HelpTag: React.FC<HelpTagProps> = ({ text, link = '', linkText }) => {
  return (
    <div className="flex flex-row flex-wrap gap-2 items-start justify-center bg-Secondary rounded-[40px] px-[18px] py-[12px]">
      <div className="flex flex-row items-start gap-2">
        <img src="../../../assets/images/help.png" alt="help" />
        <p className="text-TypographyDark m-[0px] font-manropeRegular text-bodySm">
          {text}
        </p>
      </div>
      {linkText && (
        <a
          href={link}
          className="text-TypographyDark font-satoshiMedium text-bodySm underline"
        >
          {linkText}
        </a>
      )}
    </div>
  );
};
