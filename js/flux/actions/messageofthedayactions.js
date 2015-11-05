'use strict';

var {fetch} = window;

export const FETCH_MESSAGE_OF_THE_DAY = 'FETCH_MESSAGE_OF_THE_DAY';

export function fetchMessageOfTheDay() {
    return {
        type: FETCH_MESSAGE_OF_THE_DAY,
        payload: {
            promise: fetch('json/samples.json').then(res => {
                assertResponseStatus(res, 2);

                return res.text();
            })
        }
    };
}

function assertResponseStatus(res, expectedStatus) {
    var {status} = res;

    if (expectedStatus < 10 ? ~~(status / 100) !== expectedStatus : status !== expectedStatus) {
        throw new Error(`Server returned ${status}`);
    }
}
