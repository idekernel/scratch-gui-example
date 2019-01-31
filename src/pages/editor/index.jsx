const React = require('react');
// const connect = require('react-redux').connect;
import {connect} from 'react-redux';
const render = require('../../lib/render.jsx');
const ConnectedLogin = require('../../components/login/connected-login.jsx');


const injectIntl = require('react-intl').injectIntl;
const GUI = require('scratch-gui');
const IntlGUI = injectIntl(GUI.default);


const renderLogin = ({onClose}) => {
    return (
        <ConnectedLogin
            key="login-dropdown-presentation"
            /* eslint-disable react/jsx-no-bind */
            onLogIn={(formData, callback) => {
                this.props.handleLogIn(formData, result => {
                    if (result.success === true) {
                        onClose();
                    }
                    callback(result);
                });
            }}
            /* eslint-ensable react/jsx-no-bind */
        />
    );
}
const Test = () => (
       
        <IntlGUI
            assetHost="https://assets.scratch.mit.edu"
            basePath="/"
            className="gui"
            renderLogin={renderLogin}
            // cloudHost={this.props.cloudHost}
            // enableCommunity={this.props.enableCommunity}
            // hasCloudPermission={this.props.isScratcher}
            // projectHost={this.props.projectHost}
            projectId={0}
        />
           
);
if (window.location.hash) {
    let pathname = window.location.pathname;
    if (pathname.substr(-1) !== '/') {
        pathname = `${pathname}/`;
    }
    if (window.location.hash === '#editor') {
        history.replaceState({}, document.title,
            `${pathname}editor${window.location.search}`);
    }
    if (window.location.hash === '#fullscreen') {
        history.replaceState({}, document.title,
            `${pathname}fullscreen${window.location.search}`);
    }
}
let guiReducers = GUI.guiReducers;
let guiInitialState = GUI.guiInitialState;
let guiMiddleware = GUI.guiMiddleware;
let initLocale = GUI.initLocale;
let localesInitialState = GUI.localesInitialState;
GUI.setAppElement(document.getElementById('app'));
let initGuiState = guiInitialState => {
    const pathname = window.location.pathname.toLowerCase();
    const parts = pathname.split('/').filter(Boolean);
    // parts[0]: 'projects'
    // parts[1]: either :id or 'editor'
    // parts[2]: undefined if no :id, otherwise either 'editor', 'fullscreen' or 'embed'
    // if (parts.indexOf('editor') === -1) {
    //     guiInitialState = GUI.initPlayer(guiInitialState);
    // }
    // if (parts.indexOf('fullscreen') !== -1) {
    //     guiInitialState = GUI.initFullScreen(guiInitialState);
    // }
    // if (parts.indexOf('embed') !== -1) {
    //     guiInitialState = GUI.initEmbedded(guiInitialState);
    // }
    return guiInitialState;
};

render(<Test />, document.getElementById('app'),
{
    ...guiReducers
},
{
    locales: initLocale(localesInitialState, window._locale),
    scratchGui: initGuiState(guiInitialState)
},
guiMiddleware
);