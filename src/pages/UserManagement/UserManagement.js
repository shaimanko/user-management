import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { onGetUser } from '../../actions'
import { Button } from '../../components'
import { UserForm, UserTable } from '../UserManagement'

import './style.css'

class UserManagement extends React.Component {
  state = {
    eventAction: '',
    isOpen: false,
    selectedId: ''
  }

  componentDidMount() {
    this.props.onGetUser()
  }

  onDeleteAction = (event, id) => {}

  onEditAction = (event, id) => {
    this.setState({ selectedId: id }, () => this.handleModal('edit'))
  }

  handleModal = (eventAction = '') =>
    this.setState({ eventAction, isOpen: !this.state.isOpen })

  render() {
    const { eventAction, isOpen, selectedId } = this.state
    const { userList } = this.props
    return (
      <div className='user-management-container'>
        <div className='add-button-section'>
          <Button onClick={() => this.handleModal('add')}>Add</Button>
        </div>
        <UserForm
          eventAction={eventAction}
          handleClose={this.handleModal}
          isOpen={isOpen}
          selectedId={selectedId}
        />
        <UserTable
          dataList={userList}
          deleteAction={this.onDeleteAction}
          editAction={this.onEditAction}
        />
      </div>
    )
  }
}

UserManagement.propTypes = {
  userList: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
  onGetUser: () => dispatch(onGetUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement)
