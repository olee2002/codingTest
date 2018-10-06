export const merge = (...obj) => Object.assign({}, ...obj);
export function checkMatch(employees, email2, set) {
    employees.map(e => {
        const e1 = e.email_address.split('')
        const e2 = email2.split('')
        let countMatch = 0
        let positionMatch = 0
        for (let i = 0; i < e1.length; i++) {
            if (e.email_address.includes(e2[i])) countMatch++;
            if (e1[i] === e2[i]) positionMatch++;
        }
        const percentageCount = Math.floor((countMatch / e1.length * 100), 100)
        const percentagePosition = Math.floor((positionMatch / e1.length * 100), 100)
        set.add({ email: e.email_address, emailToCompare: email2, countMatch: percentageCount, positionMatch: percentagePosition })
    })
}