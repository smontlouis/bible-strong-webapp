import { Quill } from 'react-quill'
import InlineTooltip from './InlineTooltip'

const Module = Quill.import('core/module')

class ModuleInlineVerse extends Module {
  constructor(quill, options) {
    super(quill, options)

    this.quill = quill
    this.tooltip = new InlineTooltip(this.quill, this.quill.container)
    this.range = null

    // this.quill.on(Quill.events.EDITOR_CHANGE, (type, range) => {
    //   if (type === Quill.events.SELECTION_CHANGE) {
    //     this.range = range
    //   }
    // })

    this.quill.on('selection-change', (range, oldRange, source) => {
      if (range === null && oldRange !== null) {
        console.log('on blur, save range', oldRange)
        this.range = oldRange
      } else {
        this.range = range
      }
    })
  }

  receiveVerseLink = ({ title, verses }) => {
    // this.quill.setSelection(this.range, Quill.sources.SILENT)

    // dispatchConsole(`Range: ${JSON.stringify(this.range)}`)

    if (this.range) {
      if (this.range.length) {
        this.quill.format('inline-strong', false) // Disable inline-strong in case
        this.quill.format('inline-verse', {
          title,
          verses,
        })
        this.quill.setSelection(
          this.range.index + this.range.length + 1,
          Quill.sources.SILENT
        )
      } else {
        this.quill.insertText(this.range.index, title, 'inline-verse', {
          title,
          verses,
        })
        this.quill.insertText(this.range.index, ' ', 'inline-verse', false)
      }
    }
  }

  receiveStrongLink = ({ title, codeStrong, book }) => {
    // this.quill.setSelection(this.range, Quill.sources.SILENT)

    // dispatchConsole(`Receive strong ${title}`)

    if (this.range) {
      console.log(this.range)
      if (this.range.length) {
        this.quill.format('inline-verse', false) // Disable inline-verse in case
        this.quill.format('inline-strong', {
          title,
          codeStrong,
          book,
        })
        this.quill.setSelection(
          this.range.index + this.range.length + 1,
          Quill.sources.SILENT
        )
      } else {
        this.quill.insertText(this.range.index, title, 'inline-strong', {
          title,
          codeStrong,
          book,
        })
        this.quill.insertText(this.range.index, ' ', 'inline-strong', false)
      }
    }
  }
}

Quill.register(
  {
    'modules/inline-verse': ModuleInlineVerse,
  },
  true
)
