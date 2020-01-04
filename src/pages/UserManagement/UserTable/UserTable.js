import React from 'react'
import PropTypes from 'prop-types'
import { Paper } from '@material-ui/core'

import { Table } from '../../../components'

import './style.css'

const UserTable = ({ dataList, deleteAction, editAction, headerRows }) => {
  return (
    <Paper className='table-section'>
      <Table
        dataList={dataList}
        deleteAction={deleteAction}
        editAction={editAction}
        headerRows={headerRows}
      />
    </Paper>
  )
}

UserTable.propTypes = {
  dataList: PropTypes.array.isRequired,
  headerRows: PropTypes.array
}

UserTable.defaultProps = {
  headerRows: [
    {
      id: 'firstName',
      numeric: false,
      disablePadding: false,
      label: 'Name'
    },
    {
      id: 'lastName',
      numeric: false,
      disablePadding: false,
      label: 'Lastname'
    },
    {
      id: 'address',
      numeric: false,
      disablePadding: false,
      label: 'Address'
    },
    { id: 'action', numeric: false, disablePadding: false, label: 'Action' }
  ]
}

export default UserTable
