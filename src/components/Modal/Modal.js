import React from 'react'
import PropTypes from 'prop-types'
import { Modal as ModalMUI, Typography } from '@material-ui/core'

import './style.css'

const Modal = ({ bodySection, buttonSection, isOpen, titleSection }) => {
  return (
    <ModalMUI
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
      open={isOpen}
    >
      <div className='modal-section'>
        <Typography variant='h6' id='modal-title'>
          {titleSection}
        </Typography>
        <Typography variant='subtitle1' id='simple-modal-description'>
          {bodySection}
        </Typography>
        <div className='button-section'>{buttonSection}</div>
      </div>
    </ModalMUI>
  )
}

Modal.propTypes = {
  bodySection: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  buttonSection: PropTypes.node,
  isOpen: PropTypes.bool,
  titleSection: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
}

export default Modal
