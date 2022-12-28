
const Theme = {
  components: {
    MuiButton: {
      variants: [
        {
          props: { size: 'square' },
          style: {
            maxWidth: '32px', 
            maxHeight: '32px', 
            minWidth: '32px', 
            minHeight: '32px'
          },
        },
      ],
    }
  },
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
    h2:{
      fontFamily: 'Roboto',
      fontStyle: "normal",
      fontWeight: 700,
      fontSize: 24,
      lineHeight: "137%",
    },
    label: {
      fontWeight: 700,
      fontSize: 14,
      display: 'block',
      color: '#1B2B3E',
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
    },
    p_large_dark: {
      fontWeight: 400,
      fontSize: 16,
      lineHeight: "150%",
      color: "#1B2B3E",
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