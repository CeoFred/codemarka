import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet'
import { dispatchAppEnvironment } from '../../store/actions/app';

export class classPreviewNewTab extends Component {

  constructor(props){
    super(props)
    this.state ={
      cssCDN : [],
      jsCDN : []
    }
  }
  componentWillMount() {
    this.props.onClassroomSwitch('classroom');
  }

  componentDidMount() {

  const { match: { params }  } = this.props;
  const classroomKid = params.classroomKid;

    const host = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test' ? process.env.REACT_APP_REMOTE_API_URL : process.env.REACT_APP_LOCAL_API_URL
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'Application/json')

    const handlePreviewFileFetch = () => {

    const url = `${ host }classroom/preview/${ classroomKid }`;
        
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
    let styles, html , script,externalCDN_CSS,externalCDN_JS;
      if(files.status){
            styles = files.data.css.content
            html = files.data.html.content
            script = files.data.js.content
            externalCDN_CSS = files.data.css.externalCDN;
            externalCDN_JS = files.data.js.externalCDN
            this.setState({cssCDN:externalCDN_CSS, jsCDN: files.data.js.externalCDN})

            document.title =   `${ files.data.name } - Preview on codemarka`;

      } else {
        styles = '';
        html = 'Not Found!';
        script = '';
      }

    const getGeneratedPageURL = ({ html, css, js,CSS_CDN,JS_CDN }) => {
  const getBlobURL = (code, type) => {
    const blob = new Blob([ code ], { type })
    return URL.createObjectURL(blob)
  }

  const cssURL = getBlobURL(css, 'text/css')
  const jsURL = getBlobURL(js, 'text/javascript')
  let extercssCDN = '', externaljsCDN ='';
      CSS_CDN.forEach(cdn => {
       extercssCDN += `<link href=${cdn.url} rel="stylesheet"/> \n` 
      })
      JS_CDN.forEach(cdn => {
        externaljsCDN += `<script src=${cdn.url}></script> \n` 
       })
  
  const source = `
  <!DOCTYPE html>
    <html lang="en">
      <head>      
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    ${ extercssCDN }

        ${ css && `<link rel="stylesheet" type="text/css" href="${ cssURL }" />` }
      </head>
      <body>
        ${ html || '' }
      </body>
      ${ externaljsCDN }
      ${ js && `<script src="${ jsURL }"></script>` }
    </html>
  `

  return getBlobURL(source, 'text/html')
}

const url = getGeneratedPageURL({
  html,
  css:styles,
  js: script,
  CSS_CDN: externalCDN_CSS,
  JS_CDN: externalCDN_JS
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
          <Helmet>
            {this.state.cssCDN.map(cdn => (<link href={cdn.url} rel="stylesheet"  crossorigin="anonymous" />))}
            {this.state.jsCDN.map(cdn => (<script src={cdn.url} key={cdn.id}/>))}
          </Helmet>
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
