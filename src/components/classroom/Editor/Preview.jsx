import React from 'react'

export default function Preview(props) {
    return (
        <div>
<button type="button" onClick={props.previewBtnClicked}  data-toggle="modal" data-target="#modal_1" className="preview_btn" >
        <i className="fa fa-play-circle fa-3x"></i>
      </button>
      
<div className="modal modal-fluid fade" id="modal_1" tabindex="-1" role="dialog" aria-labelledby="modal_1" aria-hidden="true">
    <div className="modal-dialog modal-lg h-100vh" role="document">
        <div className="modal-content h-100vh">
            <div className="modal-body">
                <div className="row h-100vh w-100">
                    <div className="col-12 text-center py-1 w-100">
                        <iframe title="preview" className="w-100 h-80" id="preview_iframe"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
<button type="button" onClick={props.openPreviewInNewTab}  className="open_new_tab_btn" >
        <i className="fa fa-external-link-square-alt fa-3x"></i>
      </button>
</div>
        </div>
    )
}
