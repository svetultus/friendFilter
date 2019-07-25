import Controller from './mvc/controller';
let init = require ('../init.json');

let container = document.querySelector("#friendFilter");
let headerInfo = document.querySelector("#headerInfo");
let apiId = init.VK.apiId;
let templateFriends = document.querySelector('#templateFriends').textContent;
let resultFriends = document.querySelector('#friendsList');

const controller = new Controller(apiId, container, headerInfo, templateFriends, resultFriends);
