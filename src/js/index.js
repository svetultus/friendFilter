import Controller from './mvc/controller';
import '../scss/style.scss';
import '../index.html';

let init = require ('../init.json');

console.log(document.readyState);
document.onreadystatechange = function () {
    console.log(document.readyState);
    
    if (document.readyState === 'complete') {
        const options = {
            container: document.querySelector("#friendsFilter"),
            zoneLeft: document.querySelector('#friendsList'),
            zoneRight: document.querySelector('#friendsListFiltered'),
            friendFilterListClass: 'friends-filter__list',
            headerInfo: document.querySelector("#headerInfo"),
            apiId: init.VK.apiId,
            templateFriends: document.querySelector('#templateFriends').textContent,
            list1: document.querySelector('#friendsList1 .friends-filter__list'),
            list2: document.querySelector('#friendsList2 .friends-filter__list'),
            form1: document.querySelector('#friends-filter__form_1'),
            form2: document.querySelector('#friends-filter__form_2')
        }
        const controller = new Controller(options);
    }
}

