import React from 'react'
import PropTypes from 'prop-types'
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  IconButton,
  SvgIcon
} from '@material-ui/core'

import EnhancedTableHead from './EnhancedTableHead'

import './style.css'

class Table extends React.Component {
  state = {
    page: 0,
    rowsPerPage: 5
  }

  handleChangePage = (event, page) => {
    this.setState({ page })
  }

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value })
  }

  render() {
    const { rowsPerPage, page } = this.state
    const { dataList, deleteAction, editAction, headerRows } = this.props

    const emptyRows =
      dataList !== null
        ? rowsPerPage -
          Math.min(rowsPerPage, dataList.length - page * rowsPerPage)
        : 5

    return (
      <div className='table-container'>
        <MuiTable aria-labelledby='tableTitle'>
          <EnhancedTableHead
            className='table-header-section'
            headerRows={headerRows}
          />
          <TableBody>
            {dataList !== null &&
              dataList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  return (
                    <TableRow hover tabIndex={-1} key={`item-${n.id}`}>
                      <TableCell>{n.firstName}</TableCell>
                      <TableCell>{n.lastName}</TableCell>
                      <TableCell>{n.address}</TableCell>
                      <TableCell>
                        <IconButton
                          className='edit-button'
                          onClick={event => editAction(event, n.id)}
                        >
                          <SvgIcon fontSize='small'>
                            <path d='M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z' />
                          </SvgIcon>
                        </IconButton>
                        <IconButton
                          className='delete-button'
                          disabled
                          onClick={event => deleteAction(event, n.id)}
                        >
                          <SvgIcon>
                            <path d='M17.114,3.923h-4.589V2.427c0-0.252-0.207-0.459-0.46-0.459H7.935c-0.252,0-0.459,0.207-0.459,0.459v1.496h-4.59c-0.252,0-0.459,0.205-0.459,0.459c0,0.252,0.207,0.459,0.459,0.459h1.51v12.732c0,0.252,0.207,0.459,0.459,0.459h10.29c0.254,0,0.459-0.207,0.459-0.459V4.841h1.511c0.252,0,0.459-0.207,0.459-0.459C17.573,4.127,17.366,3.923,17.114,3.923M8.394,2.886h3.214v0.918H8.394V2.886z M14.686,17.114H5.314V4.841h9.372V17.114z M12.525,7.306v7.344c0,0.252-0.207,0.459-0.46,0.459s-0.458-0.207-0.458-0.459V7.306c0-0.254,0.205-0.459,0.458-0.459S12.525,7.051,12.525,7.306M8.394,7.306v7.344c0,0.252-0.207,0.459-0.459,0.459s-0.459-0.207-0.459-0.459V7.306c0-0.254,0.207-0.459,0.459-0.459S8.394,7.051,8.394,7.306' />
                          </SvgIcon>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )
                })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 49 * emptyRows }}>
                <TableCell colSpan={5} />
              </TableRow>
            )}
          </TableBody>
        </MuiTable>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={dataList !== null ? dataList.length : 5}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page'
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page'
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </div>
    )
  }
}

Table.propTypes = {
  dataList: PropTypes.array.isRequired,
  deleteAction: PropTypes.func.isRequired,
  editAction: PropTypes.func.isRequired,
  headerRows: PropTypes.array.isRequired
}

export default Table
