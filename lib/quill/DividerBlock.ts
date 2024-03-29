import { Quill } from 'react-quill'

const BlockEmbed = Quill.import('blots/block/embed')

class DividerBlock extends BlockEmbed {
  static blotName = 'divider'

  static tagName = 'hr'
}

Quill.register(DividerBlock)
