// mixin 객체 생성
var useMixin1 = {
    created: function () {
        this.hello()
    },
    methods: {
        hello: function () {
            console.log('hello from mixin!')
        }
    }
}

// mixin을 사용할 컴포넌트 정의는 Vue.extend로 하는 것 같다.
var extendMixin = Vue.extend({
    mixins: [useMixin1]
})

var mixin1 = new extendMixin() // => "hello from mixin!"

var useMixin2 = {
    created: function () {
        this.array.push('mixin hook called')
    }
}

new Vue({
    el: '#mixin1',
    data: {
        array: []
    },
    mixins: [useMixin2],
    created: function () {
        this.array.push('component hook called')
    }
})

var useMixin3 = {
    methods: {
        air: function () {
            this.array.push('겹치지 않는 mixin 메소드')
        },
        conflicting: function () {
            this.array('겹치는 mixin 메소드')
        }
    }
}

var mixin2 = new Vue({
    el: '#mixin2',
    data: {
        array: []
    },
    mixins: [useMixin3],
    methods: {
        pot: function () {
            this.array.push('겹치지 앖는 component 메소드')
        },
        conflicting: function () {
            this.array.push('겹치는 component 메소드')
        }
    }
})

Vue.mixin({
    created: function () {
        var myOption = this.$options.myOption
        if (myOption) {
            console.log(myOption)
        }
    }
})

var mixin3 = new Vue({
    myOption: 'hello to mixin'
})

/*
    mixin을 병합할 때 사용자정의 로직을 적용하려면
    Vue.config.optionMergeStrategies에 함수를 추가하거나

    var strategies = Vue.config.optionMergeStrategies
    strategies.myOption = strategies.methods
    으로 적용할 수 있다.
    이와에도 Vuex를 사용하는 방법이 있는 것 같다.
 */