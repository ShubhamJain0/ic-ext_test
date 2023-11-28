/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        surface: 'linear-gradient(0.01deg, #000F33 0.01%, #00081B 99.99%)',
      },
      colors: {
        darkBlue: '#000F33',
        veryDarkBlue: '#00081B',
        Primary: '#4519E8',
        Secondary: '#9EE2FF',
        TypographyDark: '#1D1E25',
        TypographyLight: '#EAEAEB',
        InputBG: '#F4F4F5',
        errorRed: '#E01F5B',
        SemanticsGreen: '#00D64B',
        SemanticsRed: '#E01F5B',
        SemanticsYellow: '#FFDC82',
        Gray: '#96979C',
        TypographyDarker: '#474A53',
        BtnHover: '#FFFFFF2E',
        BtnPressed: '#00000066',
      },
      fontFamily: {
        satoshiMedium: ['satoshi-medium', 'sans-serif'],
        satoshiBold: ['satoshi-bold', 'sans-serif'],
        manropeRegular: ['manrope-regular', 'sans-serif'],
        manropeMedium: ['manrope-medium', 'sans-serif'],
      },
      fontSize: {
        headingLg: ['56px', '64px'],
        headingMd: ['40px', '48px'],
        headingSm: ['24px', '32px'],
        headingBoldLg: ['28px', '36px'],
        headingBoldMd: ['20px', '28px'],
        headingBoldSm: ['14px', '20px'],
        bodyXl: ['20px', '32px'],
        bodyLg: ['16px', '24px'],
        bodyMd: ['16px', '24px'],
        bodySm: ['14px', '20px'],
        bodyXs: ['12px', '18px'],
      },
      backgroundSize: {
        'size-900': '900% 900%',
      },
      backgroundPosition: {
        'pos-0': '0% 0%',
        'pos-100': '100% 100%',
      },
    },
  },
  plugins: [],
};
