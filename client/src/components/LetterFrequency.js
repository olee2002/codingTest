import React from 'react'
import styled from 'styled-components'

const SubContainer = styled.div`
display: flex;
justify-content:center;
align-items: center;
table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
}
td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
}
tr:nth-child(even) {
    background-color: #e9e9e9;
}
`
const LetterFrequency = (props) => {
    return (
        <SubContainer>
            <table>
                <tr>
                    <th>Character</th>
                    <th>Count</th>
                </tr>
                {props.letterFrequency.map(e =>
                    < tr key={e.letter} >
                        <td>{e.letter}</td>
                        <td>{e.count}</td>
                    </tr>)}
            </table>
        </SubContainer>
    )
}

export default LetterFrequency
