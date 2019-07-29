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

    getUserData () {
        return new Promise(function(resolve, reject) {
            VK.api('users.get', {v:'5.101'}, function(response) {
                if (response.error) {
                    reject(new Error(response.error.error_msg));
                } else {
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