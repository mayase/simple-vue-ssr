import App from './app.js'
let {app, store} = App;


if (window.__INITIAL_STATE__) store.replaceState(window.__INITIAL_STATE__);

app.$mount('#app');
