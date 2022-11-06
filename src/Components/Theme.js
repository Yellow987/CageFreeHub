
const Theme = {
  palette: {
    primary: {
      light: '#EFFAF9',
      main: '#3FAB94',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FFFFFF',
    },
    grey: {
      main: '#788492',
    },
    danger: {
      main: '#FCEDED',
      contrastText: '#1B2B3E'
    },
    megaDanger: {
      main: '#DC3545',
      contrastText: '#FFFFFF'
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
    },
    h1_32: {
      fontWeight: 700,
      fontSize: 32,
      lineHeight: "150%",
      letterSpacing: "-0.01rem",
      color: "#1B2B3E",
      display: 'block',
      textAlign:'left'
    },
    label: {
      fontWeight: 700,
      fontSize: 14,
      color: '#1B2B3E',
    },
    p_large: {
      fontWeight: 400,
      fontSize: 16,
      lineHeight: "150%",
      color: "#596676",
      display: 'block',
    },
    p_default: {
      fontWeight: 400,
      fontSize: 14,
      lineHeight: "150%",
      color: "#596676",
      display: 'block',
    },
    p_default_bold: {
      fontWeight: 700,
      fontSize: 14,
      lineHeight: "150%",
      color: "#1B2B3E",
      display: 'block',
      textAlign:'left'
    },
    
    p_small: {
      fontWeight: 400,
      fontSize: 12,
      lineHeight: "150%",
      color: "#596676",
      display: 'block',
    },
  },
};

export default Theme