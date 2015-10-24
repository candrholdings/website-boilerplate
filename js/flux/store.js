//jshint -W067

'use strict';

import * as todosreducers from 'todosreducers';
import {default as DevTools} from 'devtools';

var {
        Immutable,
        Redux
    } = window,
    {
        List
    } = Immutable;

const finalCreateStore = Redux.compose(
    Redux.applyMiddleware(
        window.ReduxThunk
    )(Redux.createStore),
    DevTools.instrument(),
    window.ReduxDevtools.persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
);

const rootReducer = Redux.combineReducers({
    ...todosreducers
});

export default finalCreateStore(rootReducer, {
    todos: List()
});