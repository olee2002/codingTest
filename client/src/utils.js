export const merge = (...obj) => Object.assign({}, ...obj);

export function checkMatch(array, string, name, set) {
    array.map(e => {
        if (e != undefined && string != undefined) {
            const e1 = e[name].split('')
            const e2 = string.split('')
            let countMatch = 0
            let positionMatch = 0
            for (let i = 0; i < e1.length; i++) {
                if (string.includes(e2[i])) countMatch++;
                if (e1[i] === e2[i]) positionMatch++;
            }
            const percentageCount = Math.floor((countMatch / e1.length * 100), 100)
            const percentagePosition = Math.floor((positionMatch / e1.length * 100), 100)
            set.add({
                string: string,
                stringToCompare: string,
                countMatch: percentageCount,
                positionMatch: percentagePosition
            })
        }
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