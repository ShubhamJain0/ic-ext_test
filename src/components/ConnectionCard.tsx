import React from 'react';
import { BodyText } from './UI';

type TProps = {
  name: string;
  image_url: string;
  activity?: string;
  onClick?: () => void;
};

export const ConnectionCard: React.FC<TProps> = ({
  name,
  image_url,
  activity,
  onClick,
}) => {
  return (
    <div
      className="bg-[#00000033] rounded-[16px] rounded-br-[0px] overflow-hidden cursor-pointer shadow-[0px_4px_35px_0px_#FFFFFF0F]"
      onClick={onClick}
    >
      <img src={image_url} style={{ width: '100%' }} />
      <div className="px-[20px] pb-[16px]">
        <div className="mt-[20px]">
          <BodyText content={name} xlSize="xl:text-bodyMd" lgSize="lg:text-bodyMd" />
        </div>
        {activity && (
          <div className="mt-[4px]">
            <BodyText
              content={activity}
              color="text-[#BFC2C7]"
              xlSize="xl:text-bodyXs"
              lgSize="lg:text-bodyXs"
              mdSize="md:text-bodyXs"
              smSize="sm:text-bodyXs"
            />
          </div>
        )}
      </div>
    </div>
  );
};
