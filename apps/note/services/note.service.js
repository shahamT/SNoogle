// Notes service

import { loadFromStorage,saveToStorage,makeId } from '../../../services/util.service.js';
import { storageService } from '../../../services/async-storage.service.js'
const NOTES_KEY ='notesDB'


export const booksService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter,
    saveReview,
    removeReview,
    getGoogleBooks,
    addGoogleBook,
    getEmptyReview
}

function query(filterBy = {}) {
    return storageService.query(NOTES_KEY)
    .then(()=>console.log(notes))



        // .then(books => {
        //     // console.log('books:', books)

        //     if (filterBy.title) {
        //         const regExp = new RegExp(filterBy.title, 'i')
        //         books = books.filter(book => regExp.test(book.title))
        //     }
        //     if (filterBy.minPrice) {
        //         books = books.filter(book => book.listPrice.amount >= filterBy.minPrice)
        //     }
        //     return books
        // })
}

function get(noteId) {
    return storageService.get(NOTES_KEY, noteId)
        // .then(note => _setNextPrevBookId(note))
}










// private functions
function _createNotes() {
    const now = Date.now()                  
    return [
      {
        id: makeId(4),
        createdAt: now,
        type: 'NoteTxt',
        isPinned: true,
        style: { backgroundColor: '#00d' },
        info: { txt: 'Fullstack Me Baby!' }
      },
      {
        id: makeId(4),
        createdAt: now + 1,
        type: 'NoteImg',
        isPinned: false,
        style: { backgroundColor: '#00d' },
        info: {
          url: 'https://source.unsplash.com/random/600x400',
          title: 'Bobi and Me'
        }
      },
      {
        id: makeId(4),
        createdAt: now + 2,
        type: 'NoteTodos',
        isPinned: false,
        info: {
          title: 'Get my stuff together',
          todos: [
            { txt: 'Driving license', doneAt: null },
            { txt: 'Coding power',   doneAt: 187111111 }
          ]
        }
      }
    ]
  }
  


