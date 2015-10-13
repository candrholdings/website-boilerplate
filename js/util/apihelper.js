'use strict';

var MAX_REDIRECT = 5;

export var request = function request(method, url, body, maxRedirect, callback) {
    var options = {
            cache: false,
            dataType: 'json',
            type: method,
            url: url
        };

    if (method !== 'GET' && body) {
        options.contentType = 'application/json';
        options.data = JSON.stringify(body);
    }

    try {
        $.ajax(options).then(function (res, textStatus, jqXHR) {
            if (~~(jqXHR.status / 100) === 3) {
                if (--maxRedirect > 0) {
                    apiHelper.request('GET', jqXHR.getResponseHeader('location'), null, maxRedirect, callback);
                } else {
                    callback.call(jqXHR, new Error('too many redirects'));
                }
            } else {
                callback.call(jqXHR, null, res);
            }
        }, function (jqXHR, textStatus, errorThrown) {
            callback.call(jqXHR, errorThrown || new Error(textStatus || jqXHR.status));
        });
    } catch (ex) {
        callback(ex);
    }
};

export var get = function get(area, action, callback) {
    apiHelper.request('GET', getUrl(area, action), null, MAX_REDIRECT, callback);
};

export var post = function post(area, action, body, callback) {
    apiHelper.request('POST', getUrl(area, action), body, MAX_REDIRECT, callback);
};

export var put = function put(area, action, body, callback) {
    apiHelper.request('PUT', getUrl(area, action), body, MAX_REDIRECT, callback);
};

export var del = function del(area, action, body, callback) {
    apiHelper.request('DELETE', getUrl(area, action), body, MAX_REDIRECT, callback);
};

export var uploadRaw = function uploadRaw(area, action, arrayBuffer, callback) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function (evt) {
        switch (xhr.readyState) {
        case 1:
            xhr.send(arrayBuffer);
            break;

        case 4:
            if (~~(xhr.status / 100) === 2) {
                callback();
            } else {
                callback(new Error('server returned ' + xhr.status));
            }

            break;
        }
    };

    xhr.open('POST', getUrl(area, action));
};

export var upload = function upload(area, action, files, callback) {
    var formData = new FormData(),
        xhr = new XMLHttpRequest();

    Object.getOwnPropertyNames(files).forEach(function (name) {
        formData.append(name, files[name]);
    });

    xhr.onreadystatechange = function (evt) {
        switch (xhr.readyState) {
        case 1:
            xhr.send(formData);
            break;

        case 4:
            if (~~(xhr.status / 100) === 2) {
                callback();
            } else {
                callback(new Error('server returned ' + xhr.status));
            }

            break;
        }
    };

    xhr.open('POST', getUrl(area, action));
};

function getUrl(area, action) {
    return ['/api', area, action].join('/');
}
