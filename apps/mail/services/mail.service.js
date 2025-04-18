// mail service

import { storageService } from "../../../services/async-storage.service.js"
import { loadFromStorage, saveToStorage } from "../../../services/util.service.js"



const MAIL_DB_KEY = 'mailDB'

const loggedinUser = {
    email: 'user@snoogle.com',
    fullname: 'Shaham Tamir'
}


// const mail = {
//     id: 'e101',
//     createdAt: 1551133930500,
//     subject: 'Miss you!',
//     body: 'Would love to catch up sometimes',
//     isRead: false,
//     sentAt: 1551133930594,
//     removedAt: null,
//     from: 'momo@momo.com',
//     to: 'user@appsus.com',
//     labels: [],
// }


_createmails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail: getEmptyMail,
    getDefaultFilter,
    getFilterFromSearchParams,
}


function query(filterBy = {}) {
    return storageService.query(MAIL_DB_KEY)
        .then(mails => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.search, 'i')
                mails = mails.filter(mail =>
                    regExp.test(mail.subject)
                    || regExp.test(mail.body)
                    || regExp.test(mail.from)
                    || regExp.test(mail.fromName))
            }
            // if (filterBy.category) {
            //     mails = mails.filter(mail => mail.categories.includes(filterBy.category))
            // }
            return mails
        })
}

function get(mailId) {
    return storageService.get(MAIL_DB_KEY, mailId)
}

function remove(mailId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(MAIL_DB_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_DB_KEY, mail)
    } else {
        return storageService.post(MAIL_DB_KEY, mail)
    }
}

function getEmptyMail() {
    return {
        id: '',
        createdAt: Date.now(),
        subject: '',
        body: '',
        isRead: false,
        sentAt: null,
        removedAt: null,
        from: `${loggedinUser.email}`,
        fromName: `${loggedinUser.fullname}`,
        to: '',
        labels: [],
    }
}


function getFilterFromSearchParams(searchParams) {
    const txt = searchParams.get('txt') || ''
    const state = searchParams.get('state') || ''
    const lables = searchParams.get('lables') || ''
    
    return {
        txt,
        state,
        lables
    }
}


// function _setNextPrevmailId(mail) {
//     return query().then((mails) => {
//         const mailIdx = mails.findIndex((currmail) => currmail.id === mail.id)
//         const nextmail = mails[mailIdx + 1] ? mails[mailIdx + 1] : mails[0]
//         const prevmail = mails[mailIdx - 1] ? mails[mailIdx - 1] : mails[mails.length - 1]
//         mail.nextmailId = nextmail.id
//         mail.prevmailId = prevmail.id
//         return mail
//     })
// }

function getDefaultFilter() {
    return { txt: '', category: '' }
}

function _createmails() {
    if (!loadFromStorage(MAIL_DB_KEY) || loadFromStorage(MAIL_DB_KEY).lentgh === 0) {
        const mails = _createDemoMails()
        saveToStorage(MAIL_DB_KEY, mails)
    }
}

