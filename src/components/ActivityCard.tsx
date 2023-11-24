import React from 'react';
import { BodyText, Button, HeaderBold } from './UI';

type TProps = {
  status: 'inProgress' | 'completed' | 'failed';
  name: string;
  description: string;
  date: string;
  imageCount: number;
  percentageSaved: number;
  sizeSaved: string;
  onClick?: () => void;
};

export const ActivityCard: React.FC<TProps> = ({
  status,
  name,
  description,
  date,
  imageCount,
  percentageSaved,
  sizeSaved,
  onClick,
}) => {
  return (
    <div className="grid grid-cols-7 gap-4 items-center">
      <div className="flex flex-row items-start gap-5 col-span-2">
        <div className={`bg-[#FFFFFF26] rounded-[100px] p-[12px]`}>
          <img src="images/setting.svg" />
        </div>
        <div>
          <BodyText content={name} xlSize="xl:text-bodyMd" />
          <div className="mt-[4px]">
            <BodyText
              content={description}
              xlSize="xl:text-bodyXs"
              lgSize="lg:text-bodyXs"
              mdSize="md:text-bodyXs"
              smSize="sm:text-bodyXs"
              color="text-Gray"
            />
          </div>
        </div>
      </div>
      <div className="justify-self-center">
        <div
          className={`${
            status === 'inProgress'
              ? 'bg-[#FFDC821F] border-[#FFDC8240]'
              : status === 'completed'
              ? 'bg-[#00D64B1F] border-[#00D64B40]'
              : 'bg-[#E01F5B1F] border-[#E01F5B40]'
          } rounded-[4px] px-[12px] py-[6px] border-[1px]`}
        >
          <BodyText
            content={
              status === 'inProgress'
                ? 'In Progress'
                : status === 'completed'
                ? 'Finished'
                : 'Failed'
            }
            xlSize="xl:text-bodyXs"
            lgSize="lg:text-bodyXs"
            mdSize="md:text-bodyXs"
            align="text-center"
            color={
              status === 'inProgress'
                ? 'text-SemanticsYellow'
                : status === 'completed'
                ? 'text-SemanticsGreen'
                : 'text-SemanticsRed'
            }
            mediumFont
          />
        </div>
      </div>
      <div>
        <BodyText
          content={date}
          xlSize="xl:text-bodySm"
          lgSize="lg:text-bodySm"
          mdSize="md:text-bodySm"
          opacity="opacity-75"
          align="text-center"
        />
      </div>
      <div className="flex flex-row gap-3 items-center justify-center">
        <HeaderBold
          content={sizeSaved}
          lgSize="lg:text-bodySm"
          mdSize="md:text-bodySm"
          smSize="sm:text-bodySm"
          color="text-Secondary"
        />
        <div className="bg-Secondary px-[8px] py-[6px] rounded-[4px]">
          <BodyText
            content={percentageSaved?.toString()! + '%'}
            xlSize="xl:text-bodyXs"
            lgSize="lg:text-bodyXs"
            mdSize="md:text-bodyXs"
            smSize="sm:text-bodyXs"
            color="text-TypographyDark"
            mediumFont
          />
        </div>
      </div>
      <div className="justify-self-center">
        <div className="flex flex-row gap-3 bg-[#FFFFFF1F] rounded-[9px] rounded-br-[0px] px-[8px] py-[6px] items-center">
          <img src="images/images-stack.svg" />
          <BodyText
            content={imageCount?.toString()!}
            xlSize="xl:text-bodySm"
            lgSize="lg:text-bodySm"
            mdSize="md:text-bodySm"
          />
        </div>
      </div>
      <div className="cursor-pointer flex justify-end" onClick={onClick}>
        <Button label="View" type="button" size="medium" topShadow />
      </div>
    </div>
  );
};
