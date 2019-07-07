var app = new Vue({
    //적용될 지정자를 넣는 것 같다.
    el: '#app',
    // 활용될 Data를 넣는다.
    data: {
        message: '첫 번째 Vue 연습!'
    }
})

var app2 = new Vue({
    el: '#app2',
    data: {
        message: '이것이 로딩되었을 때 시간은' + new Date() + '이야!'
    }
})

var app3 = new Vue({
    el: '#app3',
    data: {
        seen: true
    },
    methods: {
        reverse: function () {
            (this.seen == false) ? this.seen = true : this.seen = false
        }
    }
})

var app4 = new Vue({
    el: '#app4',
    data:{
        todos: [
            {text: 'Canada로 간다'},
            {text: '개발공부를 한다'},
            {text: '현타가 온다'}
        ]
    }
})

var app5 = new Vue({
    el: '#app5',
    data: {
        message: '안녕하세요! Vue.js!'
    },
    methods: {
        reverseMessage: function () {
            // split(String -> Array String) reverse (Array의 순서를 거꾸로 함 join(Array -> String)
            this.message = this.message.split('').reverse().join('')
        }
    }
})

var app6 = new Vue({
    el: '#app6',
    data: {
        message: '메세지를 따라해요!'
    }
})

Vue.component('todo-item', {
    props: ['todo'],
    template: '<li>{{ todo.text }}</li>'
})

var app7 = new Vue({
    el: '#app7',
    data: {
        brain: [
            { id: 0, text: 'Thinking' },
            { id: 1, text: 'NaIS' },
            { id: 2, text: 'But No Thinking' }
        ]
    }
})