function _createDemoMails() {
    const mails = [
        {
            "id": "be8351e2-3046-4f0d-8c0f-abfbccccac06",
            "createdAt": 1744322707000,
            "subject": "Subscription Renewal Reminder",
            "body": "Welcome to Snoogle!\n\nThank you for creating an account with us. We\u2019re thrilled to have you. To get started, verify your email address and explore our features.\n\nHappy exploring,\nThe Snoogle Team",
            "isRead": false,
            "sentAt": 1744323015208,
            "removedAt": null,
            "from": "alerts2@updates.com",
            "to": "user@snoogle.com",
            "labels": [],
            "isStarred": false
        },
        {
            "id": "60ae6751-6763-476c-9a40-fd9118ba711a",
            "createdAt": 1744654589000,
            "subject": "Scheduled System Maintenance",
            "body": "Dear valued customer,\n\nWe're excited to announce the launch of our new product line! For a limited time, enjoy 20% off your first purchase. Visit our website to explore all the great features and offers.\n\nThank you for being a loyal customer.\n\nSincerely,\nThe Team",
            "isRead": false,
            "sentAt": 1744654949870,
            "removedAt": null,
            "from": "alerts3@updates.com",
            "to": "user@snoogle.com",
            "labels": [],
            "isStarred": true
        },
        {
            "id": "18627cab-b7fd-4667-9352-899eb9f551c7",
            "createdAt": 1744561428000,
            "subject": "Welcome to Snoogle",
            "body": "Reminder:\n\nYour subscription will renew on May 15, 2025. If you wish to make any changes, please visit your account settings or contact support.\n\nThank you,\nCustomer Success",
            "isRead": true,
            "sentAt": 1744561701709,
            "removedAt": null,
            "from": "alerts3@updates.com",
            "to": "user@snoogle.com",
            "labels": [],
            "isStarred": false
        },
        {
            "id": "8a8ab9a4-8f71-48db-aa7f-f561e05d9dd7",
            "createdAt": 1744296025000,
            "subject": "Your Verification Code",
            "body": "Hi Team,\n\nHere\u2019s the weekly update on the project status:\n- Feature A: Completed\n- Feature B: In progress (50%)\n- Bug fixes: 3 resolved\n\nKeep up the great work!\n\nCheers,\nProject Manager",
            "isRead": true,
            "sentAt": 1744296491692,
            "removedAt": null,
            "from": "alerts8@updates.com",
            "to": "user@snoogle.com",
            "labels": [],
            "isStarred": false
        },
        {
            "id": "c202a885-2970-4bf0-b7b7-f236bf868362",
            "createdAt": 1744726286000,
            "subject": "VIP Program Invitation",
            "body": "Hi Team,\n\nHere\u2019s the weekly update on the project status:\n- Feature A: Completed\n- Feature B: In progress (50%)\n- Bug fixes: 3 resolved\n\nKeep up the great work!\n\nCheers,\nProject Manager",
            "isRead": false,
            "sentAt": 1744726458953,
            "removedAt": null,
            "from": "alerts12@updates.com",
            "to": "user@snoogle.com",
            "labels": [],
            "isStarred": true
        },
        {
            "id": "d9f6691d-4f1a-4253-8204-0e7bd2557091",
            "createdAt": 1692605131000,
            "subject": "Subscription Renewal Reminder",
            "body": "Security Alert:\n\nYour verification code is 482913. Please use this code to complete your sign-in process. If you did not request this code, please reset your password immediately.\n\nThanks,\nSecurity Team",
            "isRead": false,
            "sentAt": 1692605445081,
            "removedAt": null,
            "from": "newsletter3@news.com",
            "to": "user@snoogle.com",
            "labels": [],
            "isStarred": true
        },
        {
            "id": "99bf4d59-bf81-4534-801d-07b82370ee7b",
            "createdAt": 1722567689000,
            "subject": "Invoice #45321 Attached",
            "body": "Notice:\n\nWe will be performing system maintenance on April 20, 2025, from 02:00 AM to 04:00 AM UTC. During this time, services may be unavailable.\n\nThank you for your understanding,\nOperations Team",
            "isRead": true,
            "sentAt": 1722568141911,
            "removedAt": null,
            "from": "newsletter6@news.com",
            "to": "user@snoogle.com",
            "labels": [],
            "isStarred": false
        },
        {
            "id": "f1f1c56e-998f-4dea-8900-a998b72a44c3",
            "createdAt": 1712711357000,
            "subject": "Weekly Project Update",
            "body": "Notice:\n\nWe will be performing system maintenance on April 20, 2025, from 02:00 AM to 04:00 AM UTC. During this time, services may be unavailable.\n\nThank you for your understanding,\nOperations Team",
            "isRead": true,
            "sentAt": 1712711675943,
            "removedAt": null,
            "from": "newsletter11@news.com",
            "to": "user@snoogle.com",
            "labels": [],
            "isStarred": false
        },
        {
            "id": "87da35e9-a402-4a64-9bc8-243499182527",
            "createdAt": 1738252434000,
            "subject": "Checking in",
            "body": "Security Alert:\n\nYour verification code is 482913. Please use this code to complete your sign-in process. If you did not request this code, please reset your password immediately.\n\nThanks,\nSecurity Team",
            "isRead": true,
            "sentAt": 1738252956817,
            "removedAt": null,
            "from": "newsletter11@news.com",
            "to": "user@snoogle.com",
            "labels": [],
            "isStarred": false
        },
        {
            "id": "058feb55-d943-4f0f-8b4f-0b112331ca00",
            "createdAt": 1708611313000,
            "subject": "Special Offer Just for You",
            "body": "Security Alert:\n\nYour verification code is 482913. Please use this code to complete your sign-in process. If you did not request this code, please reset your password immediately.\n\nThanks,\nSecurity Team",
            "isRead": false,
            "sentAt": 1708611573373,
            "removedAt": null,
            "from": "newsletter7@news.com",
            "to": "user@snoogle.com",
            "labels": [],
            "isStarred": false
        },
        {
            "id": "65cf0095-a05e-4aae-8299-ceb74839e852",
            "createdAt": 1725675344000,
            "subject": "VIP Program Invitation",
            "body": "Hello,\n\nThank you for your feedback on our latest update. We appreciate your insights and will work to improve based on your suggestions.\n\nBest regards,\nSupport Team",
            "isRead": true,
            "sentAt": 1725675725740,
            "removedAt": null,
            "from": "newsletter9@news.com",
            "to": "user@snoogle.com",
            "labels": [],
            "isStarred": true
        },
        {
            "id": "c35c5e92-db9e-474d-a9ed-1416df990bd6",
            "createdAt": 1691060032000,
            "subject": "Scheduled System Maintenance",
            "body": "Notice:\n\nWe will be performing system maintenance on April 20, 2025, from 02:00 AM to 04:00 AM UTC. During this time, services may be unavailable.\n\nThank you for your understanding,\nOperations Team",
            "isRead": false,
            "sentAt": 1691060281303,
            "removedAt": null,
            "from": "newsletter19@news.com",
            "to": "user@snoogle.com",
            "labels": [],
            "isStarred": false
        },
        {
            "id": "b47ce811-fd61-4810-bc67-538fe0bacc0e",
            "createdAt": 1710441307000,
            "subject": "Welcome to Snoogle",
            "body": "Congratulations!\n\nYou've been selected for our VIP program. Enjoy exclusive benefits, early access to new features, and more. Click here to activate your membership.\n\nWelcome aboard,\nMarketing Team",
            "isRead": false,
            "sentAt": 1710441897717,
            "removedAt": null,
            "from": "newsletter8@news.com",
            "to": "user@snoogle.com",
            "labels": [],
            "isStarred": false
        },
        {
            "id": "1a024052-dc01-4a87-97cf-4bd889d6cd60",
            "createdAt": 1690972886000,
            "subject": "Thank You for Your Feedback",
            "body": "Dear valued customer,\n\nWe're excited to announce the launch of our new product line! For a limited time, enjoy 20% off your first purchase. Visit our website to explore all the great features and offers.\n\nThank you for being a loyal customer.\n\nSincerely,\nThe Team",
            "isRead": true,
            "sentAt": 1690973273138,
            "removedAt": null,
            "from": "newsletter4@news.com",
            "to": "user@snoogle.com",
            "labels": [],
            "isStarred": false
        },
        {
            "id": "98c24527-7ba8-4d28-8e05-bca07698ce3a",
            "createdAt": 1691946607000,
            "subject": "Invoice #45321 Attached",
            "body": "Congratulations!\n\nYou've been selected for our VIP program. Enjoy exclusive benefits, early access to new features, and more. Click here to activate your membership.\n\nWelcome aboard,\nMarketing Team",
            "isRead": true,
            "sentAt": 1691947055962,
            "removedAt": null,
            "from": "newsletter13@news.com",
            "to": "user@snoogle.com",
            "labels": [],
            "isStarred": false
        },
        {
            "id": "250dedfa-a28b-4b89-bbba-ed16dd822802",
            "createdAt": 1707299636000,
            "subject": "Thank You for Your Feedback",
            "body": "Notice:\n\nWe will be performing system maintenance on April 20, 2025, from 02:00 AM to 04:00 AM UTC. During this time, services may be unavailable.\n\nThank you for your understanding,\nOperations Team",
            "isRead": false,
            "sentAt": 1707300068417,
            "removedAt": 1707354167330,
            "from": "newsletter18@news.com",
            "to": "user@snoogle.com",
            "labels": [],
            "isStarred": false
        },
        {
            "id": "2ea7e964-3c29-4da4-be53-18ae9e3bb15a",
            "createdAt": 1739455547000,
            "subject": "Special Offer Just for You",
            "body": "Notice:\n\nWe will be performing system maintenance on April 20, 2025, from 02:00 AM to 04:00 AM UTC. During this time, services may be unavailable.\n\nThank you for your understanding,\nOperations Team",
            "isRead": false,
            "sentAt": 1739455673019,
            "removedAt": null,
            "from": "newsletter11@news.com",
            "to": "user@snoogle.com",
            "labels": [],
            "isStarred": false
        },
        {
            "id": "ab7c573e-2c04-470a-b274-35c4a4ba4053",
            "createdAt": 1689175739000,
            "subject": "VIP Program Invitation",
            "body": "Hello,\n\nYour invoice for March 2025 is now available. Please find the details below and let us know if you have any questions.\n\nInvoice Number: 45321\nTotal Due: $1,250.00\nDue Date: May 1, 2025\n\nThank you for your business.\n\nRegards,\nAccounting Department",
            "isRead": false,
            "sentAt": 1689176012878,
            "removedAt": null,
            "from": "newsletter1@news.com",
            "to": "user@snoogle.com",
            "labels": [],
            "isStarred": false
        },
        {
            "id": "fa30bd09-60bf-49c4-83b9-45c0ebac899d",
            "createdAt": 1730148377000,
            "subject": "Weekly Project Update",
            "body": "Notice:\n\nWe will be performing system maintenance on April 20, 2025, from 02:00 AM to 04:00 AM UTC. During this time, services may be unavailable.\n\nThank you for your understanding,\nOperations Team",
            "isRead": true,
            "sentAt": 1730148956199,
            "removedAt": null,
            "from": "newsletter17@news.com",
            "to": "user@snoogle.com",
            "labels": [],
            "isStarred": false
        },
        {
            "id": "eb1939ab-dcc7-47a0-b637-bd3cae77a02b",
            "createdAt": 1742935017000,
            "subject": "Weekly Project Update",
            "body": "Notice:\n\nWe will be performing system maintenance on April 20, 2025, from 02:00 AM to 04:00 AM UTC. During this time, services may be unavailable.\n\nThank you for your understanding,\nOperations Team",
            "isRead": true,
            "sentAt": 1742935192789,
            "removedAt": 1742949918630,
            "from": "newsletter5@news.com",
            "to": "user@snoogle.com",
            "labels": [],
            "isStarred": false
        },
        {
            "id": "29b74614-104d-428d-9eb6-2f4ca1be8543",
            "createdAt": 1706782533000,
            "subject": "Invoice #45321 Attached",
            "body": "Notice:\n\nWe will be performing system maintenance on April 20, 2025, from 02:00 AM to 04:00 AM UTC. During this time, services may be unavailable.\n\nThank you for your understanding,\nOperations Team",
            "isRead": true,
            "sentAt": 1706783052775,
            "removedAt": 1706791248070,
            "from": "newsletter20@news.com",
            "to": "user@snoogle.com",
            "labels": [],
            "isStarred": true
        },
        {
            "id": "f0586fad-d7b6-4e66-b84c-7478ebf21ff4",
            "createdAt": 1703443344000,
            "subject": "Checking in",
            "body": "Dear valued customer,\n\nWe're excited to announce the launch of our new product line! For a limited time, enjoy 20% off your first purchase. Visit our website to explore all the great features and offers.\n\nThank you for being a loyal customer.\n\nSincerely,\nThe Team",
            "isRead": false,
            "sentAt": 1703443720170,
            "removedAt": null,
            "from": "newsletter10@news.com",
            "to": "user@snoogle.com",
            "labels": [],
            "isStarred": true
        },
        {
            "id": "89275eec-5c4f-4e38-ac5c-b9918b375974",
            "createdAt": 1697758972000,
            "subject": "Your Verification Code",
            "body": "Welcome to Snoogle!\n\nThank you for creating an account with us. We\u2019re thrilled to have you. To get started, verify your email address and explore our features.\n\nHappy exploring,\nThe Snoogle Team",
            "isRead": true,
            "sentAt": 1697759122369,
            "removedAt": 1697792556457,
            "from": "newsletter3@news.com",
            "to": "user@snoogle.com",
            "labels": [],
            "isStarred": false
        },
        {
            "id": "7f3669a6-e02f-474a-af88-e73b7e8c35a7",
            "createdAt": 1730807087000,
            "subject": "Special Offer Just for You",
            "body": "Notice:\n\nWe will be performing system maintenance on April 20, 2025, from 02:00 AM to 04:00 AM UTC. During this time, services may be unavailable.\n\nThank you for your understanding,\nOperations Team",
            "isRead": true,
            "sentAt": 1730807461798,
            "removedAt": null,
            "from": "newsletter5@news.com",
            "to": "user@snoogle.com",
            "labels": [],
            "isStarred": false
        },
        {
            "id": "74953341-b674-428a-99eb-18c1f8abf4e9",
            "createdAt": 1725964728000,
            "subject": "Scheduled System Maintenance",
            "body": "Hello,\n\nYour invoice for March 2025 is now available. Please find the details below and let us know if you have any questions.\n\nInvoice Number: 45321\nTotal Due: $1,250.00\nDue Date: May 1, 2025\n\nThank you for your business.\n\nRegards,\nAccounting Department",
            "isRead": false,
            "sentAt": 1725965097184,
            "removedAt": null,
            "from": "newsletter17@news.com",
            "to": "user@snoogle.com",
            "labels": [],
            "isStarred": false
        },
        {
            "id": "bdd47f63-98bf-492c-b397-59a168107319",
            "createdAt": 1740237590000,
            "subject": "VIP Program Invitation",
            "body": "Security Alert:\n\nYour verification code is 482913. Please use this code to complete your sign-in process. If you did not request this code, please reset your password immediately.\n\nThanks,\nSecurity Team",
            "isRead": true,
            "sentAt": 1740238028029,
            "removedAt": null,
            "from": "newsletter10@news.com",
            "to": "user@snoogle.com",
            "labels": [],
            "isStarred": false
        },
        {
            "id": "8962f2ec-8d36-4092-82de-82eba8d9cca6",
            "createdAt": 1708465519000,
            "subject": "Subscription Renewal Reminder",
            "body": "Hello,\n\nThank you for your feedback on our latest update. We appreciate your insights and will work to improve based on your suggestions.\n\nBest regards,\nSupport Team",
            "isRead": false,
            "sentAt": 1708465991157,
            "removedAt": null,
            "from": "newsletter4@news.com",
            "to": "user@snoogle.com",
            "labels": [],
            "isStarred": false
        },
        {
            "id": "0e1d9bf3-a2c2-48a9-b1b4-f4cef865bf70",
            "createdAt": 1698326264000,
            "subject": "Special Offer Just for You",
            "body": "Reminder:\n\nYour subscription will renew on May 15, 2025. If you wish to make any changes, please visit your account settings or contact support.\n\nThank you,\nCustomer Success",
            "isRead": true,
            "sentAt": 1698326501806,
            "removedAt": null,
            "from": "newsletter19@news.com",
            "to": "user@snoogle.com",
            "labels": [],
            "isStarred": true
        },
        {
            "id": "69212387-ca1f-4129-994c-a08b94e99b34",
            "createdAt": 1718862644000,
            "subject": "Welcome to Snoogle",
            "body": "Security Alert:\n\nYour verification code is 482913. Please use this code to complete your sign-in process. If you did not request this code, please reset your password immediately.\n\nThanks,\nSecurity Team",
            "isRead": true,
            "sentAt": 1718862884646,
            "removedAt": null,
            "from": "newsletter3@news.com",
            "to": "user@snoogle.com",
            "labels": [],
            "isStarred": false
        },
        {
            "id": "27215ac4-1daf-416c-92a1-623d5dbedc68",
            "createdAt": 1729192001000,
            "subject": "Checking in",
            "body": "Security Alert:\n\nYour verification code is 482913. Please use this code to complete your sign-in process. If you did not request this code, please reset your password immediately.\n\nThanks,\nSecurity Team",
            "isRead": true,
            "sentAt": 1729192451879,
            "removedAt": null,
            "from": "newsletter2@news.com",
            "to": "user@snoogle.com",
            "labels": [],
            "isStarred": false
        },
        {
            "id": "1e1d3d8c-cad1-44b4-aff1-07ed14468cdf",
            "createdAt": 1739378755000,
            "subject": "Special Offer Just for You",
            "body": "Notice:\n\nWe will be performing system maintenance on April 20, 2025, from 02:00 AM to 04:00 AM UTC. During this time, services may be unavailable.\n\nThank you for your understanding,\nOperations Team",
            "isRead": true,
            "sentAt": 1739379048239,
            "removedAt": 1739424648663,
            "from": "newsletter9@news.com",
            "to": "user@snoogle.com",
            "labels": [],
            "isStarred": false
        },
        {
            "id": "6d797513-1175-4cc9-a259-fb886f934973",
            "createdAt": 1726583938000,
            "subject": "Your Verification Code",
            "body": "Notice:\n\nWe will be performing system maintenance on April 20, 2025, from 02:00 AM to 04:00 AM UTC. During this time, services may be unavailable.\n\nThank you for your understanding,\nOperations Team",
            "isRead": true,
            "sentAt": 1726584312496,
            "removedAt": null,
            "from": "newsletter19@news.com",
            "to": "user@snoogle.com",
            "labels": [],
            "isStarred": false
        },
        {
            "id": "2dfe5cff-7a8e-46ae-90cb-fd3952297bcc",
            "createdAt": 1720358509000,
            "subject": "Your Verification Code",
            "body": "Hello,\n\nThank you for your feedback on our latest update. We appreciate your insights and will work to improve based on your suggestions.\n\nBest regards,\nSupport Team",
            "isRead": false,
            "sentAt": 1720358876815,
            "removedAt": 1720372146238,
            "from": "newsletter7@news.com",
            "to": "user@snoogle.com",
            "labels": [],
            "isStarred": true
        }
    ]

    return mails
} 
