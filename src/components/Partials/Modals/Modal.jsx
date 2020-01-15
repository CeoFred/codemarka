import React from 'react'

export default function Modal(props) {
    return (
        <div>
            <div
                className={ `modal fade modal-${
                    props.type
                } docs-example-modal-${ props.size || 'sm' }` }
                id={ props.targetid }
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div
                    className="modal-dialog modal-dialog-centered"
                    role="document">
                    <div className="modal-content" style={{height:'90vh',overflow:'auto'}}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                {props.titleIcon || ''}
                                {props.title || ''}
                            </h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body h-50 overflow-y container-fluid">
                            {props.children}
                        </div>
                        <div className="modal-footer">
                            {props.close ? (
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-dismiss="modal">
                                    Close
                                </button>
                            ) : (
                                ''
                            )}
                            {props.footerContent}

                            {props.buttonExtra ? props.buttonExtra : ''}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
