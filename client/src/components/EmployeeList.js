import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getEmployees } from '../actions/AsyncActions'

class EmployeeList extends Component {

    componentDidMount() {
        this.props.getEmployees()
            .then((res) => console.log(res))
    }

    render() {
        return (
            <div>
                Hello World!
            </div>
        )
    }
}

const mapStateToProps = (dispatch) => ({
    getEmployees: () => dispatch(getEmployees())
})

export default connect(null, mapStateToProps)(EmployeeList)
