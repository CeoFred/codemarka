/** @format */

import React, { useRef, useState, useEffect, useLayoutEffect } from 'react'
import AceEditor from './@React-Ace/index'
import { connect } from 'react-redux'

import { Range } from 'ace-builds'
import PropTypes from 'prop-types'

import * as util from '../../../utility/shared';

import './ace.css'

EditorAce.propTypes = {
    uploadFileFromSystem: PropTypes.func.isRequired,
    showPreview: PropTypes.func.isRequired,
    classroomid: PropTypes.string.isRequired,
    uploadingState: PropTypes.bool.isRequired,
    files: PropTypes.object,
    socket: PropTypes.object,
    user: PropTypes.string.isRequired,
    readOnly: PropTypes.bool.isRequired,
    handleEditorChange: PropTypes.func,
    canEdit: PropTypes.bool
}
function EditorAce(props) {
    const editorRef = useRef()
    const socketRef = useRef()
    const editorModeRef =  useRef('javascript');

    const [editorSettings, setEditorSettings] = useState({
        mode: 'javascript',
        value: '',
        loaded: false,
        updateId: 0,
        lastupdateTimestamp: null,
        editorOptions: {
            readOnly: !props.canEdit,
        },
    })

    const [loading, setloading] = useState(false)

    const [editorAction, setEditorAction] = useState('Loading..')
    const mapMode = {
        javascript: 'js',
        css: 'css',
        html: 'html',
    }
    const [editorUpdates, setEditorUpdates] = useState('')

    useLayoutEffect(() => {
        socketRef.current = props.socket;

        socketRef.current.on('class_files', (css, html, js) => {
            // set editor state
            editorRef.current.env.document.doc.setValue(js.content);
            setEditorSettings({ ...editorSettings, value: js.content })
        });

        socketRef.current.on('class_files_updated', (data) => {

          console.log('updated ', data, editorModeRef.current);
            const EditorName = data.file
            const updatedContentForEditor = data.content
            const updatedBy = data.user
            // check preview states
            if(updatedBy === props.user && data.type === 'update') return;

            if (data.type === 'upload') {
                console.log('uploaded content')
                setEditorSettings({
                    ...editorSettings,
                    value: updatedContentForEditor,
                })
            }

            if (String(updatedContentForEditor).length <= 0){
                editorRef.current.env.document.doc.setValue('')
            }

                if (
                    String(updatedContentForEditor).trim() !==
                        String(
                            editorRef.current.env.document.doc.getValue()
                        ).trim() &&
                    EditorName === mapMode[editorModeRef.current]
                ) {
                    console.log('Content by another use')
                    const { action, start, lines } = data.deltaValue

                    if (action !== 'remove') {
                        lines.length &&
                            lines.forEach((line, index) => {
                                const range = {
                                    row: start.row + index,
                                    column: start.column,
                                }
                                const rowAvailable = editorRef.current.env.document.doc.getLength()
                                if (range.row > rowAvailable - 1) {
                                    editorRef.current.env.document.doc.insertMergedLines(
                                        range,
                                        ['', '']
                                    )
                                }
                                editorRef.current.env.document.doc.insertInLine(
                                    range,
                                    line
                                )
                            })
                    } else {
                        lines.length &&
                            lines.forEach((line, index) => {
                                const range_ = new Range(
                                    data.deltaValue.start.row + index,
                                    data.deltaValue.start.column,
                                    data.deltaValue.end.row + index,
                                    data.deltaValue.end.column
                                )
                                editorRef.current.env.document.doc.remove(
                                    range_,
                                    line
                                )
                            })
                    }
                    if (
                        editorRef.current.env.document.doc.getValue().trim() !==
                        updatedContentForEditor.trim()
                    ) {
                        editorRef.current.env.document.doc.setValue(
                            updatedContentForEditor
                        )
                    }
                } else if (
                    String(updatedContentForEditor).trim() !==
                        String(editorSettings.value).trim() &&
                    EditorName !== editorModeRef.current
                ) {
                    console.log(EditorName, mapMode[editorSettings.mode])
                    setEditorUpdates(EditorName)
                }
        })

    }, [])

    const onEditorLoad = (editor) => {
        editorRef.current = editor
        setloading(false)
        setEditorSettings({ ...editorSettings, loaded: true })
        editor.getSession().setUseWorker(false)
    }

    const handleFileUpload = () => {
        document.getElementById('editor_file_uploader_input').click()
    }

    useEffect(() => {
        setTimeout(
            () => {
                editorSettings.loaded && setloading(props.uploadingState)

                setEditorAction('Uploading File Content..')
            },
            props.uploadingState ? 2000 : 0
        )
    }, [props.uploadingState])

    /**
     * Set new Mode (editor tab click event listener)
     */
    const setEditorMode = async (e, mode) => {
        e.preventDefault()
        await setEditorSettings({
            ...editorSettings,
            mode: mode,
            value: props.files[mapMode[mode]].content,
        })
        editorModeRef.current = mapMode[mode]
        await console.log(editorModeRef.current, mode)
        editorRef.current.env.document.doc.setValue(
            props.files[mapMode[mode]].content
        )
        await setEditorUpdates('')
    }

    /**
     * Editor Content Change handler
     * @return void
     */
    const onEditorContentChange = (content, delta) => {
        console.log(props)
        if(String(content).trim() !== String(editorSettings.value).trim()){
            if (props.canEdit) {
                props.handleEditorChange(
                    content,
                    mapMode[editorSettings.mode],
                    delta
                )
                
        setEditorSettings((s) => {
            return { ...s, value: content }
        })
            }

        }
    }

    return (
        <div className="codemarka-editor-container">
            <input
                type="file"
                id="editor_file_uploader_input"
                className="d-none"
            />
            <div className="editor-tabs">
                <div
                    onClick={ (e) => setEditorMode(e, 'html') }
                    className={ `editor-tab ${
                        editorUpdates === 'html' ? 'tab-updated ' : ''
                    } ${ editorSettings.mode === 'html' ? ' tab-active' : '' }` }>
                    <i
                        className="fab fa-html5"
                        style={ { color: '#c77d31' } }></i>{' '}
                </div>

                <div
                    onClick={ (e) => setEditorMode(e, 'css') }
                    className={ `editor-tab ${
                        editorUpdates === 'css' ? 'tab-updated ' : ''
                    } ${ editorSettings.mode === 'css' ? 'tab-active' : '' }` }>
                    <i
                        className="fab fa-css3-alt"
                        style={ {
                            color: 'cornflowerblue',
                        } }></i>
                </div>

                <div
                    onClick={ (e) => setEditorMode(e, 'javascript') }
                    className={ `editor-tab
                    ${ editorUpdates === 'js' ? 'tab-updated ' : '' }
                    ${
                        editorSettings.mode === 'javascript' ? 'tab-active' : ''
                    }` }>
                    <i
                        className="fab fa-js-square"
                        style={ { color: '#f5f555' } }></i>
                </div>

                <div className="editing-status"></div>

                <div className="editor-actions">
                    <a
                        target="_blank"
                        type="button"
                        title="Open In New Tab"
                        className="fas fa-external-link-alt"
                        href={ `/c/classroom/preview/${ props.classroomid }` }></a>
                    <span
                        title="Upload File"
                        type="button"
                        onClick={ handleFileUpload }>
                        <i className="fa fa-cloud-upload-alt"></i>{' '}
                    </span>
                    <span
                        title="Preview"
                        data-toggle="modal"
                        data-target="#modal_1"
                        type="button"
                        onClick={ props.showPreview }>
                        <i className="fa fa-play-circle"></i>
                    </span>
                </div>
            </div>

            <div className="ace-editor-container">
                <div
                    className="ace-editor-backdrop"
                    style={ { display: loading ? 'flex' : 'none' } }>
                    <div className="spinner-border text-success" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <span>{editorAction}</span>
                </div>
                <AceEditor
                    mode={ editorSettings.mode }
                    theme="dracula"
                    onChange={ onEditorContentChange }
                    editorProps={ editorSettings.editorOptions }
                    name="codemarka-deditor"
                    setOptions={ {
                        enableBasicAutocompletion: true,
                        enableSnippets: true,
                        enableLiveAutocompletion: true,
                    } }
                    onLoad={ onEditorLoad }
                    height="100%"
                    cursorStart={ 0 }
                    className="ace-codemarka"
                    focus={ true }
                    showGutter
                    readOnly={ editorSettings.editorOptions.readOnly }
                    showPrintMargin
                    showLineNumbers
                    width="100%"
                />
            </div>
        </div>
    )
}

const mapStateToProps = ({ classroom, auth }) => {
    return {
        canEdit: auth.user.accountid === classroom.owner,
    }
}
export default connect(mapStateToProps, null)(EditorAce)
