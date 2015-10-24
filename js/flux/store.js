'use strict';

import * as todosreducers from 'todosreducers';

var {
        Immutable,
        Redux
    } = window,
    {
        List
    } = Immutable;

const createStoreWithMiddleware = Redux.applyMiddleware(
    window.ReduxThunk
)(Redux.createStore);

const rootReducer = Redux.combineReducers({
    ...todosreducers
});

export default createStoreWithMiddleware(rootReducer, {
    todos: List()
});