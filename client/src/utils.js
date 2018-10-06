export const merge = (...obj) => Object.assign({}, ...obj);

export function checkMatch(array, email, set) {
    array.map(e => {
        const e1 = e.email_address.split('')
        const e2 = email.split('')
        let countMatch = 0
        let positionMatch = 0
        for (let i = 0; i < e1.length; i++) {
            if (e.email_address.includes(e2[i])) countMatch++;
            if (e1[i] === e2[i]) positionMatch++;
        }
        const percentageCount = Math.floor((countMatch / e1.length * 100), 100)
        const percentagePosition = Math.floor((positionMatch / e1.length * 100), 100)
        set.add({ email: e.email_address, emailToCompare: email, countMatch: percentageCount, positionMatch: percentagePosition })
    })
}

export function countLetters(array, characterArray) {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < characterArray.length; j++) {
            if (array[i].letter === characterArray[j]) {
                j < characterArray.length ? array[i].count++ : null
            }
        }
    }
}