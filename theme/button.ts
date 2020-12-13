export default {
  baseStyle: {
    borderRadius: 'full',
    justifyContent: 'center',
    textTransform: 'initial',
    display: 'flex',
    px: 'm',
  },
  sizes: {
    xxs: {
      fontSize: '17px',
      height: '28px',
      minWidth: '28px',
    },
    xs: {
      fontSize: '14px',
      height: '35px',
    },
    s: {
      fontSize: '15px',
      height: '45px',
    },
    m: {
      fontSize: '18px',
      height: '54px',
    },
    l: {
      fontSize: '25px',
      height: '69px',
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
      color: 'grey',

      _hover: {
        bg: 'grey',
        color: 'white',
      },
    },
    icon: {
      borderRadius: 'full',
      _hover: {
        bg: 'primary',
        color: 'white',
      },
      _focus: {
        bg: 'primary',
        color: 'white',
      },
    },
  },
  defaultProps: {
    size: 'm',
    variant: 'primary',
  },
}
