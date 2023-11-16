import React from 'react';

type HeaderProps = {
  content: string;
  color?: 'text-white' | 'text-TypographyDark' | 'text-TypographyLight' | string;
  lgSize?: string;
  mdSize?: string;
  smSize?: string;
  xsSize?: string;
  align?: string;
};

export const Header: React.FC<HeaderProps> = ({
  content,
  color = 'text-white',
  lgSize = 'lg:text-headingLg',
  mdSize = 'md:text-headingMd',
  smSize = 'sm:headingSm',
  xsSize = 'xs:headingXs',
  align = 'text-left',
}) => {
  return (
    <h1
      className={`${color} font-satoshiMedium ${lgSize} ${mdSize} ${smSize} ${align} whitespace-pre-line`}
    >
      {content}
    </h1>
  );
};
