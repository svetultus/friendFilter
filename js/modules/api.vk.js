module.exports = class {
    constructor (apiId) {
        this.apiId = apiId;
    }

    init () {
        return new Promise (function (resolve, reject) {
            VK.init({
                apiId: 7070770
              });
            VK.Auth.login(function(response) {
                if (response.session) {
                    resolve(response);
                } else {
                    reject (new Error ("Ошибка авторизации"));
                }
            }, 2);
        });
    };

    getUserData (headerInfo) {
        return new Promise(function(resolve, reject) {
            VK.api('users.get', {v:'5.101', 'name_case': 'gen'}, function(response) {
                if (response.error) {
                    reject(new Error(response.error.error_msg));
                } else {
                    headerInfo.textContent = 'Друзья на странице'
                    + response.response[0].first_name + ' ' + response.
                    response[0].last_name;
                    resolve();
                }
                });
            })
    }

    getUserFriends () {
        return new Promise(function (resolve, reject) {
            VK.api('friends.get', {v:'5.101', fields: 'nickname, photo_50'}, 
            function (response) {
                resolve(response);
            });
        })
    }
}