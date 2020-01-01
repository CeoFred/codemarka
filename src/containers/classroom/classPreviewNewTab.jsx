import React, { Component } from 'react'
import { connect } from 'react-redux';

import { dispatchAppEnvironment } from '../../store/actions/app';

export class classPreviewNewTab extends Component {

  componentWillMount() {
    this.props.onClassroomSwitch('classroom');
  }

  componentDidMount() {
     const { match: { params }  } = this.props;
  const classroomId = params.classroomId;

    const host = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test' ? process.env.REACT_APP_REMOTE_API_URL : process.env.REACT_APP_LOCAL_API_URL
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'Application/json')

    const handlePreviewFileFetch = () => {

    const url = `${ host }classroom/preview/${ classroomId }`;
        
        const searchClassroomRequest =  new Request(url, {
            method: 'GET',
            cache: 'default',
            headers: myHeaders,
            mode: 'cors'
        });

        return fetch(searchClassroomRequest)
        
      }
  
      handlePreviewFileFetch().then(d => d.json()).then(files => {
         const previewFrame = document.getElementById('tabpreviewframe');
    let styles, html , script;

    styles = files.data.cs.content;
    html = files.data.ht.content;
    script = files.data.js.content;

    const getGeneratedPageURL = ({ html, css, js }) => {
  const getBlobURL = (code, type) => {
    const blob = new Blob([ code ], { type })
    return URL.createObjectURL(blob)
  }

  const cssURL = getBlobURL(css, 'text/css')
  const jsURL = getBlobURL(js, 'text/javascript')

  const source = `
  <!DOCTYPE html>
    <html lang="en">
      <head>      
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
        ${ css && `<link rel="stylesheet" type="text/css" href="${ cssURL }" />` }
        ${ js && `<script src="${ jsURL }"></script>` }
      </head>
      <body>
        ${ html || '' }
      </body>
    </html>
  `

  return getBlobURL(source, 'text/html')
}

const url = getGeneratedPageURL({
  html,
  css:styles,
  js: script
})

    if(styles && html && script) {
      previewFrame.src = url
      function resizeIFrameToFitContent( iFrame ) {

    iFrame.width  = iFrame.contentWindow.document.body.scrollWidth;
    iFrame.height = iFrame.contentWindow.document.body.scrollHeight;
}

    resizeIFrameToFitContent(previewFrame);

    }
    
      })

  }
  render() {
    return (
        <div className="h-100vh w-100">
            <iframe id="tabpreviewframe" className="w-100 h-100" title='classpreview'></iframe>
        </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onClassroomSwitch: state => dispatch(dispatchAppEnvironment(state)),
    
  };
};
export default connect(null, mapDispatchToProps)(classPreviewNewTab);
