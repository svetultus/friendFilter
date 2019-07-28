const VKAPI = require('../modules/api.vk');

export default class {
    constructor(options) {
        this.container = options.container;
        this.zoneLeft = options.zoneLeft;
        this.zoneRight = options.zoneRight;
        this.apiId = options.apiId;
        this.headerInfo = options.headerInfo;
        this.templateFriends = options.templateFriends;
        this.list1 = options.list1;
        this.list2 = options.list2;
        this.form1 = options.form1;
        this.form2 = options.form2;
        this.friendFilterListClass = options.friendFilterListClass;
        // this.map[0].data = [];
        // this.map[1].data = [];
        this.map = [{
            data: [],
            html: this.list1,
            form: this.form1,
            zone: this.zoneLeft,
            btnClass: 'add'
            }, {
            data: [],
            html: this.list2,
            form: this.form2,
            zone: this.zoneRight,
            btnClass: 'remove'
        }];

        this.dragStartHandler = this.dragStartHandler.bind(this);
        this.dragEndHandler = this.dragEndHandler.bind(this);
        this.dragOverHandler = this.dragOverHandler.bind(this);
        this.dropHandler = this.dropHandler.bind(this);
        this.getZone = this.getZone.bind(this);
        this.getItem = this.getItem.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
        this.filterInputChangeHandler = this.filterInputChangeHandler.bind(this);
        //this.moveItem = this.moveItem.bind(this);
        this.moveData = this.moveData.bind(this);
        this.filterList = this.filterList.bind(this);

        this.VKobj = new VKAPI;

        this.VKobj.init(this.apiId)
        .then (()=>{
            this.VKobj.getUserData(this.headerInfo);
            this.VKobj.getUserFriends().then((friends)=>{
                // this.map[0].data = friends.response.items;
                // this.map[0].data = this.map[0].data.slice(0,5);
                this.map[0].data = friends.response.items;
                this.map[0].data = this.map[0].data.slice(0,5);
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
        this.container.addEventListener('click', this.clickHandler, true);
        this.container.addEventListener('submit', this.submitHandler, true);
        this.container.addEventListener('change', this.filterInputChangeHandler, true)
        this.container.addEventListener('keyup', this.filterInputChangeHandler, true)
    }

    renderFriends() {
        let html,
            render = Handlebars.compile(this.templateFriends);
        this.map.forEach((item, index)=> {
            html = render({friends: item.data, btnClass: item.btnClass});
            item.html.innerHTML = html;
        })
        // html = render({friends: this.map[0].data, btnClass: 'add'});
        // this.list1.innerHTML = html;
        // html = render({friends: this.map[1].data, btnClass: 'remove'});
        // this.list2.innerHTML = html;

    }

    getZone (elem) {
        return elem.closest('.friends-filter__inner');
    }

    getItem (elem) {
        return elem.closest('.friends-filter__list-elem');
    }

    moveData (id, e) {
        let itemId = Number(id),
            itemMoved,
            index,
            listFrom,
            listTo,
            filterStr,
            form,
            input;

        if (e.type === 'click' && e.target.classList.contains('friends-filter__list-btn_add')) {
            listFrom = this.map[0].data;
            listTo = this.map[1].data;
            
        } else if (e.type === 'click' && e.target.classList.contains('friends-filter__list-btn_remove')) {
            listFrom = this.map[1].data;
            listTo = this.map[0].data;
        }
        if (e.type === 'drop' && (this.startDragArea !== this.getZone(e.target))) {
            if (this.startDragArea.getAttribute('id') === 'friendsList1') {
                listFrom = this.map[0].data;
                listTo = this.map[1].data;
            }
            else if (this.startDragArea.getAttribute('id') === 'friendsList2') {
                listFrom = this.map[1].data;
                listTo = this.map[0].data;
            }
        }
        
        listFrom.forEach((elem, i) => {
            if (elem.id === itemId) index = i;
        })
        
        itemMoved = listFrom.splice(index,1);
        listTo.push(itemMoved[0]); 
        
        this.map.forEach((item, index) => {
            if (listTo === item.data) {
                form = item.form;
            }
        });
        filterStr = form.querySelector('.friends-filter__input').value;
        if (filterStr) {
            this.filterList (listTo, filterStr)
        };
    }

    dragStartHandler(e) {
        this.draggingItem = e.target;
        this.startDragArea = this.getZone(e.target);
    }

    dragEndHandler(e) {
    }

    dropHandler(e) {
        let zone = this.getZone (e.target);
        if (zone && this.startDragArea !== zone) {
            this.moveData(this.draggingItem.getAttribute('data-id'), e);
            this.renderFriends();
        }
    }

    // moveItem (item, zone) {
    //     let btn = item.querySelector('.' + this.friendFilterListClass + '-btn');
    //     let ul = zone.querySelector('.' + this.friendFilterListClass);

    //     btn.classList.toggle(this.friendFilterListClass + '-btn_add');
    //     btn.classList.toggle(this.friendFilterListClass + '-btn_remove');
    //     ul.appendChild(item);
    // }

    dragOverHandler(e) {
        e.preventDefault();
    }

    clickHandler (e) {
        let item = this.getItem(e.target);

        if (!item || !e.target.classList.contains('friends-filter__list-btn')) return; 
        //this.moveItem (item, zone);
        this.moveData(item.getAttribute('data-id'), e);
        this.renderFriends();
    }

    submitHandler(e) {
        e.preventDefault();

        //console.log(e.target);
    }

    filterInputChangeHandler (e) {
        const input = e.target;

        console.log(input);

        if (this.getZone(input).getAttribute('id') === 'friendsList1') {
            this.map[0].data = this.filterList (this.map[0].data, input.value);
        } else if (this.getZone(input).getAttribute('id') === 'friendsList2') {
            this.map[1].data = this.filterList (this.map[1].data, input.value);
        }

        this.renderFriends ();

    }
    filterList (list, str) {
        let listFiltered = list.slice();
        let re = new RegExp(str, 'gi');
        listFiltered.forEach((item) => {
            item.hidden = (!(item.first_name.match(re) || item.last_name.match(re)));
        });
        return listFiltered;
    }
}