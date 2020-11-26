export default {
  baseStyle: {
    borderRadius: 'xl',
    justifyContent: 'center',
    textTransform: 'initial',
    display: 'flex',
    px: 'm',
  },
  sizes: {
    icon: {
      minWidth: 0,
      height: '40px',
      width: '40px',
    },
    xxs: {
      fontSize: '13px',
      height: '30px',
      minWidth: 110,
    },
    xs: {
      fontSize: '14px',
      height: '35px',
      minWidth: 110,
    },
    s: {
      fontSize: '15px',
      height: '45px',
      minWidth: 150,
    },
    m: {
      fontSize: '18px',
      height: '54px',
      minWidth: 200,
    },
    l: {
      fontSize: '25px',
      height: '69px',
      minWidth: 200,
    },
  },
  variants: {
    primary: {
      bg: 'primary',
      color: 'white',
    },
    secondary: {
      bg: 'secondary',
      color: 'white',
    },
    success: {
      bg: 'success',
      color: 'white',
    },
    white: {
      bg: 'white',
      color: 'black',
      border: '1px solid #70707033',
    },
    black: {
      bg: 'black',
      color: 'white',
    },
    grey: {
      bg: '#EAEAEA',
      color: '#909090',
    },
    naked: {
      bg: 'transparent',
      color: '#909090',
    },
  },
  defaultProps: {
    size: 'm',
    variant: 'primary',
  },
}
