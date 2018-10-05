import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { getEmployees } from '../actions/AsyncActions'

const Container = styled.div`
display: flex;
justify-content:center;
align-items: center;
flex-direction: column;
margin: 20px;
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
button{
    width: 200px;
    height: 35px;
    background: none;
    cursor: pointer;
    font-size: 15px;
    margin: 5px;
}
`


class EmployeeList extends Component {

    constructor() {
        super()
        this.state = {
            employees: []
        }
    }

    componentDidMount() {
        this.props.getEmployees()
            .then((res) => this.setState({ employees: res.employees }))
    }

    render() {
        const { employees } = this.state
        console.log(employees)
        return (
            <Container>

                <h1>SalesLoft Employee List</h1>
                <div>
                    <button>Email Letter Frequency</button>
                    <button>Duplicate Emails</button>
                </div>
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Title</th>
                        <th>Email</th>
                        <th>Notes</th>
                    </tr>
                    {employees.map(e =>
                        < tr >
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
}

const mapStateToProps = (dispatch) => ({
    getEmployees: () => dispatch(getEmployees())
})

export default connect(null, mapStateToProps)(EmployeeList)
