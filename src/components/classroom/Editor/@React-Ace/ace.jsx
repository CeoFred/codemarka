/* eslint-disable no-undef */
import { Range } from 'ace-builds';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import {
  debounce,
  editorEvents,
  editorOptions,
  getAceInstance
} from './editorOptions';
import './style.css'

const isEqual = require('lodash.isequal')

const ace = getAceInstance();
ace.config.set(
    'basePath',
    'https://cdn.jsdelivr.net/npm/ace-builds@1.4.3/src-noconflict/'
)

require('ace-builds/src-noconflict/ext-language_tools')

/**
 * See https://github.com/ajaxorg/ace/wiki/Configuring-Ace
 */

// export interface IAceEditorProps {
//   name?: string;
//   style?: React.CSSProperties;
//   /** For available modes see https://github.com/thlorenz/brace/tree/master/mode */
//   mode?: string | object;
//   /** For available themes see https://github.com/thlorenz/brace/tree/master/theme */
//   theme?: string;
//   height?: string;
//   width?: string;
//   className?: string;
//   fontSize?: number | string;
//   showGutter?: boolean;
//   showPrintMargin?: boolean;
//   highlightActiveLine?: boolean;
//   focus?: boolean;
//   cursorStart?: number;
//   wrapEnabled?: boolean;
//   readOnly?: boolean;
//   minLines?: number;
//   maxLines?: number;
//   navigateToFileEnd?: boolean;
//   debounceChangePeriod?: number;
//   enableBasicAutocompletion?: boolean | string[];
//   enableLiveAutocompletion?: boolean | string[];
//   tabSize?: number;
//   value?: string;
//   placeholder?: string;
//   defaultValue?: string;
//   scrollMargin?: number[];
//   enableSnippets?: boolean;
//   onSelectionChange?: (value, event?) => void;
//   onCursorChange?: (value, event?) => void;
//   onInput?: (event?) => void;
//   onLoad?: (editor: Ace.Editor) => void;
//   onValidate?: (annotations: Ace.Annotation[]) => void;
//   onBeforeLoad?: (ace: typeof AceBuilds) => void;
//   onChange?: (value: string, event?) => void;
//   onSelection?: (selectedText: string, event?) => void;
//   onCopy?: (value: string) => void;
//   onPaste?: (value: string) => void;
//   onFocus?: (event, editor?: Ace.Editor) => void;
//   onBlur?: (event, editor?: Ace.Editor) => void;
//   onScroll?: (editor: IEditorProps) => void;
//   editorProps?: IEditorProps;
//   setOptions?: IAceOptions;
//   keyboardHandler?: string;
//   commands?: ICommand[];
//   annotations?: Ace.Annotation[];
//   markers?: IMarker[];
// }

