export const merge = (...obj) => Object.assign({}, ...obj);

export function checkMatch(array, string, name, set) {
    array.map(e => {
        if (e != undefined && string != undefined) {
            const e1 = e[name].split('')
            const e1r = [...e1].reverse()
            const e2 = string.split('')
            const e2r = [...e2].reverse()

            let count = 0
            let position = 0
            let positionReverse = 0


            for (let i = 0; i < e1.length; i++) {
                if (string.includes(e2[i])) count++;
                if (e1[i] === e2[i]) position++;
                if (e1r[i] === e2r[i]) positionReverse++;
            }

            let positionSum = position + positionReverse
            const percentageCount = Math.floor((count / e1.length * 100), 100)
            const percentagePosition = Math.floor((positionSum / e1.length * 100), 100)
            set.add({
                string: e[name],
                stringToCompare: string,
                countMatch: percentageCount,
                positionMatch: percentagePosition
            })
        }
    })
}
const allLetters = [];
for (var i = 65; i < 91; i++) {
    allLetters.push({ letter: String.fromCharCode(i), count: 0 });
};
export function countLetters(stringArr) {
    for (let i = 0; i < allLetters.length; i++) {
        for (let j = 0; j < stringArr.length; j++) {
            if (allLetters[i].letter === stringArr[j]) {
                j < stringArr.length ? allLetters[i].count++ : null
            }
        }
    }
    return allLetters.filter(l => l.count !== 0).sort((a, b) => b.count - a.count)
}