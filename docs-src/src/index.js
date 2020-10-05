import ReactDOM from 'react-dom';

import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';

import 'fontsource-roboto';
import CssBaseline from '@material-ui/core/CssBaseline';

import Live from './components/Live';

const theme = createMuiTheme({palette: {type: 'dark'}});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Live />
  </ThemeProvider>,

  document.getElementById('app'),
);
