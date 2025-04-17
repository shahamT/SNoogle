// Notes service


import { loadFromStorage, saveToStorage, makeId } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'
const NOTES_KEY = 'notesDB'
_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    getDefaultFilter,
    getFilterFromSearchParams,
}

// ~~~~~~~~~~~~~~~~FUNCTIONS~~~~~~~~~~~~~~~~~~~
// to do
function query(filterBy = {}) {
    return storageService.query(NOTES_KEY)
        // .then(() => console.log('query(filterBy) need you to update'))
    // .then(notes => {
    //   if (filterBy.search) {
    //     const regExp = new RegExp(filterBy.search, 'i')
    //     notes = notes.filter(note =>
    //       regExp.test(note.title)
    //       || regExp.test(note.subtitle)
    //       || regExp.test(note.authors)
    //       || regExp.test(note.description))
    //   }
    //   if (filterBy.category) {
    //     notes = notes.filter(note => note.categories.includes(filterBy.category))
    //   }
    //   return notes
    // })
}

function get(noteId) {
    return storageService.get(NOTES_KEY, noteId)
}

function remove(noteId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(NOTES_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTES_KEY, note)
    } else {
        return storageService.post(NOTES_KEY, note)
    }
}

// to do
function getFilterFromSearchParams(searchParams) {
    return console.log('getFilterFromSearchParams() need you to update')
    //   const txt = searchParams.get('txt') || ''
    //   const minSpeed = searchParams.get('minSpeed') || ''
    //   return {
    //     txt,
    //     minSpeed
    //   }
}



function getDefaultFilter(filterBy = { isPinned: true, info: '', type: null, createdAt: null }) {
    return { isPinned: filterBy.isPinned, info: filterBy.info, type: filterBy.type, createdAt: filterBy.createdAt }
    
}



function getEmptyNote(type = 'NoteTxt') {
    const base = {
        id: '',
        createdAt: Date.now(),
        type,
        isPinned: false,
        style: { backgroundColor: '#ffffff' },
        info: {}
    }
    
    switch (type) {
        case 'NoteTxt':
            base.info = { title:''
                 ,txt: '' }
            break

        case 'NoteImg':
            base.info = {
                url: '',
                title: ''
            }
            break

        case 'NoteTodos':
            base.info = {
                title: '',
                todos: [
                    { txt: '', doneAt: null }
                ]
            }
            break

            default:
            throw new Error(`Unknown note type: ${type}`)
        }

    return base
}





// ~~~~~~~~~~~~~~~~LOCAL FUNCTIONS~~~~~~~~~~~~~~~~~~~

function _createNotes() {
    if (!loadFromStorage(NOTES_KEY) || loadFromStorage(NOTES_KEY).lentgh === 0) {
        const notes = _createDemoNotes()
       saveToStorage(NOTES_KEY, notes)
    }
}


function _createDemoNotes() {
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
                    { txt: 'Coding power', doneAt: 187111111 }
                ]
            }
        }
    ]
}



// function _setNextPrevnoteId(note) {
//     return query().then((Notes) => {
//         const NoteIdx = Notes.findIndex((currNote) => currNote.id === note.id)
//         const nextNote = Notes[NoteIdx + 1] ? Notes[NoteIdx + 1] : Notes[0]
//         const prevNote = Notes[NoteIdx - 1] ? Notes[NoteIdx - 1] : Notes[Notes.length - 1]
//         Note.nextNoteId = nextNote.id
//         Note.prevNoteId = prevNote.id
//         return Note
//     })
// }