export default class ReactAce extends React.Component {
    propTypes = {
        mode: PropTypes.string,
        focus: PropTypes.bool,
        theme: PropTypes.string,
        name: PropTypes.string,
        className: PropTypes.string,
        height: PropTypes.string,
        width: PropTypes.string,
        fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        showGutter: PropTypes.bool,
        onChange: PropTypes.func,
        onCopy: PropTypes.func,
        onPaste: PropTypes.func,
        onFocus: PropTypes.func,
        onInput: PropTypes.func,
        onBlur: PropTypes.func,
        onScroll: PropTypes.func,
        value: PropTypes.string,
        defaultValue: PropTypes.string,
        onLoad: PropTypes.func,
        onSelectionChange: PropTypes.func,
        onCursorChange: PropTypes.func,
        onBeforeLoad: PropTypes.func,
        onValidate: PropTypes.func,
        minLines: PropTypes.number,
        maxLines: PropTypes.number,
        readOnly: PropTypes.bool,
        highlightActiveLine: PropTypes.bool,
        tabSize: PropTypes.number,
        showPrintMargin: PropTypes.bool,
        cursorStart: PropTypes.number,
        debounceChangePeriod: PropTypes.number,
        editorProps: PropTypes.object,
        setOptions: PropTypes.object,
        style: PropTypes.object,
        scrollMargin: PropTypes.array,
        annotations: PropTypes.array,
        markers: PropTypes.array,
        keyboardHandler: PropTypes.string,
        wrapEnabled: PropTypes.bool,
        enableSnippets: PropTypes.bool,
        enableBasicAutocompletion: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.array,
        ]),
        enableLiveAutocompletion: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.array,
        ]),
        navigateToFileEnd: PropTypes.bool,
        commands: PropTypes.array,
        placeholder: PropTypes.string,
    }
    defaultProps = {
        name: 'ace-editor',
        focus: false,
        mode: '',
        theme: '',
        height: '500px',
        width: '500px',
        fontSize: 12,
        enableSnippets: false,
        showGutter: true,
        onChange: null,
        onPaste: null,
        onLoad: null,
        onScroll: null,
        minLines: null,
        maxLines: null,
        readOnly: false,
        highlightActiveLine: true,
        showPrintMargin: true,
        tabSize: 4,
        cursorStart: 1,
        editorProps: {},
        style: {},
        scrollMargin: [0, 0, 0, 0],
        setOptions: {},
        wrapEnabled: false,
        enableBasicAutocompletion: false,
        enableLiveAutocompletion: false,
        placeholder: null,
        navigateToFileEnd: true,
    }
    constructor(props) {
        super(props)
        editorEvents.forEach((method) => {
            this[method] = this[method].bind(this)
        })
        this.debounce = debounce
        this.isInShadow = this.isInShadow;
    }

    componentDidMount() {
        const {
            className,
            onBeforeLoad,
            onValidate,
            mode,
            focus,
            theme,
            fontSize,
            value,
            defaultValue,
            showGutter,
            wrapEnabled,
            showPrintMargin,
            scrollMargin = [0, 0, 0, 0],
            keyboardHandler,
            onLoad,
            commands,
            annotations,
            markers,
            placeholder,
        } = this.props

        this.editor = ace.edit(this.refEditor)

        if (onBeforeLoad) {
            onBeforeLoad(ace)
        }

        const editorProps = Object.keys(this.props.editorProps)
        for (let i = 0; i < editorProps.length; i++) {
            this.editor[editorProps[i]] = this.props.editorProps[editorProps[i]]
        }
        if (this.props.debounceChangePeriod) {
            this.onChange = this.debounce(
                this.onChange,
                this.props.debounceChangePeriod
            )
        }
        this.editor.renderer.setScrollMargin(
            scrollMargin[0],
            scrollMargin[1],
            scrollMargin[2],
            scrollMargin[3]
        )
        if (this.isInShadow(this.refEditor)) {
            this.editor.renderer.attachToShadowRoot()
        }
        this.editor.getSession().setMode(`ace/mode/${ mode }`)
        mode && require(`ace-builds/src-noconflict/mode-${ mode }`);

        this.editor.setTheme(`ace/theme/${ theme }`)
        theme && require(`ace-builds/src-noconflict/theme-${ theme }`)
        this.editor.setFontSize(
            typeof fontSize === 'number' ? `${ fontSize }px` : fontSize
        )
        this.editor
            .getSession()
            .setValue(!defaultValue ? value || '' : defaultValue)

        if (this.props.navigateToFileEnd) {
            this.editor.navigateFileEnd()
        }
        this.editor.renderer.setShowGutter(showGutter)
        this.editor.getSession().setUseWrapMode(wrapEnabled)
        this.editor.setShowPrintMargin(showPrintMargin)
        this.editor.on('focus', this.onFocus)
        this.editor.on('blur', this.onBlur)
        this.editor.on('copy', this.onCopy)
        this.editor.on('paste', this.onPaste)
        this.editor.on('change', this.onChange)
        this.editor.on('input', this.onInput)
        if (placeholder) {
            this.updatePlaceholder()
        }
        this.editor
            .getSession()
            .selection.on('changeSelection', this.onSelectionChange)
        this.editor
            .getSession()
            .selection.on('changeCursor', this.onCursorChange)
        if (onValidate) {
            // @ts-ignore types don't include
            this.editor.getSession().on('changeAnnotation', () => {
                // tslint:disable-next-line:no-shadowed-variable
                const annotations = this.editor.getSession().getAnnotations()
                this.props.onValidate(annotations)
            })
        }
        this.editor.session.on('changeScrollTop', this.onScroll)
        this.editor.getSession().setAnnotations(annotations || [])
        if (markers && markers.length > 0) {
            this.handleMarkers(markers)
        }

        // get a list of possible options to avoid 'misspelled option errors'
        const availableOptions = this.editor.$options
        editorOptions.forEach((option) => {
            if (availableOptions.hasOwnProperty(option)) {
                // @ts-ignore
                this.editor.setOption(option, this.props[option])
            } else if (this.props[option]) {
                console.warn(
                    `ReactAce: editor option ${ option } was activated but not found. Did you need to import a related tool or did you possibly mispell the option?`
                )
            }
        })

        this.handleOptions(this.props)

        if (Array.isArray(commands)) {
            commands.forEach((command) => {
                if (typeof command.exec === 'string') {
                    this.editor.commands.bindKey(command.bindKey, command.exec)
                } else {
                    this.editor.commands.addCommand(command)
                }
            })
        }

        if (keyboardHandler) {
            this.editor.setKeyboardHandler('ace/keyboard/' + keyboardHandler)
        }

        if (className) {
            this.refEditor.className += ' ' + className
        }

        if (onLoad) {
            onLoad(this.editor)
        }

        this.editor.resize()

        if (focus) {
            this.editor.focus()
        }
    }

    componentDidUpdate(prevProps) {
        const oldProps = prevProps
        const nextProps = this.props

        for (let i = 0; i < editorOptions.length; i++) {
            const option = editorOptions[i]
            if (nextProps[option] !== oldProps[option]) {
                // @ts-ignore
                this.editor.setOption(option, nextProps[option])
            }
        }

        if (nextProps.className !== oldProps.className) {
            const appliedClasses = this.refEditor.className
            const appliedClassesArray = appliedClasses.trim().split(' ')
            const oldClassesArray = oldProps.className.trim().split(' ')
            oldClassesArray.forEach((oldClass) => {
                const index = appliedClassesArray.indexOf(oldClass)
                appliedClassesArray.splice(index, 1)
            })
            this.refEditor.className =
                ' ' + nextProps.className + ' ' + appliedClassesArray.join(' ')
        }

        // First process editor value, as it may create a new session (see issue #300)
        if (
            this.editor &&
            nextProps.value != null &&
            this.editor.getValue() !== nextProps.value
        ) {
            // editor.setValue is a synchronous function call, change event is emitted before setValue return.
            this.silent = true
            const pos = this.editor.session.selection.toJSON()
            this.editor.setValue(nextProps.value, nextProps.cursorStart)
            this.editor.session.selection.fromJSON(pos)
            this.silent = false
        }

        if (nextProps.placeholder !== oldProps.placeholder) {
            this.updatePlaceholder()
        }
        if (nextProps.mode !== oldProps.mode) {
            this.editor.getSession().setMode('ace/mode/' + nextProps.mode)
        }
        if (nextProps.theme !== oldProps.theme) {
            this.editor.setTheme('ace/theme/' + nextProps.theme)
        }
        if (nextProps.keyboardHandler !== oldProps.keyboardHandler) {
            if (nextProps.keyboardHandler) {
                this.editor.setKeyboardHandler(
                    'ace/keyboard/' + nextProps.keyboardHandler
                )
            } else {
                this.editor.setKeyboardHandler(null)
            }
        }
        if (nextProps.fontSize !== oldProps.fontSize) {
            this.editor.setFontSize(
                typeof nextProps.fontSize === 'number'
                    ? `${ nextProps.fontSize }px`
                    : nextProps.fontSize
            )
        }
        if (nextProps.wrapEnabled !== oldProps.wrapEnabled) {
            this.editor.getSession().setUseWrapMode(nextProps.wrapEnabled)
        }
        if (nextProps.showPrintMargin !== oldProps.showPrintMargin) {
            this.editor.setShowPrintMargin(nextProps.showPrintMargin)
        }
        if (nextProps.showGutter !== oldProps.showGutter) {
            this.editor.renderer.setShowGutter(nextProps.showGutter)
        }
        if (!isEqual(nextProps.setOptions, oldProps.setOptions)) {
            this.handleOptions(nextProps)
        }
        if (!isEqual(nextProps.annotations, oldProps.annotations)) {
            this.editor.getSession().setAnnotations(nextProps.annotations || [])
        }
        if (
            !isEqual(nextProps.markers, oldProps.markers) &&
            Array.isArray(nextProps.markers)
        ) {
            this.handleMarkers(nextProps.markers)
        }

        // this doesn't look like it works at all....
        if (!isEqual(nextProps.scrollMargin, oldProps.scrollMargin)) {
            this.handleScrollMargins(nextProps.scrollMargin)
        }

        if (
            prevProps.height !== this.props.height ||
            prevProps.width !== this.props.width
        ) {
            this.editor.resize()
        }
        if (this.props.focus && !prevProps.focus) {
            this.editor.focus()
        }
    }

    handleScrollMargins(margins = [0, 0, 0, 0]) {
        this.editor.renderer.setScrollMargin(
            margins[0],
            margins[1],
            margins[2],
            margins[3]
        )
    }

    componentWillUnmount() {
        this.editor.destroy()
        this.editor = null
    }

    isInShadow(node) {
        let parent = node && node.parentNode
        while (parent) {
            if (parent.toString() === '[object ShadowRoot]') {
                return true
            }
            parent = parent.parentNode
        }
        return false
    }

    onChange(event) {
        if (this.props.onChange && !this.silent) {
            const value = this.editor.getValue()
            this.props.onChange(value, event)
        }
    }

    onSelectionChange(event) {
        if (this.props.onSelectionChange) {
            const value = this.editor.getSelection()
            this.props.onSelectionChange(value, event)
        }
    }
    onCursorChange(event) {
        if (this.props.onCursorChange) {
            const value = this.editor.getSelection()
            this.props.onCursorChange(value, event)
        }
    }
    onInput(event) {
        if (this.props.onInput) {
            this.props.onInput(event)
        }
        if (this.props.placeholder) {
            this.updatePlaceholder()
        }
    }
    onFocus(event) {
        if (this.props.onFocus) {
            this.props.onFocus(event, this.editor)
        }
    }

    onBlur(event) {
        if (this.props.onBlur) {
            this.props.onBlur(event, this.editor)
        }
    }

    onCopy({ text }) {
        if (this.props.onCopy) {
            this.props.onCopy(text)
        }
    }

    onPaste({ text }) {
        if (this.props.onPaste) {
            this.props.onPaste(text)
        }
    }

    onScroll() {
        if (this.props.onScroll) {
            this.props.onScroll(this.editor)
        }
    }

    handleOptions(props) {
        const setOptions = Object.keys(props.setOptions)
        for (let y = 0; y < setOptions.length; y++) {
            // @ts-ignore
            this.editor.setOption(
                setOptions[y],
                props.setOptions[setOptions[y]]
            )
        }
    }

    handleMarkers(markers) {
        // remove foreground markers
        let currentMarkers = this.editor.getSession().getMarkers(true)
        for (const i in currentMarkers) {
            if (currentMarkers.hasOwnProperty(i)) {
                this.editor.getSession().removeMarker(currentMarkers[i].id)
            }
        }
        // remove background markers except active line marker and selected word marker
        currentMarkers = this.editor.getSession().getMarkers(false)
        for (const i in currentMarkers) {
            if (
                currentMarkers.hasOwnProperty(i) &&
                currentMarkers[i].clazz !== 'ace_active-line' &&
                currentMarkers[i].clazz !== 'ace_selected-word'
            ) {
                this.editor.getSession().removeMarker(currentMarkers[i].id)
            }
        }
        // add new markers
        markers.forEach(
            ({
                startRow,
                startCol,
                endRow,
                endCol,
                className,
                type,
                inFront = false,
            }) => {
                const range = new Range(startRow, startCol, endRow, endCol)
                this.editor
                    .getSession()
                    .addMarker(range, className, type, inFront)
            }
        )
    }

    updatePlaceholder() {
        // Adapted from https://stackoverflow.com/questions/26695708/how-can-i-add-placeholder-text-when-the-editor-is-empty

        const editor = this.editor
        const { placeholder } = this.props

        const showPlaceholder = !editor.session.getValue().length
        let node = editor.renderer.placeholderNode

        if (!showPlaceholder && node) {
            editor.renderer.scroller.removeChild(
                editor.renderer.placeholderNode
            )
            editor.renderer.placeholderNode = null
        } else if (showPlaceholder && !node) {
            node = editor.renderer.placeholderNode = document.createElement(
                'div'
            )
            node.textContent = placeholder || ''
            node.className = 'ace_comment ace_placeholder'
            node.style.padding = '0 9px'
            node.style.position = 'absolute'
            node.style.zIndex = '3'
            editor.renderer.scroller.appendChild(node)
        } else if (showPlaceholder && node) {
            node.textContent = placeholder
        }
    }

    updateRef(item) {
        this.refEditor = item
    }

    render() {
        const { name, width, height, style } = this.props
        const divStyle = { width, height, ...style }
        return <div ref={ this.updateRef } id={ name } style={ divStyle } />
    }
}
