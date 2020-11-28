import { mode } from '@chakra-ui/theme-tools'

const parts = ['field', 'icon']

function baseStyleField(props: Record<string, any>) {
  return {
    appearance: 'none',
    paddingBottom: '1px',
    lineHeight: 'normal',
    borderWidth: 1,

    '> option': {
      bg: mode('white', 'gray.700')(props),
    },
  }
}

const baseStyleInput = {
  color: 'currentColor',
  fontSize: '1.25rem',
  _disabled: { opacity: 0.5 },
}

const baseStyle = (props: Record<string, any>) => ({
  field: baseStyleField(props),
  icon: baseStyleInput,
})

export default {
  parts,
  baseStyle,
  sizes: {},
  variants: {},
  defaultProps: {},
}
