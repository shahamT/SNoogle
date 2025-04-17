import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'itemDB'

_createItems()

export const itemService = {
  query,
  get,
  remove,
  save,
  getEmptyItem,
  getDefaultFilter,
  getDefaultFilter,
  getFilterFromSearchParams,
}


function query(filterBy = {}) {
  return storageService.query(BOOK_KEY)
    .then(items => {
      if (filterBy.search) {
        const regExp = new RegExp(filterBy.search, 'i')
        items = items.filter(item =>
          regExp.test(item.title)
          || regExp.test(item.subtitle)
          || regExp.test(item.authors)
          || regExp.test(item.description))
      }
      if (filterBy.category) {
        items = items.filter(item => item.categories.includes(filterBy.category))
      }
      return items
    })
}

function get(itemId) {
  return storageService.get(BOOK_KEY, itemId)
}

function remove(itemId) {
  // return Promise.reject('Oh No!')
  return storageService.remove(BOOK_KEY, itemId)
}

function save(item) {
  if (item.id) {
    return storageService.put(BOOK_KEY, item)
  } else {
    return storageService.post(BOOK_KEY, item)
  }
}

function getEmptyItem() {
  return {
    "title": "",
    "subtitle": "",
    "authors": [],
    "publishedDate": 1900,
    "description": "",
    "pageCount": 0,
    "categories": [],
    "thumbnail": "img/ItemsImages/20.jpg",
    "language": "",
    "listPrice": {
      "amount": 0,
      "currencyCode": "EUR",
      "isOnSale": false
    }
  }
}


function getFilterFromSearchParams(searchParams) {
  const txt = searchParams.get('txt') || ''
  const minSpeed = searchParams.get('minSpeed') || ''
  return {
    txt,
    minSpeed
  }
}


function _setNextPrevitemId(Item) {
  return query().then((Items) => {
    const ItemIdx = Items.findIndex((currItem) => currItem.id === Item.id)
    const nextItem = Items[ItemIdx + 1] ? Items[ItemIdx + 1] : Items[0]
    const prevItem = Items[ItemIdx - 1] ? Items[ItemIdx - 1] : Items[Items.length - 1]
    Item.nextItemId = nextItem.id
    Item.prevItemId = prevItem.id
    return Item
  })
}

function getDefaultFilter() {
  return { search: '', category: '' }
}

function _createItems() {
  if (!utilService.loadFromStorage(BOOK_KEY) || utilService.loadFromStorage(BOOK_KEY).lentgh === 0) {
    const items = _createDemoItems()
    utilService.saveToStorage(BOOK_KEY, items)
  }
}

function _createDemoItems() {
  const items = [
    {

    },
  ]

  return items
} 
