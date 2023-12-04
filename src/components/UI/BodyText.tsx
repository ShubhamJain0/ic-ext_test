import React from 'react';

interface BodyTextProps {
  content: string;
  color?:
    | 'text-white'
    | 'text-TypographyDark'
    | 'text-TypographyLight'
    | 'text-Gray'
    | string;
  xlSize?: string;
  lgSize?: string;
  mdSize?: string;
  smSize?: string;
  xsSize?: string;
  opacity?: string;
  align?: string;
  mediumFont?: boolean;
  truncate?: boolean;
}

export const BodyText: React.FC<BodyTextProps> = ({
  content,
  color = 'text-white',
  xlSize = 'xl:text-bodyXl',
  lgSize = 'lg:text-bodyLg',
  mdSize = 'md:text-bodyMd',
  smSize = 'sm:text-bodySm',
  xsSize = 'xs:text-bodyXs',
  opacity = 'opacity-100',
  align = 'text-left',
  mediumFont,
  truncate = false,
}) => {
  return (
    <p
      className={`${color} ${align} ${
        mediumFont ? 'font-manropeMedium' : 'font-manropeRegular'
      } ${xlSize} ${lgSize} ${mdSize} ${smSize} ${xsSize} m-[0px] text-bodyXs whitespace-pre-line ${opacity} ${
        truncate && 'line-clamp-1'
      }`}
    >
      {content}
    </p>
  );
};
