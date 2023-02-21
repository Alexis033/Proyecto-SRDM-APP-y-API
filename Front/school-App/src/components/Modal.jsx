export const Modal = ({ id, title, content, action }) => {
  return (
    <>
      <div
        className='modal fade'
        id={id}
        tabIndex='-1'
        aria-labelledby='miModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='miModalLabel'>
                {title}
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Cerrar'
              />
            </div>
            <div className='modal-body'>
              <p>{content}</p>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'
              >
                Cerrar
              </button>
              {action && (
                <button
                  type='button'
                  className='btn btn-primary'
                  onClick={action}
                >
                  Aceptar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
