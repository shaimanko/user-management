import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Grid, IconButton, SvgIcon } from '@material-ui/core'

import { onCreateUser, onEditUser } from '../../../actions'
import { Button, Modal, Input } from '../../../components'

import './style.css'

class UserForm extends React.Component {
  state = {
    formData: {
      firstName: '',
      lastName: '',
      address: ''
    },
    errorMessage: {
      firstName: '',
      lastName: '',
      address: ''
    },
    flag: false
  }

  componentDidUpdate(prevProps) {
    const { flag } = this.state
    const { selectedId, userList } = this.props
    if (
      prevProps.selectedId !== selectedId ||
      (prevProps.selectedId === selectedId && selectedId !== '' && !flag)
    ) {
      const index = userList
        .map(function(x) {
          return x.id
        })
        .indexOf(selectedId)
      const formData = {
        firstName: userList[index].firstName,
        lastName: userList[index].lastName,
        address: userList[index].address,
        recordId: selectedId
      }
      this.setState({ formData, flag: true })
    }
  }

  onClearData = () =>
    this.setState({
      formData: {
        firstName: '',
        lastName: '',
        address: ''
      },
      errorMessage: {
        firstName: '',
        lastName: '',
        address: ''
      },
      flag: false
    })

  onFieldChanged = event => {
    const { formData } = this.state

    this.setState({
      formData: {
        ...formData,
        [event.target.name]: event.target.value
      }
    })
  }

  handleSubmit = async event => {
    event.preventDefault()

    const { formData } = this.state
    const { eventAction } = this.props
    let errorMessage = null

    if (formData.firstName === '') {
      errorMessage = { firstName: 'Please enter First Name' }
    }
    if (formData.lastName === '') {
      errorMessage = { ...errorMessage, lastName: 'Please enter Last Name' }
    }
    if (formData.address === '') {
      errorMessage = { ...errorMessage, address: 'Please enter Address' }
    }
    if (errorMessage != null) {
      this.setState({ errorMessage })
      return
    } else {
      this.onClearData()
      this.props.handleClose()

      eventAction === 'add'
        ? await this.props.onCreateUser(formData)
        : await this.props.onEditUser(formData)
    }
  }

  submitForm = () => {
    const { formData, errorMessage } = this.state
    return (
      <div className='registration-section'>
        <form className='form-component' onSubmit={e => this.handleSubmit(e)}>
          <Grid container>
            <Grid className='input-field' item xs={4}>
              <div className='label-section'>
                <label>
                  <span className='required'>*</span> First Name:
                </label>
              </div>
            </Grid>
            <Grid item>
              <Input
                error={!!errorMessage.firstName}
                helperText={errorMessage.firstName}
                name='firstName'
                onChange={this.onFieldChanged}
                variant='outlined'
                value={formData.firstName}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid className='input-field' item xs={4}>
              <div className='label-section'>
                <label>
                  <span className='required'>*</span> Last Name:
                </label>
              </div>
            </Grid>
            <Grid item>
              <Input
                error={!!errorMessage.lastName}
                helperText={errorMessage.lastName}
                name='lastName'
                onChange={this.onFieldChanged}
                variant='outlined'
                value={formData.lastName}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid className='input-field' item xs={4}>
              <div className='label-section'>
                <label>
                  <span className='required'>*</span> Address:
                </label>
              </div>
            </Grid>
            <Grid item>
              <Input
                error={!!errorMessage.address}
                helperText={errorMessage.address}
                name='address'
                onChange={this.onFieldChanged}
                variant='outlined'
                value={formData.address}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs>
              <div className='buttons'>
                <Button type='submit'>Submit</Button>
              </div>
            </Grid>
          </Grid>
        </form>
      </div>
    )
  }

  render() {
    const { eventAction, handleClose, isOpen } = this.props
    return (
      <Modal
        bodySection={this.submitForm()}
        isOpen={isOpen}
        titleSection={
          <div className='registration-title-section'>
            <div className='title-section'>
              {eventAction === 'add' ? 'Add New' : 'Edit'} User
            </div>
            <div className='button-section'>
              <IconButton
                onClick={() => {
                  this.onClearData()
                  handleClose()
                }}
              >
                <SvgIcon fontSize='small'>
                  <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z' />
                </SvgIcon>
              </IconButton>
            </div>
          </div>
        }
      />
    )
  }
}

UserForm.propTypes = {
  eventAction: PropTypes.string.isRequired,
  handleClose: PropTypes.func,
  isOpen: PropTypes.bool,
  selectedId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

UserForm.defaultProps = {
  selectedId: ''
}

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
  onCreateUser: formData => dispatch(onCreateUser(formData)),
  onEditUser: formData => dispatch(onEditUser(formData))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserForm)
