import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { getEmployees } from '../actions/AsyncActions'

import EmployeesTable from './EmployeesTable'
import LetterFrequency from './LetterFrequency'

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
            clicked: false,
            duplicateClicked: false,
            duplicate: [],
        }
    }

    componentDidMount() {

        this.props.getEmployees()
            .then((res) => this.setState({ employees: res.employees }, () => {
                //this needs to stay here to get loaded only once
                this.state.employees.map(e => this.handleFrequency(e.email_address))
            }))

    }

    handleFrequency(email) {
        const chars = email.toUpperCase().match(/[A-Z]/g)
        for (let i = 0; i < allLetters.length; i++) {
            for (let j = 0; j < chars.length; j++) {
                if (allLetters[i].letter === chars[j]) {
                    j < chars.length ? allLetters[i].count++ : null
                }
            }
        }
    }

    handleClick() {
        this.setState({ clicked: !this.state.clicked })
    }

    handleDuplicate(employees) {
        const match = []
        employees.map(e => checkMatch(employees, e.email_address))
        const finalMatch = match.filter(e => e.countMatch !== 100 && e.countMatch > 95)

        //match testing function
        function checkMatch(employees, email) {
            employees.map(e => {
                const e1 = e.email_address.split('')
                const e2 = email.split('')
                const length = e1.length > e2.length ? e1.length : e2.length

                let countMatch = 0
                let positionMatch = 0
                for (let i = 0; i < length; i++) {
                    if (e.email_address.includes(e2[i])) countMatch++;
                    if (e1[i] === e2[i]) positionMatch++;
                }
                const percentageCount = Math.floor((countMatch / length * 100), 100)
                const percentagePosition = Math.floor((positionMatch / length * 100), 100)
                match.push({ email: e.email_address, emailToCompare: email, countMatch: percentageCount, positionMatch: percentagePosition })
            })
        }
        this.setState({ duplicate: finalMatch, duplicateClicked: !this.state.duplicateClicked })
    }

    render() {
        const { employees, clicked, duplicateClicked, duplicate } = this.state
        const letterFrequency = allLetters.filter(l => l.count !== 0).sort((a, b) => b.count - a.count)

        return (
            <Container>

                <h1>SalesLoft Employee List</h1>
                <div>
                    <button onClick={this.handleClick.bind(this)}>Email Letter Frequency</button>
                    <button onClick={() => this.handleDuplicate(employees)}>Duplicate Emails</button>
                    <div>{duplicateClicked ? (duplicate.length ?
                        <div>{duplicate.map(e => <div>
                            <div>Email:{e.email}</div>
                            <div>Email To Compare:{e.emailToCompare}</div>
                            <div>Count Match: {e.countMatch} %</div>
                            <div>Position Match: {e.positionMatch}%</div>
                        </div>)}</div> : <div>No duplicate email copy found!</div>) : null} </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <EmployeesTable employees={employees} /> {clicked ? <LetterFrequency letterFrequency={letterFrequency} /> : null}
                </div>
            </Container>
        )
    }
}

const mapStateToProps = (dispatch) => ({
    getEmployees: () => dispatch(getEmployees())
})

export default connect(null, mapStateToProps)(EmployeeList)
