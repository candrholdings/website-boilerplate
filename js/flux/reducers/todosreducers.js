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
    switch (action.type) {
    case todosactions.ADD_TODO:
        return state.push(Map({
            id: Date.now(),
            text: action.todo
        }));

    case todosactions.REMOVE_TODO:
        return state.filterNot(todo => todo.get('id') === action.id);

    default:
        return state;
    }
}

export default {
    todos
};