import React from 'react'
import PropTypes from 'prop-types'
import { TableHead, TableRow, TableCell } from '@material-ui/core'

const EnhancedTableHead = ({ className, headerRows }) => {
  return (
    <TableHead className={className}>
      <TableRow>
        {headerRows.map(
          row => (
            <TableCell
              key={`head-item-${row.id}`}
              align={row.numeric ? 'right' : 'left'}
              padding={row.disablePadding ? 'none' : 'default'}
            >
              {row.label}
            </TableCell>
          ),
          this
        )}
      </TableRow>
    </TableHead>
  )
}

EnhancedTableHead.propTypes = {
  headerRows: PropTypes.array.isRequired
}

export default EnhancedTableHead
