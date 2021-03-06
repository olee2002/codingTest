import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { getEmployees } from '../actions/AsyncActions'
import { checkMatch, countLetters } from '../utils'

import EmployeesTable from './EmployeesTable'
import LetterFrequency from './LetterFrequency'
import Duplicates from './PotentialDuplicate'

const Container = styled.div`
display: flex;
justify-content:center;
align-items: center;
flex-direction: column;
margin: 20px;
button{
    width: 300px;
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
            employees: [],
            clicked: false,
            duplicateButtonClicked: false,
            duplicate: [],
            fetching: false,
            charsArr: []
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
        this.setState({ charsArr: countLetters(chars) })
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
            if (e.countMatch !== 100 && e.positionMatch !== 100) return e.countMatch >= 95 && e.positionMatch > 35;

        })

        this.setState({
            duplicate: finalMatch,
            duplicateButtonClicked: !this.state.duplicateButtonClicked,
            fetching: true
        })
    }

    render() {
        const { employees, clicked, duplicateButtonClicked, duplicate, charsArr } = this.state
        const buttonLetters = clicked ? 'Close Email Letter Frequency' : 'View Email Letter Frequency'
        const buttonDuplicates = duplicateButtonClicked ? 'Close Potential Duplicate Emails' : 'View Potential Duplicate Emails'

        return (
            <Container>
                <h1>SalesLoft Employee List</h1>
                <div>
                    <button onClick={this.handleClick.bind(this)}>{buttonLetters}</button>
                    <button onClick={() => this.handleDuplicate(employees)}>{buttonDuplicates}</button>
                    <Duplicates
                        duplicate={duplicate}
                        duplicateButtonClicked={duplicateButtonClicked}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <EmployeesTable employees={employees} /> {clicked ? <LetterFrequency letterFrequency={charsArr} /> : null}
                </div>
            </Container>
        )
    }
}

const mapStateToProps = (dispatch) => ({
    getEmployees: () => dispatch(getEmployees())
})

export default connect(null, mapStateToProps)(EmployeeList)
