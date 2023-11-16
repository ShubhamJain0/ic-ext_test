import React from 'react';

type HeaderBoldProps = {
  content: string;
  color?: 'text-white' | 'text-TypographyDark' | 'text-TypographyLight' | string;
  lgSize?: string;
  mdSize?: string;
  smSize?: string;
  xsSize?: string;
  align?: string;
};

export const HeaderBold: React.FC<HeaderBoldProps> = ({
  content,
  color = 'text-white',
  lgSize = 'lg:text-headingBoldLg',
  mdSize = 'md:text-headingBoldMd',
  smSize = 'sm:headingBoldSm',
  xsSize = 'xs:headingBoldXs',
  align = 'text-left',
}) => {
  return (
    <h1
      className={`${color} font-satoshiBold ${lgSize} ${mdSize} ${smSize} ${align} whitespace-pre-line`}
    >
      {content}
    </h1>
  );
};
