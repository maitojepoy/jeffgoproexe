import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import IntlProviderContainer from 'locale/IntlProviderContainer';
import App from 'ui/App';
import reportWebVitals from './reportWebVitals';

import store from 'state/store';

ReactDOM.render(
  <Provider store={store}>
    <IntlProviderContainer>
      <Router>
        <App />
      </Router>
    </IntlProviderContainer>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
