import React from 'react';
import { BodyText, Button, Header, HeaderBold } from './UI';
import { BackChevron, Info } from './svg-components';

type EstimationModalProps = {
  total_images: number;
  estimated_time: string;
  onCancel: () => void;
  onSubmit: () => void;
  isVisible: boolean;
};

export const EstimationModal: React.FC<EstimationModalProps> = ({
  isVisible,
  total_images,
  estimated_time,
  onCancel,
  onSubmit,
}) => {
  return (
    <div
      className={`${
        !isVisible && 'hidden'
      } flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.7)]`}
    >
      <div className="p-[32px] bg-white rounded-[12px] flex flex-col max-w-[38vw] max-h-[72vh] overflow-y-auto">
        <div className="flex flex-row gap-4 items-stretch justify-between">
          <div className="w-full bg-gradient-to-b from-veryDarkBlue from-0.01% to-darkBlue to-99.99% rounded-[12px] p-[20px]">
            <div className="w-[3vw] h-[4px] bg-Secondary rounded-[19px]"></div>
            <div className="mt-[44px]">
              <HeaderBold content={`${total_images} images`} />
              <div className="mt-[8px]"></div>
              <BodyText
                content="Total images"
                xlSize="xl:text-bodyMd"
                lgSize="lg:text-bodyMd"
                opacity="opacity-70"
              />
            </div>
          </div>
          <div className="w-full bg-gradient-to-b from-veryDarkBlue from-0.01% to-darkBlue to-99.99% rounded-[12px] p-[20px]">
            <div className="w-[3vw] h-[4px] bg-Secondary rounded-[19px]"></div>
            <div className="mt-[44px]">
              <HeaderBold content={`${estimated_time}`} />
              <div className="mt-[8px]"></div>
              <BodyText
                content="Estimated time"
                xlSize="xl:text-bodyMd"
                lgSize="lg:text-bodyMd"
                opacity="opacity-70"
              />
            </div>
          </div>
        </div>
        <div className="mt-[24px]">
          <div className="p-[24px] bg-[#9EE2FF40] rounded-[12px] flex flex-row gap-4">
            <span>
              <Info />
            </span>
            <BodyText
              content="This shows how many images will be improved on your site. You can keep an eye on the progress once it starts."
              xlSize="xl:text-bodyMd"
              lgSize="lg:text-bodyMd"
              color="text-TypographyDark"
            />
          </div>
        </div>
        <div className="mt-[24px] h-[1px] bg-TypographyLight"></div>
        <div className="mt-[24px] flex flex-row gap-4 items-center justify-between">
          <div
            className="cursor-pointer flex flex-row gap-2 items-center opacity-80 hover:opacity-100"
            onClick={onCancel}
          >
            <BackChevron fillColor="#4519E8" />
            <Header
              content={`Back to configure`}
              lgSize="lg:text-bodyMd"
              mdSize="md:text-bodyMd"
              smSize="sm:text-bodySm"
              color="text-Primary"
            />
          </div>
          <Button
            label="Start Optimizing"
            type="button"
            onClick={onSubmit}
            showRightIcon
          />
        </div>
      </div>
    </div>
  );
};
