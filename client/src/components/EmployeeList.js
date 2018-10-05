import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { getEmployees } from '../actions/AsyncActions'

import EmployeesTable from './EmployeesTable'

const Container = styled.div`
display: flex;
justify-content:center;
align-items: center;
flex-direction: column;
margin: 20px;
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
                <EmployeesTable employees={employees} />
            </Container>
        )
    }
}

const mapStateToProps = (dispatch) => ({
    getEmployees: () => dispatch(getEmployees())
})

export default connect(null, mapStateToProps)(EmployeeList)
