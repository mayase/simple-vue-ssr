import App from './app'
let { app, router, store } = App;

export default context => {
    const s = Date.now();

    // set router's location
    router.push(context.url);
    const matchedComponents = router.getMatchedComponents();

    // no matched routes
    if (!matchedComponents.length) {
        return Promise.reject({ code: '404' })
    }

    return Promise.all(matchedComponents.map(component => {
        if (component.ssrFetch) {
            return component.ssrFetch(store)
        }
    })).then(() => {
        context.initialState = store.state;
        return app
    })
}