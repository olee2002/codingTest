import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getEmployees } from '../actions/AsyncActions'

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
            <div>
                <h1>SalesLoft Employee List</h1>
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Title</th>
                        <th>Email</th>
                    </tr>
                    {employees.map(e =>
                        < tr >
                            <td>{e.first_name} {e.last_name}</td>
                            <td>{e.title}</td>
                            <td>{e.email_address}</td>
                        </tr>)}
                </table>
            </div>
        )
    }
}

const mapStateToProps = (dispatch) => ({
    getEmployees: () => dispatch(getEmployees())
})

export default connect(null, mapStateToProps)(EmployeeList)
