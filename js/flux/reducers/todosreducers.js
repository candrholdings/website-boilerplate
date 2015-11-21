'use strict';

import * as todosactions from 'flux/actions/todosactions';

var {
        Immutable,
        Redux
    } = window,
    {
        List,
        Map
    } = Immutable;

export default function todos(state = List(), action) {
    var {payload} = action;

    switch (action.type) {
    case todosactions.ADD_TODO:
        return state.push(Map({
            id: Date.now(),
            text: payload.todo
        }));

    case todosactions.REMOVE_TODO:
        return state.filterNot(todo => todo.get('id') === payload.id);

    default:
        return state;
    }
}
