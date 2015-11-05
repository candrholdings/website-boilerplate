'use strict';

import * as todosactions from 'todosactions';

var {
        Immutable,
        Redux
    } = window,
    {
        Map
    } = Immutable;

function todos(state = 0, action) {
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

export default {
    todos
};