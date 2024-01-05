import React, { useEffect, useRef, useState } from 'react';
import { BodyText } from './BodyText';
import { Info } from '../svg-components';

type ToastMessageProps = {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  show: boolean;
  hide: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ToastMessage: React.FC<ToastMessageProps> = ({
  message,
  type,
  show,
  hide,
}) => {
  const timeoutRef: any = useRef(null);
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    let intervalId: any;
    if (show) {
      setProgressWidth(0);
      // Start updating the progress bar width with interval of (5000ms to hide toast)/(100% width) = 50ms
      intervalId = setInterval(() => {
        setProgressWidth((prevWidth) => {
          const newWidth = prevWidth + 1;
          // Stop the interval when the progress reaches 100%
          if (newWidth >= 100) {
            clearInterval(intervalId);
          }
          return newWidth;
        });
      }, 50);
      timeoutRef.current = setTimeout(() => {
        hide(false);
      }, 5000);
    }

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutRef.current);
    };
  }, [show]);

  return (
    <div
      className={`${
        !show && 'translate-x-[100vw]'
      } z-[999] fixed top-[50px] right-[50px]  min-w-[300px] bg-TypographyDark rounded-[12px] rounded-br-[0px] px-[20px] py-[16px] transition-all duration-400 overflow-hidden`}
    >
      <div className="flex flex-row items-center gap-4 justify-between">
        <div className="flex flex-row items-center gap-2">
          <img
            src={`images/${
              type === 'success'
                ? 'toast-success'
                : type === 'error'
                ? 'toast-error'
                : type === 'warning'
                ? 'toast-warning'
                : 'toast-info'
            }.svg`}
          />
          <div style={{ wordBreak: 'break-word' }}>
            <BodyText
              content={message}
              color="text-white"
              xlSize="xl:text-bodyLg"
              lgSize="lg:text-bodyLg"
              mdSize="md:text-bodyMd"
              smSize="sm:text-bodySm"
              xsSize="xs:text-bodyXs"
            />
          </div>
        </div>
        <img
          className="cursor-pointer"
          src="images/toast-close.svg"
          onClick={() => hide(false)}
        />
      </div>
      <div
        className={`${
          type === 'success'
            ? 'bg-SemanticsGreen'
            : type === 'warning'
            ? 'bg-SemanticsYellow'
            : type === 'error'
            ? 'bg-SemanticsRed'
            : 'bg-Secondary'
        } h-[5px] rounded-b-[12px] rounded-br-[0px] w-full absolute bottom-0 left-0 transition-width ease-in-out duration-400`}
        style={{
          width: `${progressWidth}%`,
        }}
      ></div>
    </div>
  );
};
