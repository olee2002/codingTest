import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { getEmployees } from '../actions/AsyncActions'
import { checkMatch, countLetters } from '../utils'

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
            fetching: false
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
        //"countLetters" function from utils
        countLetters(allLetters, chars)
    }

    handleClick() {
        this.setState({ clicked: !this.state.clicked })
    }

    handleDuplicate(employees) {
        const set = new Set()
        const attrName = "email_address"
        //"checkMatch" function from utils
        employees.map(e => checkMatch(employees, e[attrName], attrName, set))
        const finalMatch = [...set].filter(e => {
            if (e.countMatch !== 100) return e.countMatch >= 95;

        })

        this.setState({
            duplicate: finalMatch,
            duplicateClicked: !this.state.duplicateClicked,
            fetching: true
        })
    }

    render() {
        const { employees, clicked, duplicateClicked, duplicate, fetching } = this.state
        const letterFrequency = allLetters.filter(l => l.count !== 0).sort((a, b) => b.count - a.count)

        return (
            <Container>
                <h1>SalesLoft Employee List</h1>
                <div>
                    <button onClick={this.handleClick.bind(this)}>Email Letter Frequency</button>
                    <button onClick={() => this.handleDuplicate(employees)}>Potential Duplicate Emails</button>
                    <div>{duplicateClicked ?
                        (fetching ?
                            (duplicate.length ?
                                <div>{duplicate.map(e =>
                                    <div key={e.string}>
                                        <hr />
                                        <div>A.Email:{e.string}</div>
                                        <div>B.Email To Compare:{e.stringToCompare}</div>
                                        <div>A.List:{e.string.split('').sort()}</div>
                                        <div>B.List:{e.stringToCompare.split('').sort()}</div>
                                        <div>Count Match:{e.countMatch}% | Position Match:{e.positionMatch}%</div>
                                    </div>)}
                                </div>
                                : <div>No duplicate email copy found!</div>)
                            : 'Analyzing data!')
                        : null}
                    </div>
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
