import { Quill } from 'react-quill'

const Module = Quill.import('core/module')

class ModuleBlockVerse extends Module {
  constructor(quill, options) {
    super(quill, options)
    this.quill = quill
  }

  openVerseBlock = () => {
    console.log('SELECT_BIBLE_VERSE_BLOCK')
  }

  receiveVerseBlock = (data) => {
    console.log(`VERSE RECEIVED: ${JSON.stringify(data)}`)

    const { title, content, version, verses } = data

    const range = this.quill.selection.savedRange
    if (!range || range.length != 0) return
    const cursorPosition = range.index

    this.quill.insertEmbed(
      cursorPosition,
      'block-verse',
      { title, content, version, verses },
      Quill.sources.API
    )
    this.quill.insertText(cursorPosition + 1, ' ', Quill.sources.API)
    this.quill.setSelection(cursorPosition + 2, Quill.sources.API)
  }

  openStrongBlock = (value) => {
    console.log('SELECT_BIBLE_STRONG_BLOCK')
  }

  receiveStrongBlock = (data) => {
    console.log(`STRONG RECEIVED: ${JSON.stringify(data)}`)

    const {
      title,
      codeStrong,
      strongType,
      phonetique,
      definition,
      translatedBy,
      book,
      original,
    } = data

    const range = this.quill.selection.savedRange
    if (!range || range.length != 0) return
    const cursorPosition = range.index

    this.quill.insertEmbed(
      cursorPosition,
      'block-strong',
      { title, codeStrong, phonetique, book, original },
      Quill.sources.API
    )
    this.quill.insertText(cursorPosition + 1, ' ', Quill.sources.API)
    this.quill.setSelection(cursorPosition + 2, Quill.sources.API)
  }
}

Quill.register(
  {
    'modules/block-verse': ModuleBlockVerse,
  },
  true
)
