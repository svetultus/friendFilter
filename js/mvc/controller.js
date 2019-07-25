const VKAPI = require('../modules/api.vk');

export default class {
    constructor(apiId, headerInfo) {
        let VKobj = new VKAPI;
        VKobj.init(apiId).then (()=>{
            VKobj.getUserData(headerInfo);
        });
    }
}