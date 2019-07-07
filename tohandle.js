var handle1 = new Vue({
    el: '#handle1',
    data: {
        counter: 0
    }
})

var handle2 =new Vue({
    el: '#handle2',
    data: {
        name: ''
    },
    methods: {
        greet: function (event) {
            alert('Hello, ' + this.name + '!')
            if (event)
                alert(event.target.tagName)
            this.name = ''
        }
    }
})

var handle3 = new Vue({
    el: '#handle3',
    data: {
        message: ''
    },
    methods: {
        say: function (message) {
            alert(message)
        }
    }
})

var handle4 = new Vue({
    el: '#handle4',
    data: {
        message: ''
    },
    methods: {
        warn: function (message, event) {
                if(event) event.preventDefault()
            alert(message)
        }
    }
})

var handle5 = new Vue({
    el: '#handle5',
    data: {
        type: [],
        message: ''
    },
    methods: {
        show1: function() {
          alert('1')
        },
        show2: function () {
            alert('2')
        },
        showkeyup: function() {
            this.type.push('.enter', '.delete(backspace도 포함됨)', '.tab', '.esc', '.space', '.up', '.down', '.left', '.down')
        },
        showPlus1: function () {
            this.type.push('.ctrl', '.alt', '.shift', '.meta(command키 혹은 windows 키)')
        },
        showPlus2: function () {
            this.type.push('.left', '.right', '.middle')
        },
        clear: function () {
            this.message= ''
        }
    }
})