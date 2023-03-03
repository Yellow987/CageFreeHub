import { ThemeOptions } from '@mui/material/styles';
import { PaletteOptions } from '@mui/material/styles/createPalette';
import { TypographyOptions } from '@mui/material/styles/createTypography';
import { PaletteColorOptions } from '@mui/material/styles/createPalette';

declare module '@mui/material/styles' {
  interface Palette {
    tertiary: Palette["primary"];
    greyOut: Palette["primary"];
    greyDefault: Palette["primary"];
    red: Palette["primary"];
    danger: Palette["primary"];
    megaDanger: Palette["primary"];
    yellow: Palette["primary"];
  }
  interface PaletteOptions {
    tertiary?: PaletteOptions["primary"];
    greyOut: PaletteOptions["primary"];
    greyDefault: PaletteOptions["primary"];
    red: PaletteOptions["primary"];
    danger: PaletteOptions["primary"];
    megaDanger: PaletteOptions["primary"];
    yellow: PaletteOptions["primary"];
  }
  interface PaletteColor {
    lighter?: string;
    darker?: string;
  }
}

interface IPaletteOptions extends PaletteOptions {
  greyOut: PaletteColorOptions;
  greyDefault: PaletteColorOptions;
  red: PaletteColorOptions;
  danger: PaletteColorOptions;
  megaDanger: PaletteColorOptions;
  yellow: PaletteColorOptions;
}

interface ITypographyOptions extends TypographyOptions {
  h1_32: React.CSSProperties;
  support_icon: React.CSSProperties;
  p_large: React.CSSProperties;
  p_large_dark: React.CSSProperties;
  p_default: React.CSSProperties;
  p_small: React.CSSProperties;
  label: React.CSSProperties;
  p_default_bold: React.CSSProperties;
}

interface IThemeOptions extends ThemeOptions {
  palette: IPaletteOptions;
  typography: ITypographyOptions;
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    danger: true;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    h1_32: true;
    support_icon: true;
    p_large: true;
    p_large_dark: true;
    p_default: true;
    p_small: true;
    label: true;
    p_default_bold: true;
  }
}

const theme: IThemeOptions  = {
  palette: {
    primary: {
      light: '#EFFAF9',
      main: '#3FAB94',
      contrastText: '#FFFFFF',
    },
    greyOut: {
      main:'#F5F7F8',
      contrastText:'#596676'
    },
    secondary: {
      main: '#FFFFFF',
    },
    greyDefault: {
      main: '#788492',
    },
    red: {
      main: '#d32f2f',
    },
    danger: {
      main: '#FCEDED',
      contrastText: '#1B2B3E'
    },
    megaDanger: {
      main: '#DC3545',
      contrastText: '#FFFFFF'
    },
    yellow: {
      main: '#FFFF00'
    }
  },
  typography: {
    button: {
      textTransform: 'none'
    },
    h1: {
      fontWeight: 700,
      fontSize: 24,
      lineHeight: "150%",
      letterSpacing: "-0.01rem",
      color: "#1B2B3E",
      display: 'block',
      wordBreak: "break-word"
    },
    h1_32: {
      fontWeight: 700,
      fontSize: 32,
      lineHeight: "150%",
      letterSpacing: "-0.01rem",
      color: "#1B2B3E",
      display: 'block',
      textAlign:'left',
      wordBreak: "break-word"
    },
    h2:{
      fontStyle: "normal",
      fontWeight: 700,
      fontSize: 24,
      lineHeight: "137%",
      wordBreak: "break-word"
    },
    label: {
      fontWeight: 700,
      fontSize: 14,
      display: 'block',
      color: '#1B2B3E',
      wordBreak: "break-word"
    },
    support_icon:{
      fontSize: 12
    },
    p_large: {
      fontWeight: 400,
      fontSize: 16,
      lineHeight: "150%",
      color: "#596676",
      display: 'block',
      wordBreak: "break-word"
    },
    p_large_dark: {
      fontWeight: 400,
      fontSize: 16,
      lineHeight: "150%",
      color: "#1B2B3E",
      display: 'block',
      wordBreak: "break-word"
    },
    p_default: {
      fontWeight: 400,
      fontSize: 14,
      lineHeight: "150%",
      color: "#596676",
      display: 'block',
      wordBreak: "break-word"
    },
    p_default_bold: {
      fontWeight: 700,
      fontSize: 14,
      lineHeight: "150%",
      color: "#1B2B3E",
      display: 'block',
      textAlign:'left',
      wordBreak: "break-word"
    },
    p_small: {
      fontWeight: 400,
      fontSize: 12,
      lineHeight: "150%",
      color: "#596676",
      display: 'block',
      wordBreak: "break-word"
    },
  },
};

export default theme