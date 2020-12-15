module.exports = {
  locales: ['en', 'fr'],
  output: 'public/locales/$LOCALE/common.json',
  useKeysAsDefaultValue: true,
  keySeparator: '.',
  namespaceSeparator: false,
  lexers: {
    js: ['JsxLexer'],
    ts: ['JsxLexer'],
    jsx: ['JsxLexer'],
    tsx: ['JsxLexer'],

    default: ['JsxLexer'],
  },
}
