import { Delta } from '../common/types'

export default (delta: Delta['ops']) =>
  delta.reduce((text, op) => {
    if (!op.insert) {
      return `${text} `
    }
    if (typeof op.insert !== 'string') {
      return `${text} `
    }
    return text + op.insert
  }, '')
