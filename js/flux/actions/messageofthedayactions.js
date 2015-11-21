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

// export const FETCH_MESSAGE_OF_THE_DAY_PENDING = 'FETCH_MESSAGE_OF_THE_DAY_PENDING';
// export const FETCH_MESSAGE_OF_THE_DAY_FULFILLED = 'FETCH_MESSAGE_OF_THE_DAY_FULFILLED';
// export const FETCH_MESSAGE_OF_THE_DAY_REJECTED = 'FETCH_MESSAGE_OF_THE_DAY_PENDING';

// function fetchMessageOfTheDayPending() {
//     return { type: FETCH_MESSAGE_OF_THE_DAY_PENDING };
// }

// function fetchMessageOfTheDayFulfilled(payload) {
//     return { type: FETCH_MESSAGE_OF_THE_DAY_FULFILLED, payload };
// }

// function fetchMessageOfTheDayRejected(err) {
//     return { type: FETCH_MESSAGE_OF_THE_DAY_REJECTED, payload: err, error: true };
// }

// export function fetchMessageOfTheDay() {
//     return function (dispatch) {
//         dispatch(fetchMessageOfTheDayPending());

//         window.fetch('...')
//             .then(res => res.text())
//             .then(text => dispatch(fetchMessageOfTheDayFulfilled(text)))
//             .catch(err => {
//                 dispatch(fetchMessageOfTheDayRejected(err);
//                 throw err;
//             });
//     };
// }
