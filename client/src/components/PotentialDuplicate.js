import React from 'react'

const Duplicates = (props) => {
    return (
        <div>{props.duplicateButtonClicked ?
            (props.duplicate.length ?
                <div>{props.duplicate.map((e, i) =>
                    <div key={i}>
                        <div>A.Email:{e.string}</div>
                        <div>B.Email To Compare:{e.stringToCompare}</div>
                        <div>A.List:{e.string.split('').sort()}</div>
                        <div>B.List:{e.stringToCompare.split('').sort()}</div>
                        <div>Count Match:{e.countMatch}% | Position Match:{e.positionMatch}%</div>
                        <hr />
                    </div>)}
                </div>
                : <div>No duplicate email copy found!</div>)
            : null}
        </div>
    )
}

export default Duplicates
