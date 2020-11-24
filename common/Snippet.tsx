import { Box, Text, TextProps } from '@chakra-ui/react'
import { connectHighlight } from 'react-instantsearch-dom'
import { HighlightProps } from 'react-instantsearch-core'
import React from 'react'

const Snippet = ({
  highlight,
  attribute,
  hit,
  variant,
  prefix,
  ...props
}: TextProps & HighlightProps & { prefix?: string }) => {
  const parsedHit = highlight({
    highlightProperty: '_snippetResult',
    attribute,
    hit,
  })

  if (!parsedHit.some((f) => f.isHighlighted)) {
    return null
  }

  return (
    <Box {...props}>
      {parsedHit && (
        <Text as="span" {...props}>
          {prefix}
        </Text>
      )}
      {parsedHit.map((part, index) =>
        part.isHighlighted ? (
          <Text variant="bold" as="span" key={index} {...props}>
            {part.value}
          </Text>
        ) : (
          <Text color="black_050" as="span" key={index} {...props}>
            {part.value}
          </Text>
        )
      )}
    </Box>
  )
}

export default connectHighlight(Snippet)
