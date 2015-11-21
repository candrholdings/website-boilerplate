'use strict';

const ACTIONS_PREFIX = 'TODO/';

export const ADD_TODO = ACTIONS_PREFIX + 'ADD_TODO';

export function addTodo(id, todo) {
    return {
        type: ADD_TODO,
        payload: {id, todo}
    };
}

export const REMOVE_TODO = ACTIONS_PREFIX + 'REMOVE_TODO';

export function removeTodo(id) {
    return {
        type: REMOVE_TODO,
        payload: {id}
    };
}
