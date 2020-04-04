import React,{ useState } from 'react'
import './style.css';
import HtmlTab from './htmlTab';
import CssTab from './cssTab';
import JavascriptTab from './javascriptTab';

export default function Main(props) {

    const [editorShowing, setEditorShowing] = useState(<HtmlTab />);
    const [editor,setEditor] = useState('HTML');
    const switchEditorTabs = (e) => {
        e.preventDefault();
        const editor = e.target.innerHTML;

        switch (editor) {
            case 'HTML':
                setEditorShowing(<HtmlTab {...props} />)
                break
            case 'JS':
                setEditorShowing(<JavascriptTab {...props} />)
                break
            case 'CSS':
                setEditorShowing(<CssTab {...props} />)
                break
            default:
                setEditorShowing(<HtmlTab {...props} />)
                break
        }
        setEditor(editor);
    }
  return (
      <div className="container">
          <div className="row p-0 m-0 mt-1">
              <div className="col-3">
                  <nav class="nav flex-column">
                      <a
                          class={`nav-link editor-tab-item ${editor === 'HTML' ? 'active' : ''}`}
                          onClick={switchEditorTabs}
                          href="#">
                          HTML
                      </a>
                      <a
                          class={`nav-link editor-tab-item ${editor === 'CSS' ? 'active' : ''}`}
                          onClick={switchEditorTabs}
                          href="#">
                          CSS
                      </a>
                      <a
                          class={`nav-link editor-tab-item ${editor === 'JS' ? 'active' : ''}`}
                          onClick={switchEditorTabs}
                          href="#">
                          JS
                      </a>
                  </nav>
              </div>
              <div className="col-9">{editorShowing}</div>
          </div>
      </div>
  )
}
