import React from 'react';
import { BodyText, HeaderBold } from './UI';

type ConversionCardProps = {
  title: string;
  description: string;
  showRecommendedTag: boolean;
  isSelected: boolean;
  onClick: () => void;
};

export const ConversionCard: React.FC<ConversionCardProps> = ({
  title,
  description,
  showRecommendedTag,
  isSelected,
  onClick,
}: any) => {
  return (
    <div
      className={`p-[24px] border-[1px] ${
        isSelected ? 'border-Primary bg-[#4519E80A]' : 'border-TypographyLight'
      } rounded-[12px] cursor-pointer hover:border-Primary hover:bg-[#4519E80A] transition-all duration-400 overflow-hidden`}
      onClick={onClick}
    >
      <div className="flex flex-row gap-4 items-center justify-between">
        {showRecommendedTag ? (
          <div className="px-[12px] py-[6px] rounded-[4px] bg-[#FFDC82]">
            <BodyText
              content="Recommended"
              color="text-TypographyDark"
              xlSize="xl:text-bodyXs"
              lgSize="lg:text-bodyXs"
              mdSize="md:text-bodyXs"
              smSize="sm:text-bodyXs"
              mediumFont
            />
          </div>
        ) : (
          <div></div>
        )}
        {isSelected ? (
          <div className="w-[24px] h-[24px] min-w-[24px] rounded-[100px] bg-Primary flex justify-center items-center">
            <img src="images/check.svg" />
          </div>
        ) : (
          <div className="w-[24px] h-[24px] min-w-[24px] rounded-[100px] bg-TypographyLight"></div>
        )}
      </div>
      <div className="mt-[18px]">
        <HeaderBold
          content={title}
          lgSize="lg:headingBoldMd"
          color="text-TypographyDark"
        />
      </div>
      <div className="mt-[4px] max-w-[90%]">
        <BodyText
          content={description}
          xlSize="xl:text-bodySm"
          lgSize="lg:text-bodySm"
          mdSize="md:text-bodySm"
          smSize="sm:text-bodySm"
          color="text-TypographyDarker"
        />
      </div>
    </div>
  );
};
