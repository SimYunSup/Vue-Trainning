var navigationLink = {
    template: '<a\
            :herf="url"\
            class="nav-link"\
            >\
                <slot></slot>\
            </a>',
    props: ['url']
}
//component.html에서 업그레이드 되었다고 한다.
var namedSlot = {
    template: '<div class="container">\
        <header>\
            <slot name="header">이름이 붙음</slot>\
        </header>\
        <main>\
            <slot>슬롯이 없을 경우 나타난다. 이름이 붙지 않음</slot>\
        </main>\
        <footer>\
            <slot name="footer">Footer</slot>\
        </footer>\
        </div>'
}

var scopeSlot = {
    template: '<div>\
        <slot :user="user">{{user.lastName}}</slot>\
        </div>',
    data: function () {
        return {
            user: {
                firstName: 'Sim',
                lastName: 'Yunsup',
                age: 18,
                major: 'Computer Engineering'
            },
            customUser: undefined
        }
    }
    //부모 컴포넌트에서 user을 사용하려면 user을 slot에 바인딩해야 한다고 한다.
}

var listSlot = {
    template: '<ul>\
    <slot name="item"\
        v-for="item in items"\
        :text="item">\
    </slot>\
    </ul>',
    props: ['items']
}

var slot1 = new Vue({
    el: '#slot1',
    data: {
        dynamicslotname: 'default'
    },
    methods: {
        changeHeader(){this.dynamicslotname = 'header'},
        changeDefault(){this.dynamicslotname = 'default'},
        changeFooter(){this.dynamicslotname = 'footer'}
    },
    components: {
        'navigation-link': navigationLink,
        'named-slot': namedSlot,
        'scope-slot': scopeSlot,
        'li-slot': listSlot
    }
})

