import React from 'react';
import { BodyText, Header, HeaderBold } from './UI';
import { Help } from './svg-components';

type TProps = {
  failure_reason: string;
};

export const FailureCard: React.FC<TProps> = ({ failure_reason }) => {
  return (
    <div className="bg-[#131B2D] p-[32px] rounded-[36px] rounded-br-[0px] w-full h-full border-[1px] border-[#DADCF633]">
      <div className="flex flex-row items-center justify-between">
        <div
          className={`bg-[#E01F5B40] border-[#E01F5B40] rounded-[4px] px-[12px] py-[6px] border-[1px]`}
        >
          <BodyText
            content={'Failed'}
            xlSize="xl:text-bodyXs"
            lgSize="lg:text-bodyXs"
            mdSize="md:text-bodyXs"
            color={'text-SemanticsRed'}
            mediumFont
          />
        </div>
      </div>
      <div className="mt-[40px]">
        <Header
          content={`${failure_reason}`}
          lgSize="lg:text-headingMd"
          color={'text-white'}
        />
        <div className="mt-[4px]">
          <BodyText
            content={`Please try again or reach out to our support team for assistance.`}
            xlSize="xl:text-bodyMd"
            lgSize="lg:text-bodyMd"
            mdSize="md:text-bodyMd"
            color={'text-white'}
            opacity="opacity-70"
          />
        </div>
      </div>
      <div className="mt-[32px] bg-[#FFFFFF26] h-[1px] w-full"></div>
      <div className="mt-[32px] bg-[#FFFFFF21] rounded-[12px]">
        <div className="flex flex-row items-start gap-4 px-[20px] py-[24px]">
          <div>
            <Help fillColor="white" />
          </div>
          <div>
            <HeaderBold
              content={'How to make it work'}
              lgSize="lg:text-headingBoldMd"
              color="text-white"
            />
            <div className="mt-[4px]"></div>
            <BodyText
              content={`Please retry the process, and if the problem persists, reach out to our dedicated support team. We're here to assist you and ensure a smooth optimization experience!`}
              xlSize="xl:text-bodyMd"
              lgSize="lg:text-bodyMd"
              mdSize="md:text-bodyMd"
              color={'text-[#D5D6D8]'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
