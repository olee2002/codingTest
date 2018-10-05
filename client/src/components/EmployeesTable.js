import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
display: flex;
justify-content:center;
align-items: center;
flex-direction: column;
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

const EmployeesTable = (props) => {
    return (
        <Container>
            <table>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Title</th>
                    <th>Email</th>
                    <th>Notes</th>
                </tr>
                {props.employees.map(e =>
                    < tr key={e.id} >
                        <td>{e.id}</td>
                        <td>{e.first_name} {e.last_name}</td>
                        <td>{e.title}</td>
                        <td>{e.email_address}</td>
                        <td></td>
                    </tr>)}
            </table>
        </Container>
    )
}

export default EmployeesTable