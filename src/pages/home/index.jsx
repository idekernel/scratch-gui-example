import 'babel-polyfill';
import React from 'react';
import reducers from './reducers';
import { Provider } from 'react-redux';
import App from './container';
import configureStore from 'client/store';
import { View, render } from 'client/layout';
import saga from './saga';

/**
 * custom view template
 *
 * @export
 * @class View
 * @extends {React.Component}
 */
class Home extends View {
  static defaultProps = {
    title: 'Login',
    asset: 'login',
  };

  static getStore() {
    const store = configureStore(reducers, saga, {
      username: {
        value: 'beidou',
      },
      password: {
        value: 'admin',
      },
      message: {
        error: false,
        message: '',
      },
    });

    return store;
  }

  static getPartial({ store }) {
    const html = (
      <Provider store={store}>
        <App />
      </Provider>
    );
    return { html };
  }
}

render(Home, reducers, saga);
