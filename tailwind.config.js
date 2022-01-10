module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    spacing: {
      0: '0px',
      px: '1px',
      0.5: '2px',
      1: '4px',
      1.5: '6px',
      2: '8px',
      2.5: '10px',
      3: '12px',
      3.5: '14px',
      4: '16px',
      5: '20px',
      6: '24px',
      7: '28px',
      8: '32px',
      9: '36px',
      10: '40px',
      11: '44px',
      12: '48px',
      14: '56px',
      16: '64px',
      20: '80px',
      24: '96px',
      28: '112px',
      32: '128px',
      36: '144px',
      38: '152px',
      40: '160px',
      44: '176px',
      48: '192px',
      52: '208px',
      56: '224px',
      60: '240px',
      64: '256px',
      72: '288px',
      80: '320px',
      96: '384px',
      120: '480px',
      180: '720px'
    },
    colors: {
      black: '#13161D',
      black50: '#E7E8E8',
      black100: '#B6B7B9',
      black200: '#929497',
      black300: '#616368',
      black400: '#42454A',
      black450: '#22252A',
      black500: '#13161D',
      black600: '#11141A',
      black700: '#0D1015',
      black800: '#0A0C10',
      black900: '#08090C',
      gray: '#1D2026',
      darkBlue100: '#6351DD',
      darkBlue200: '#5A4AC8',
      darkBlue300: '#5144B2',
      darkBlue400: '#483D9D',
      darkBlue500: '#3F3788',
      darkBlue600: '#373072',
      darkBlue700: '#2E2A5D',
      darkBlue800: '#252348',
      darkBlue900: '#1C1D32',
      lightBlue100: '#6351DD',
      lightBlue200: '#5C6AE0',
      lightBlue300: '#5584E3',
      lightBlue400: '#4E9EE6',
      lightBlue500: '#47B7E9',
      lightBlue600: '#6AC4EC',
      lightBlue700: '#8DD0EE',
      lightBlue800: '#B0DDF1',
      lightBlue900: '#D3E9F3',
      chartreuse100: '#E9F8CA',
      chartreuse200: '#DCFA9D',
      chartreuse300: '#CFFB71',
      chartreuse400: '#C2FD44',
      chartreuse500: '#B5FF18',
      chartreuse600: '#95D019',
      chartreuse700: '#74A21A',
      chartreuse800: '#54731B',
      chartreuse900: '#33451C',
      neutral100: '#F6F6F6',
      neutral200: '#DDDDDE',
      neutral300: '#C4C4C6',
      neutral400: '#AAABAE',
      neutral500: '#919296',
      neutral600: '#787A7D',
      neutral700: '#5F6165',
      neutral800: '#45484D',
      neutral900: '#2C2F35',
      offWhite: '#F6F6F6',
      orange: '#FF5D18',
      yellow: '#FFF22E',
      white: '#FFFFFF',
      semanticGreen: '#40DD7F',
      semanticRed: '#FF6262',
      semanticOrange: '#ED8936',
      tagBorder: '3A3A3A',
      purple: '#AC54FF'
    },
    fontSize: {
      xxsm: ['14px', '18px'],
      xsm: ['16px', '20px'],
      sm: ['18px', '22px'],
      base: ['20px', '24px'],
      lg: ['22px', '26px'],
      xl: ['25px', '30px'],
      xxl: ['28px', '32px'],
      xxxl: ['32px', '38px']
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      backgroundImage: () => ({
        homeDotsBackground: "url('./assets/images/homeDotsBackground.svg')",
      }),
      fontFamily: {
        sans: ['Vogie']
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}