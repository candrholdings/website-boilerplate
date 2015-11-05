'use strict';

import * as messageofthedayactions from 'messageofthedayactions';

const FETCH_MESSAGE_OF_THE_DAY_PENDING = messageofthedayactions.FETCH_MESSAGE_OF_THE_DAY + '_PENDING';
const FETCH_MESSAGE_OF_THE_DAY_FULFILLED = messageofthedayactions.FETCH_MESSAGE_OF_THE_DAY + '_FULFILLED';
const FETCH_MESSAGE_OF_THE_DAY_REJECTED = messageofthedayactions.FETCH_MESSAGE_OF_THE_DAY + '_REJECTED';

export default function messageOfTheDay(state = 0, action) {
    switch (action.type) {
    case FETCH_MESSAGE_OF_THE_DAY_PENDING:
        return '<Loading message of the day>';

    case FETCH_MESSAGE_OF_THE_DAY_FULFILLED:
        return action.payload;

    case FETCH_MESSAGE_OF_THE_DAY_REJECTED:
        return '<Failed to load message of the day>';

    default:
        return state;
    }
}
