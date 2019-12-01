import React from 'react'

export default function Preview(props) {
    return (
        <div>
<button type="button" onClick={props.previewBtnClicked}  data-toggle="modal" data-target="#modal_1" className="preview_btn" >
        <i className="fa fa-play-circle fa-3x"></i>
      </button>
      
<div class="modal modal-fluid fade" id="modal_1" tabindex="-1" role="dialog" aria-labelledby="modal_1" aria-hidden="true">
    <div class="modal-dialog modal-lg h-100vh" role="document">
        <div class="modal-content h-100vh">
            <div class="modal-body">
                <div class="row">
                    <div class="col-lg-8 text-center py-1">
                        <iframe title="preview" id="preview_iframe"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
        </div>
    )
}
