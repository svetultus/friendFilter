const VKAPI = require('../modules/api.vk');

export default class {
    constructor(apiId, container, headerInfo, templateFriends, resultFriends) {
        this.container = container;
        this.apiId = apiId;
        this.headerInfo = headerInfo;
        this.templateFriends = templateFriends;
        this.resultFriends = resultFriends;
        this.VKobj = new VKAPI;

        this.VKobj.init(this.apiId)
        .then (()=>{
            this.VKobj.getUserData(this.headerInfo);
            this.VKobj.getUserFriends().then((friends)=>{
                this.friends = friends.response.items;
                this.renderFriends();
            });
            
        })
        .catch ((e)=>{
            console.log(e.message);
        });
    }

    renderFriends() {
        let friends = this.friends.slice();
        let render = Handlebars.compile(this.templateFriends);
        let html = render(friends);
        this.resultFriends.innerHTML = html;
    }
}