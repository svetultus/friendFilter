const VKAPI = require('../modules/api.vk');

export default class {
    constructor(apiId, container, headerInfo, templateFriends, resultFriends, friendFilterListClass, zoneLeft, zoneRight) {
        this.container = container;
        this.zoneLeft = zoneLeft;
        this.zoneRight = zoneRight;
        this.apiId = apiId;
        this.headerInfo = headerInfo;
        this.templateFriends = templateFriends;
        this.resultFriends = resultFriends;
        this.friendFilterListClass = friendFilterListClass;

        this.dragStartHandler = this.dragStartHandler.bind(this);
        this.dragEndHandler = this.dragEndHandler.bind(this);
        this.dragOverHandler = this.dragOverHandler.bind(this);
        this.dropHandler = this.dropHandler.bind(this);
        this.getZone = this.getZone.bind(this);
        this.getItem = this.getItem.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
        this.moveItem = this.moveItem.bind(this);

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

        this.container.addEventListener('dragstart', this.dragStartHandler, true);
        this.container.addEventListener('dragend', this.dragEndHandler, true);
        this.container.addEventListener('drop', this.dropHandler, true);
        this.container.addEventListener('dragover', this.dragOverHandler, true);
        this.container.addEventListener('click', this.clickHandler, true)
    }

    renderFriends() {
        let friends = this.friends.slice(0, 5);
        let render = Handlebars.compile(this.templateFriends);
        let html = render(friends);
        this.resultFriends.innerHTML = html;
    }
    getZone (elem) {
        return elem.closest('.friends-filter__inner');
    }
    getItem (elem) {
        return elem.closest('.friends-filter__list-elem');
    }

    dragStartHandler(e) {
        // console.log(e.type);
        // console.log(e);
        this.draggingItem = e.target;
        this.startDragArea = this.getZone(e.target);
        // console.log(this.draggingItem);
        // console.log(this.startDragArea);

    }
    dragEndHandler(e) {
        // console.log(e.type);
        //console.log(e);
    }
    dropHandler(e) {
        //console.log(e.target);
        let zone = this.getZone (e.target);
        if (zone && this.startDragArea !== zone) {
            this.moveItem (this.draggingItem, zone);
        }
    }
    moveItem (item, zone) {
        let btn = item.querySelector('.' + this.friendFilterListClass + '-btn');
        let ul = zone.querySelector('.' + this.friendFilterListClass);

        btn.classList.toggle(this.friendFilterListClass + '-btn_add');
        btn.classList.toggle(this.friendFilterListClass + '-btn_remove');
        ul.appendChild(item);
    }

    dragOverHandler(e) {
        e.preventDefault();
        //console.log(e.target);
    }
    clickHandler (e) {
        let zone,
            item = this.getItem(e.target);

        if (!item || !e.target.classList.contains('friends-filter__list-btn')) return; 

        if (e.target.classList.contains('friends-filter__list-btn_add')) {
            console.log('добавить');
            zone = this.zoneRight;
            
        } else if (e.target.classList.contains('friends-filter__list-btn_remove')) {
            console.log('удалить');
            zone = this.zoneLeft;
        }
        this.moveItem (item, zone);
    }
}