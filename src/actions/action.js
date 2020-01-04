import { USER_MANAGEMENT } from '../global/request'

const onCreateUser = formData => {
  return {
    type: USER_MANAGEMENT.CREATE,
    formData
  }
}

const onEditUser = formData => {
  return {
    type: USER_MANAGEMENT.EDIT,
    formData
  }
}

const onGetUser = () => {
  return {
    type: USER_MANAGEMENT.GET
  }
}

export { onCreateUser, onEditUser, onGetUser }
