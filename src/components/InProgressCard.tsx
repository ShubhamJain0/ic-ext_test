import React from 'react';
import { BodyText, Header, HeaderBold } from './UI';
import { HourGlass } from './svg-components';

type TProps = {
  estimated_time: string;
  imageCompletedCount: number;
  imageTotalCount: number;
  percentageCompleted: number;
  onSendEmailCheck: () => void;
  emailChecked: boolean;
};

export const InProgressCard: React.FC<TProps> = ({
  estimated_time,
  imageCompletedCount,
  imageTotalCount,
  percentageCompleted,
  onSendEmailCheck,
  emailChecked,
}) => {
  return (
    <div className="bg-[#131B2D] p-[32px] rounded-[36px] rounded-br-[0px] w-full h-full border-[1px] border-[#DADCF633]">
      <div className="flex flex-row gap-4 items-center justify-between">
        <div
          className={`bg-[#FFDC821F] border-[#FFDC8240] rounded-[4px] px-[12px] py-[6px] border-[1px]`}
        >
          <BodyText
            content={'In Progress'}
            xlSize="xl:text-bodyXs"
            lgSize="lg:text-bodyXs"
            mdSize="md:text-bodyXs"
            color={'text-SemanticsYellow'}
            mediumFont
          />
        </div>
        <div className="bg-Secondary min-w-[136px] rounded-[40px] px-[18px] py-[12px]">
          <BodyText
            content={`${imageCompletedCount} of ${imageTotalCount} images`}
            xlSize="xl:text-bodyXs"
            lgSize="lg:text-bodyXs"
            mdSize="md:text-bodyXs"
            color={'text-TypographyDark'}
            mediumFont
          />
        </div>
      </div>
      <div className="mt-[40px]">
        <div className="flex flex-row items-center gap-4">
          <Header
            content={`${estimated_time} remaining...`}
            lgSize="lg:text-headingMd"
            color={'text-white'}
          />
          <HourGlass fillColor="#FFDC82" />
        </div>
        <div className="mt-[4px]">
          <BodyText
            content={`Overall estimated time for the process`}
            xlSize="xl:text-bodyMd"
            lgSize="lg:text-bodyMd"
            mdSize="md:text-bodyMd"
            color={'text-white'}
            opacity="opacity-70"
          />
        </div>
      </div>
      <div className="mt-[32px] w-[100%]">
        <div className="bg-[#FFFFFF26] h-[20px] w-full rounded-[10px] rounded-br-[0px]">
          <div
            style={{ width: `${percentageCompleted}%` }}
            className={`h-[20px] bg-SemanticsGreen rounded-[10px] rounded-br-[0px] transition-all duration-400`}
          ></div>
        </div>
        <div
          style={{ width: `${percentageCompleted}%` }}
          className="h-[56px] border-r-[1px] border-SemanticsGreen bg-gradient-to-r from-[#2AF19300] from-60% to-[#5BFBB01A] to-99.99% transition-all duration-400"
        ></div>
        <div
          style={{
            width: `${percentageCompleted}%`,
          }}
          className={`mt-[10px] lg:min-w-[18%] min-w-[40%] transition-all duration-400 flex ${
            percentageCompleted <= 20 ? 'justify-start' : 'justify-end'
          } ${percentageCompleted >= 20 && percentageCompleted < 95 ? 'ml-[50px]' : ''}`}
        >
          <Header
            content={`${percentageCompleted}% complete`}
            lgSize="lg:text-bodyMd"
            mdSize="md:text-bodyMd"
            smSize="sm:text-bodySm"
            xsSize="xs:text-bodyXs"
            color="text-SemanticsGreen"
          />
        </div>
      </div>
      <div className="mt-[32px] bg-[#FFFFFF26] h-[1px] w-full"></div>
      <div className="mt-[32px] bg-[#FFFFFF21] rounded-[12px]">
        <div className="flex flex-row items-start gap-4 px-[20px] py-[24px]">
          <img src="images/optimization.svg" />
          <div>
            <HeaderBold
              content={'Optimization on Autopilot'}
              lgSize="lg:text-headingBoldMd"
              color="text-white"
            />
            <div className="mt-[4px]"></div>
            <BodyText
              content={`No need to worry, even if you close your tab. Octo Optimizer continues to work in the background. We'll notify you of the results via email.`}
              xlSize="xl:text-bodyMd"
              lgSize="lg:text-bodyMd"
              mdSize="md:text-bodyMd"
              color={'text-[#D5D6D8]'}
            />
          </div>
        </div>
        <div className="bg-[#FFFFFF26] h-[1px] w-full"></div>
        <div className="px-[20px] py-[24px] flex flex-row items-center gap-4 flex justify-start">
          <div
            onClick={() => onSendEmailCheck()}
            className={`min-w-[20px] w-[20px] h-[20px] flex items-center justify-center rounded-[4px] cursor-pointer ${
              emailChecked ? 'bg-Primary' : 'bg-TypographyLight'
            }`}
          >
            {emailChecked && <img src="images/check.svg" alt="check" />}
          </div>
          <BodyText
            content={'Send me an email once the task is finished.'}
            xlSize="xl:text-bodyMd"
            lgSize="lg:text-bodyMd"
            color="text-white"
            mediumFont
          />
        </div>
      </div>
    </div>
  );
};
