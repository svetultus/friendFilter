module.exports = {
    renderFriends (templateFriends, item) {
        let html,
            render = Handlebars.compile(templateFriends);
            
            html = render({friends: item.data, btnClass: item.btnClass, header: item.header});
            item.html.innerHTML = html;
    }
}