import Controller from './mvc/controller';
let init = require ('../init.json');

let headerInfo = document.querySelector("#headerInfo");
let apiId = init.VK.apiId;

const controller = new Controller(apiId, headerInfo);