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
const allLetters = [];
for (var i = 65; i < 91; i++) {
    allLetters.push({ letter: String.fromCharCode(i), count: 0 });
};


class EmployeeList extends Component {

    constructor() {
        super()
        this.state = {
            employees: [],
            clicked: false
        }
    }

    componentDidMount() {
        this.props.getEmployees()
            .then((res) => this.setState({ employees: res.employees }))
    }

    handleFrequency(email) {
        const chars = email.toUpperCase().match(/[A-Z]/g)
        for (let i = 0; i < allLetters.length; i++) {
            for (let j = 0; j < chars.length; j++) {
                if (allLetters[i].letter === chars[j]) {
                    allLetters[i].count++
                }
            }
        }
    }

    handleClick() {
        this.setState({ clicked: !this.state.clicked })
    }

    render() {
        const { employees, clicked } = this.state
        employees.map(e => this.handleFrequency(e.email_address))
        return (
            <Container>

                <h1>SalesLoft Employee List</h1>
                <div>
                    <button onClick={this.handleClick.bind(this)}>Email Letter Frequency</button>
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
