import * as Babel from '@babel/standalone';

import txPug from 'babel-plugin-transform-react-pug';
import txClasses from 'babel-plugin-transform-jsx-classname-components';

import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/pug/pug';

import prettier from 'prettier/standalone';
import babelParser from 'prettier/parser-babel';

import * as UI from '@material-ui/core';
import * as Lab from '@material-ui/lab';

import './Live.sass';

Babel.registerPlugin('tx-pug', txPug);
Babel.registerPlugin('tx-classes', txClasses);

const babelConfig = {
  plugins: ['syntax-jsx', 'tx-pug', 'tx-classes'],
};

const codemirrorConfig = {
  theme: 'monokai',
  lineNumbers: true,
  mode: 'pug',
  tabSize: 2,
  indentWithTabs: false,
  smartINdent: true,
  electricChars: true,
  lineWrapping: false,
  scrollbarStyle: null,
  extraKeys: {
    Tab: cm => {
      if (cm.getMode().name === 'null') {
        cm.execCommand('insertTab');
      } else {
        if (cm.somethingSelected()) {
          cm.execCommand('indentMore');
        } else {
          cm.execCommand('insertSoftTab');
        }
      }
    },
    'Shift-Tab': cm => cm.execCommand('indentLess'),
  },
};

const inputConfig = {...codemirrorConfig, autofocus: true};
const outputConfig = {...codemirrorConfig, readOnly: true, mode: 'jsx'};

export default () => {
  const source = React.useRef();
  const output = React.useRef();

  const [error, setError] = React.useState(null);

  const onSourceChange = input => {
    if (!output) return;

    try {
      const code = Babel.transform(input, babelConfig).code;
      const prettyCode = prettier.format(code, {
        parser: 'babel',
        plugins: [babelParser],
      });
      output.current.codeMirror.setValue(prettyCode);
      setError(null);
    } catch (e) {
      setError(e);
    }
  };

  return pug`
    #live
      UI.Grid(container spacing=3)
        UI.Grid(item xs=12 sm=6)
          h1 transform-react-pug
          UI.Paper.editor(xs=12)
            CodeMirror(ref=source onChange=onSourceChange options=inputConfig)

        UI.Grid(item xs=12 sm=6)
          h1 react-jsx
          UI.Paper.editor(xs=12)
            CodeMirror(ref=output options=outputConfig)

    UI.Snackbar(open=!!error autoHideDuration=6000)
      if error
        Lab.Alert(severity='warning')= error.toString()
  `;
};
