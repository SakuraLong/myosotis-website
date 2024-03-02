import Document from '@/Document'
import dataList from '@/Document/doucList'

const documents = []

dataList.data.forEach((data) => {
  documents.push({
    path: data.name !== undefined ? data.name : data.path,
    name: data.name,
    meta: {
      docu: data.name
    },
    component: Document
  })
})

export default {
  documents
}
