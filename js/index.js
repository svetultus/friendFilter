import Controller from './mvc/controller';
let init = require ('../init.json');

let container = document.querySelector("#friendsFilter"),
    zoneLeft = document.querySelector('#friendsList'),
    zoneRight = document.querySelector('#friendsListFiltered'),
    friendFilterListClass='friends-filter__list',
    headerInfo = document.querySelector("#headerInfo"),
    apiId = init.VK.apiId,
    templateFriends = document.querySelector('#templateFriends').textContent,
    resultFriends = document.querySelector('#friendsList');

const controller = new Controller(apiId, container, headerInfo, templateFriends, resultFriends, friendFilterListClass, zoneLeft, zoneRight);
