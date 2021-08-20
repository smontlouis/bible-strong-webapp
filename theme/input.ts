export default {
  parts: ['input', 'addon'],
  baseStyle: {
    field: {
      _focus: {
        borderRadius: 'full',
      },
    },
  },
  sizes: {
    md: {
      field: {
        fontSize: '16px',
        height: '47px',
      },
    },
    lg: {
      field: {
        fontSize: '18px',
        height: '55px',
      },
    },
  },
  variants: {
    normal: {
      field: {
        minWidth: 260,
        bg: 'lightGrey',
        width: '100%',
        borderRadius: 'full',
        px: 'l',
        placeholderColor: 'rgba(0,0,0,0.7)',
        fontFamily: 'normal',

        _hover: {
          borderColor: 'gray.300',
        },
        _readOnly: {
          boxShadow: 'none !important',
          userSelect: 'all',
        },
        _disabled: {
          opacity: 0.4,
          cursor: 'not-allowed',
        },
        _focus: {
          zIndex: 1,
          borderColor: 'blue.500',
          boxShadow: `0 0 0 1px #3182ce}`,
        },
        _invalid: {
          borderColor: 'red.500',
          boxShadow: `0 0 0 1px #E53E3E`,
        },
      },
    },
    grey: {
      field: {
        minWidth: 260,
        bg: 'grey_01',
        width: '100%',
        borderRadius: 'full',
        px: 'l',
        placeholderColor: 'rgba(0,0,0,0.7)',
        fontFamily: 'normal',
        backgroundColor: 'grey_01',

        _hover: {
          borderColor: 'gray.300',
        },
        _readOnly: {
          boxShadow: 'none !important',
          userSelect: 'all',
        },
        _disabled: {
          opacity: 0.4,
          cursor: 'not-allowed',
        },
        _focus: {
          zIndex: 1,
          borderColor: 'blue.500',
          boxShadow: `0 0 0 1px #3182ce}`,
        },
        _invalid: {
          borderColor: 'red.500',
          boxShadow: `0 0 0 1px #E53E3E`,
        },
      },
    },
  },
  defaultProps: {
    size: 'md',
    variant: 'normal',
  },
}
