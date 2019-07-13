var trans1 = new Vue({
    el: '#trans1',
    data: {
        show: true
    }
})

var trans2 = new Vue({
    el: '#trans2',
    data: {
        show: true
    }
})

var trans3 = new Vue({
    el: '#trans3',
    data: {
        show: true
    }
})

var trans4 = new Vue({
    el: '#trans4',
    data: {
        show: true
    }
})
/*
    Vue에서 트랜지션이 종료된 시점을 알기 위해 transtionend/animationend 이벤트에 리스너를 연결한다.
    만약 두 가지를 혼합해서 사용하는 경우 type속성에서 transition/animation을 명시적으로 선언해야 한다고 한다.
 */

var trans5 = new Vue({
    el: '#trans5',
    data: {
        showA: true,
        showB: true
    }
})

var trans6= new Vue({
    el: '#trans6',
    data: {
        show: false
    },
    methods: {
        /*
            훅으로 정할 수 있는 것들은
            before-enter
            enter(비동기적으로 작동하기 위해 done 콜백이 필요하다고 한다.)
            after-enter
            enter-cancelled
            와 enter/leave이 들어간 것까지 8개가 있다.
         */
        beforeEnter: function (el) {
            el.style.opacity = 0
        },
        enter: function (el, done) {
            Velocity(el, { opacity: 1, fontSize: '1.4em' }, { duration: 300 })
            Velocity(el, { fontSize: '1em' }, { complete: done })
        },
        leave: function (el, done) {
            Velocity(el, { translateX: '15px', rotateZ: '50deg' }, { duration: 600 })
            Velocity(el, { rotateZ: '100deg' }, { loop: 2 })
            Velocity(el, {
                rotateZ: '45deg',
                translateY: '30px',
                translateX: '30px',
                opacity: 0
            }, { complete: done })
        }
    }
})

var trans7 = new Vue({
    el: '#trans7',
    data: {
        show: true
    }
})

var trans8 = new Vue({
    el: '#trans8',
    data: {
        show: true,
        showB: true,
        nowState: 'break'
    },
    methods: {
        changeFeel: function () {
            switch (this.nowState) {
                case 'break':
                    this.nowState = 'happy'
                    break
                case 'happy':
                    this.nowState = 'think'
                    break
                case 'think':
                    this.nowState = 'break'
            }
        }
    },
    computed: {
        nowFeeling: function () {
            switch (this.nowState) {
                case 'break':
                    return 'mental broken'
                case 'happy':
                    return 'so happy for a hour'
                case 'think':
                    return 'brain is not working so he don\'t know feeling'
            }
        }
    }
})

var trans9 = new Vue({
    el: '#trans9',
    data: {
        display: 'comp-a'
    },
    components: {
        'comp-a': {
            template: '<div>컴포넌트간 트랜지션은 key값이 필요 없다.</div>'
        },
        'comp-b': {
            template: '<div>대신 동적 컴포넌트를 이용한다.</div>'
        }
    }
})

var trans10 = new Vue({
    el: '#trans10',
    data: {
        items: [1,2,3,4,5],
        nextNum: 6,
        order: [1,2,3,4,5,6,7,8,9]
    },
    methods: {
        randomIndex: function () {
            return Math.floor(Math.random() * this.items.length) // 0~1 랜덤수 * 현재 배열 길이 -> 내림
        },
        add: function () {
            this.items.splice(this.randomIndex(), 0, this.nextNum++)
        },
        remove: function () {
            this.items.splice(this.randomIndex(), 1)
        },
        shuffle: function () {
            this.items = _.shuffle(this.items)
        },
        shuffleOrder: function () {
            this.order = _.shuffle(this.order)
        }
    }
})
//재사용 가능한 트랜지션
var staggeredFade = {
    template: '<transition-group\
                name="staggered-fade"\
                tag="ul"\
                :css="false"\
                @before-enter="beforeEnter"\
                @enter="enter"\
                @leave="leave"\
            >\
                <li\
                    v-for="(item, index) in computedList"\
                    :key="item.msg"\
                    :data-index="index"\
                >{{ item.msg }}</li>\
            </transition-group>',
    props: ['searchQuery', 'list'],
    computed: {
        computedList: function () {
            var vm = this
            return this.list.filter(function (item) {
                return item.msg.toLowerCase().indexOf(vm.searchQuery.toLowerCase()) !== -1
            })
        }
    },
    methods: {
        beforeEnter: function (el) {
            el.style.opacity = 0
            el.style.height = 0
        },
        enter: function (el, done) {
            //el.dataset은 DOMStringMap이라는 것을 반환한다.
            var delay = el.dataset.index * 150
            setTimeout(function () {
                Velocity(
                    el,
                    { opacity: 1, height: '1.6em' },
                    { complete: done }
                )
            }, delay)
        },
        leave: function (el, done) {
            var delay = el.dataset.index * 150
            setTimeout(function () {
                Velocity(
                    el,
                    { opacity: 0, height: 0 },
                    { complete: done }
                )
            }, delay)
        }
    }
}

var trans11 = new Vue({
    el: '#trans11',
    data: {
        searchQuery: '',
        list: [
            { msg: 'Apple' },
            { msg: 'Banana' },
            { msg: 'Chunk' },
            { msg: 'DirectX' },
            { msg: 'East sea' }
        ]
    },
    components: {
        'staggered-fade': staggeredFade
    }
})

var trans12 = new Vue({
    el: '#trans12',
    data: {
        show: true,
        fadeInDuration: 1000,
        fadeOutDuration: 1000,
        maxFadeDuration: 1500,
        stop: true
    },
    mounted: function () {
        this.show = false
    },
    methods: {
        beforeEnter: function (el) {
            el.style.opacity = 0
        },
        enter: function (el, done) {
            var vm = this
            Velocity(el,
                { opacity: 1 },
                {
                    duration: this.fadeInDuration,
                    complete: function () {
                        done()
                        if (!vm.stop) vm.show = false
                    }
                }
            )
        },
        leave: function (el, done) {
            var vm = this
            Velocity(el,
                { opacity: 0 },
                {
                    duration: this.fadeOutDuration,
                    complete: function () {
                        done()
                        vm.show = true
                    }
                }
            )
        }
    }
})