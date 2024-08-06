const parts = ['item', 'command', 'list', 'button', 'groupTitle', 'divider']

function baseStyleList(props: Record<string, any>) {
    return {
        bg: 'white',
        boxShadow: '0 13px 15px -9px rgba(89, 131, 240, 0.3)',
        color: 'inherit',
        minW: '3xs',
        p: 's',
        zIndex: 1,
        borderRadius: 'l',
        borderWidth: 0,
    }
}

function baseStyleItem(props: Record<string, any>) {
    return {
        py: '0.4rem',
        px: '0.8rem',
        transition: 'background 50ms ease-in 0s',
        fontFamily: 'normal',
        fontSize: 16,
        _focus: {
            color: 'primary',
            bg: 'white',
        },
        _active: {
            color: 'primary',
            bg: 'white',
        },
        _hover: {
            color: 'primary',
            bg: 'white',
        },
        _expanded: {},
        _disabled: {
            opacity: 0.4,
            cursor: 'not-allowed',
        },
    }
}

const baseStyleGroupTitle = {
    mx: 4,
    my: 2,
    fontWeight: 'semibold',
    fontSize: 'sm',
}

const baseStyleCommand = {
    opacity: 0.6,
}

const baseStyleDivider = {
    border: 0,
    borderBottom: '1px solid',
    borderColor: 'inherit',
    my: '0.5rem',
    opacity: 0.6,
}

const baseStyle = (props: Record<string, any>) => {
    return {
        list: baseStyleList(props),
        item: baseStyleItem(props),
        groupTitle: baseStyleGroupTitle,
        command: baseStyleCommand,
        divider: baseStyleDivider,
    }
}

export default {
    parts,
    baseStyle,
}