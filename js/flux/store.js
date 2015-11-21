//jshint -W067

'use strict';

import {default as todos} from 'flux/reducers/todosreducers';
import {default as messageOfTheDay} from 'flux/reducers/messageofthedayreducer';
import {default as DevTools} from 'flux/devtools';

var {
        Immutable,
        Redux
    } = window,
    {
        List
    } = Immutable;

const finalCreateStore = Redux.applyMiddleware(
    window.ReduxPromiseMiddleware(),
    window.ReduxThunk
)(Redux.compose(
    DevTools.instrument(),
    window.ReduxDevTools.persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(Redux.createStore));

const rootReducer = Redux.combineReducers({
    todos,
    messageOfTheDay
});

export default finalCreateStore(rootReducer, {});
