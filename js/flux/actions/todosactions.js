'use strict';

const ACTIONS_PREFIX = 'TODO/';

export const ADD_TODO = ACTIONS_PREFIX + 'ADD_TODO';

export function addTodo(todo) {
    return {
        type: ADD_TODO,
        payload: {todo}
    }
}

export const REMOVE_TODO = ACTIONS_PREFIX + 'REMOVE_TODO';

export function removeTodo(id) {
    return {
        type: REMOVE_TODO,
        payload: {id}
    }
}