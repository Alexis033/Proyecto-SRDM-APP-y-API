import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

export const ModalStatic = ({ title, content, action, show, handleClose }) => {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{content}</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          {action && (
            <Button variant='primary' onClick={action}>
              Acept
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  )
}
