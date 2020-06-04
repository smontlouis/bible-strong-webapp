import { GetStaticProps, GetStaticPaths } from 'next'
import { QuillDeltaToHtmlConverter } from '../../lib/quill-to-html/main'

import firebase from '../../lib/firebase'

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const idParam = params.id as string

  const snapshot = await firebase
    .firestore()
    .collection('studies')
    .doc(idParam)
    .get()

  const result = snapshot.data()

  const converter = new QuillDeltaToHtmlConverter(result.content.ops, {
    customTag: (format, op) => {
      console.log(format)
      if (format === 'inline-verse') {
        return 'COUCOU'
      }
    },
    customTagAttributes: (op) => {
      console.log(op)
      if (op.attributes['inline-verse']) {
        return {
          inlineV: op.attributes['inline-verse'],
        }
      }
    },
  })

  converter.renderCustomWith((customOp, contextOp) => {
    if (customOp.insert.type === 'my-blot') {
      let val = customOp.insert.value
      return `<span id="${val.id}">${val.text}</span>`
    } else {
      return 'Unmanaged custom blot!'
    }
  })

  const html = converter.convert()

  return {
    props: {
      ...result,
      html,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const snapshot = await firebase
    .firestore()
    .collection('studies')
    .where('published', '==', true)
    .get()

  const paths = snapshot.docs
    .map((x) => x.data())
    .map((doc) => ({ params: { id: doc.id } }))

  return {
    paths,
    fallback: false,
  }
}

const Study = (props) => {
  // console.log(props)
  return <div dangerouslySetInnerHTML={{ __html: props.html }} />
}

export default Study
