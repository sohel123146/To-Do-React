import React from 'react'

const Confirmdelete = ({deleteItem}) => {
  return (
    <div>
        <div>
        {/* Delete Confirmation Modal */}
        <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
            <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title" id="deleteModalLabel">Confirm Deletion</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                Are you sure you want to delete this todo item?
                </div>
                <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={deleteItem}>Delete</button>
                </div>
            </div>
            </div>
      </div>
    </div>
    </div>
  )
}

export default Confirmdelete
