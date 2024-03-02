import router from '@/router'

function pageTo(name) {
  return function() {
    router.push({
      name: name
    })
  }
}

const toHome = pageTo('home')
const toDocu = pageTo('docu')
const toEdit = pageTo('edit')
const toIntr = pageTo('intr')

export default {
  pageTo,
  toHome,
  toDocu,
  toEdit,
  toIntr
}
