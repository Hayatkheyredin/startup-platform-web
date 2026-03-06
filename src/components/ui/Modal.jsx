/**
 * Modal - Reusable modal wrapper using React Bootstrap.
 * Used for confirmations, forms, and detail views.
 */
import React from 'react'
import { Modal as BSModal, Button } from 'react-bootstrap'

function Modal({ show, onHide, title, children, footer, size = 'md' }) {
  return (
    <BSModal show={show} onHide={onHide} size={size} centered>
      <BSModal.Header closeButton>
        <BSModal.Title>{title}</BSModal.Title>
      </BSModal.Header>
      <BSModal.Body>{children}</BSModal.Body>
      {footer && <BSModal.Footer>{footer}</BSModal.Footer>}
    </BSModal>
  )
}

export default Modal
