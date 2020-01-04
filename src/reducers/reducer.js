import { USER_MANAGEMENT } from '../global/request'

const initialState = {
  userList: [],
  response: null
}

export default (state = initialState, action) => {
  let userList = state.userList
  switch (action.type) {
    case USER_MANAGEMENT.CREATE:
      if (userList !== null && userList.length > 0)
        action.formData.id = (
          parseInt(userList[userList.length - 1].id) + 1
        ).toString()
      else action.formData.id = 1
      userList.push(action.formData)
      return {
        ...state,
        userList
      }
    case USER_MANAGEMENT.EDIT:
      const updateData = action.formData
      const recordId = action.formData.recordId

      const index = userList
        .map(function(x) {
          return x.id
        })
        .indexOf(recordId)

      userList[index].firstName = updateData.firstName
      userList[index].lastName = updateData.lastName
      userList[index].address = updateData.address

      return {
        ...state,
        userList
      }
    case USER_MANAGEMENT.GET:
      return {
        ...state,
        userList: mockUpData
      }
    default:
      return state
  }
}

const mockUpData = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Brown',
    address: 'New York No.1 Lake Park'
  },
  {
    id: '2',
    firstName: 'Jim',
    lastName: 'Green',
    address: 'London No.1 Lake Park'
  },
  {
    id: '3',
    firstName: 'Joe',
    lastName: 'Black',
    address: 'Sidney No.1 Lake Park'
  }
]
