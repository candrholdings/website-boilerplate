//jshint -W067

'use strict';

import * as todosreducers from 'todosreducers';
import {default as messageOfTheDay} from 'messageofthedayreducer';
import {default as DevTools} from 'devtools';
import {default as promiseMiddleware} from 'ReduxPromiseMiddleware';

var {
        Immutable,
        Redux
    } = window,
    {
        List
    } = Immutable;

const finalCreateStore = Redux.applyMiddleware(promiseMiddleware(), window.ReduxThunk)(Redux.compose(
    DevTools.instrument(),
    window.ReduxDevTools.persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(Redux.createStore));

const rootReducer = Redux.combineReducers({
    ...todosreducers,
    messageOfTheDay
});

export default finalCreateStore(rootReducer, {
    todos: List(),
    messageOfTheDay: ''
});
