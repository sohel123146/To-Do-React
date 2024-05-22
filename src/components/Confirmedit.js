import React from 'react'

const Confirmedit = ({onChange,editItem,task}) => {
  return (
    <div>
        {/* Edit Confirmation Modal */}
        <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
            <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title" id="deleteModalLabel">Edit this todo</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <input
                type="text"
                className="form-control me-2"
                placeholder="Edit item..."
                onChange={onChange}
                value={task}
                />
                </div>
                <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={editItem}>Update</button>
                </div>
            </div>
            </div>
      </div>
    </div>
  )
}

export default Confirmedit
