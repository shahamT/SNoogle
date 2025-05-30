export function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

export function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

export function makeId(length = 5) {
    let txt = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

export function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export function getTimeStamp() {
    return Date.now()
}

export function randomPastTime() {
    const HOUR = 1000 * 60 * 60
    const DAY = 1000 * 60 * 60 * 24
    const WEEK = 1000 * 60 * 60 * 24 * 7

    const pastTime = getRandomIntInclusive(HOUR, WEEK)
    return Date.now() - pastTime
}

export function getRandomInRange(from = -180, to = 180, fixed = 3) {
    return +(Math.random() * (to - from) + from).toFixed(fixed)
}

// export function elapsedTime(pastMs) {
//     const now = new Date()
//     const secondsPast = Math.round((now - pastMs) / 1000)

//     if (secondsPast < 60 * 5) return 'just now'

//     const minutesPast = Math.floor(secondsPast / 60)
//     if (minutesPast < 60) return 'last hour'

//     const hoursPast = Math.floor(minutesPast / 60)
//     if (hoursPast < 24) return 'today'

//     return `${Math.floor(hoursPast / 24)} days ago`
// }

export function updateQueryParams(queryParamsObj) {
    const queryParams = new URLSearchParams()
    for (const key in queryParamsObj) {
        if (queryParamsObj[key] !== undefined) {
            queryParams.set(key, queryParamsObj[key])
        }
    }
    const newUrl = `${window.location.origin}${window.location.pathname}?${queryParams.toString()}`
    window.history.pushState({ path: newUrl }, '', newUrl)
}

export function makeLorem(size = 100) {
    const words = [
        'The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All',
        'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and',
        'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was',
        'a pleasure', 'to', 'burn'
    ]
    let txt = ''
    while (size-- > 0) {
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

// export function copyToClipboard(text) {
//     navigator.clipboard?.writeText(text)
// }


export function animateCSS(el, animation = 'bounce', options = {}) {
    const prefix = 'animate__'
    const { isRemoveAnimation = true, delay = 0 } = options

    return new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`

        el.style.setProperty('animationDelay', `${delay}s`)
        el.classList.remove('hidden-before-anim') // ⬅️ Reveal the element just before animating
        el.classList.add(`${prefix}animated`, animationName)

        function handleAnimationEnd(event) {
            event.stopPropagation()
            if (isRemoveAnimation) {
                el.classList.remove(`${prefix}animated`, animationName)
                el.style.removeProperty('animationDelay')
            }
            resolve('Animation ended')
        }

        el.addEventListener('animationend', handleAnimationEnd, { once: true })
    })
}


export function getTruthyValues(obj) {
    const newObj = {}
    for (const key in obj) {
        const value = obj[key]
        if (value) {
            newObj[key] = value
        }
    }
    return newObj
}


export function debounce(func, delay = 300) {
    let timeoutId
    return (...args) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            func(...args)
        }, delay)
    }
}

export function getRandomColor() {
    const letters = '0123456789ABCDEF'
    var color = '#'
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

export function getDayName(date, locale) {
    date = new Date(date)
    return date.toLocaleDateString(locale, { weekday: 'long' })
}


export function getMonthName(date) {
    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return monthNames[date.getMonth()];
}

export function padNum(n) {
    return String(n).padStart(2, '0');
}

export function elapsedTime(pastMs) {
    const past = new Date(pastMs);
    const now = new Date();
    const diffSeconds = Math.round((now - past) / 1000);

    // less than 5 minutes ago
    if (diffSeconds < 60 * 5) {
        return `just now at ${padNum(past.getHours())}:${padNum(past.getMinutes())}`;
    }

    // same calendar day
    if (now.toDateString() === past.toDateString()) {
        return `${padNum(past.getHours())}:${padNum(past.getMinutes())} (today)`;
    }

    // same month of the same year
    if (
        now.getFullYear() === past.getFullYear() &&
        now.getMonth() === past.getMonth()
    ) {
        return `${padNum(past.getDate())} ${getMonthName(past)}`;
    }

    // earlier than this month
    return `${padNum(past.getDate())}/${padNum(past.getMonth() + 1)}/${past.getFullYear()}`;
}