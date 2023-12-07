import React from 'react';
import { BodyText, Header, HeaderBold } from './UI';
import { HourGlass } from './svg-components';

type TProps = {
  savedBytes: string;
  percentageSaved: number;
  totalImagesOptimized: number;
  dataProcessed: string;
  timeTaken: string;
};

export const SuccessCard: React.FC<TProps> = ({
  dataProcessed,
  timeTaken,
  totalImagesOptimized,
  percentageSaved,
  savedBytes,
}) => {
  return (
    <div className="bg-[#131B2D] p-[32px] rounded-[36px] rounded-br-[0px] w-full h-full border-[1px] border-[#DADCF633]">
      <div className="flex flex-row items-center justify-between">
        <div
          className={`bg-[#00D64B40] border-[#00D64B40] rounded-[4px] px-[12px] py-[6px] border-[1px]`}
        >
          <BodyText
            content={'Complete'}
            xlSize="xl:text-bodyXs"
            lgSize="lg:text-bodyXs"
            mdSize="md:text-bodyXs"
            color={'text-SemanticsGreen'}
            mediumFont
          />
        </div>
      </div>
      <div className="mt-[40px]">
        <Header
          content={`You have saved ${savedBytes}!`}
          lgSize="lg:text-headingMd"
          color={'text-white'}
        />
        <div className="mt-[4px]">
          <BodyText
            content={`That's around ${percentageSaved}% of what you've uploaded.`}
            xlSize="xl:text-bodyMd"
            lgSize="lg:text-bodyMd"
            mdSize="md:text-bodyMd"
            color={'text-white'}
            opacity="opacity-70"
          />
        </div>
      </div>
      <div className="mt-[40px] px-[24px] py-[38px] bg-Secondary rounded-[12px]">
        <div className="flex flex-row items-center gap-4 justify-between">
          <div className="flex flex-row items-center gap-4">
            <div className="bg-black rounded-[100px] p-[20px]">
              <img src="images/images-stack-large.svg" />
            </div>
            <div>
              <HeaderBold content={`${totalImagesOptimized} images`} color="text-black" />
              <div className="mt-[4px]">
                <BodyText
                  content="optimized successfully"
                  xlSize="xl:text-bodyMd"
                  lgSize="lg:text-bodyMd"
                  color="text-black"
                />
              </div>
            </div>
          </div>
          <div>
            <img src="images/celebration.svg" />
          </div>
        </div>
      </div>
      <div className="mt-[32px] flex flex-row items-start gap-8 justify-between">
        <div className="p-[24px] bg-[#FFFFFF21] rounded-[12px] w-full flex flex-col items-start">
          <div className="p-[20px] bg-[#FFFFFF21] rounded-[100px]">
            <img src="images/setting-large.svg" />
          </div>
          <div className="mt-[32px]">
            <HeaderBold content={`${dataProcessed}`} color="text-white" />
            <div className="mt-[4px]">
              <BodyText
                content="Data processed"
                xlSize="xl:text-bodyMd"
                lgSize="lg:text-bodyMd"
                color="text-white"
              />
            </div>
          </div>
        </div>
        <div className="p-[24px] bg-[#FFFFFF21] rounded-[12px] w-full flex flex-col items-start">
          <div className="p-[20px] bg-[#FFFFFF21] rounded-[100px]">
            <img src="images/time.svg" />
          </div>
          <div className="mt-[32px]">
            <HeaderBold content={`${timeTaken}`} color="text-white" />
            <div className="mt-[4px]">
              <BodyText
                content="Total time taken"
                xlSize="xl:text-bodyMd"
                lgSize="lg:text-bodyMd"
                color="text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
