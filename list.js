var listing1 = new Vue({
    el: '#list1',
    data: {
        items: [
            {message: 'This'},
            {message: 'is'},
            {message: 'for'},
            {message: 'you'}
        ]
    }
})

var listing2 = new Vue({
    el: '#list2',
    data: {
        parentMessage : 'Hello',
        items: [
            {message: 'This'},
            {message: 'is'},
            {message: 'for'},
            {message: 'you'}
        ]
    }
})

var listing3 = new Vue({
    el: '#list3',
    data: {
        object: {
            firstname: 'Yunsup',
            lastname: 'Sim',
            age: 18
        }
    }
})

var listing4 = new Vue({
    el: '#list4',
    data: {
        object: {
            firstname: 'Yunsup',
            lastname: 'Sim',
            age: 18
        }
    }
})

var listing5 = new Vue({
    el: '#list5',
    data: {
        items: [
            {message: 'bitcoin'},
            {message: 30},
            {message: 'moo'}
        ]
    },
    methods: {
        plus: function() {
            let message = document.getElementById('plusMessage').value
            this.items.push({message: message})
        }
    }
})

var listing6 = new Vue({
    el: '#list6',
    data: {
        items: [
            {message: 'Sim'},
            {message: 'Sups'},
            {message: 'Last'},
            {message: 'Vatican'}
        ]
    },
    methods: {
            match: function() {
                this.items = this.items.filter(item => item.message.length > 3)
        }
    }
})
//인식 불가한 상황을 대처하기 위해 Array.splice를 사용한다.
var listing7 = new Vue({
    el: '#list7',
    data: {
        items: [
            {message: 'Sim'},
            {message: 'Sups'},
            {message: 'Last'},
            {message: 'Vatican'}
        ]
    },
    methods: {
        change: function () {
            let indexOfItem = document.getElementById('changeIndex').value
            let changeItem = document.getElementById('changeMessage').value
            this.items.splice(indexOfItem, 1, {message: changeItem})
        }
    }
})

var listing8 = new Vue({
    el: '#list8',
    data: {
        items: [
            {message: 'Sim'},
            {message: 'Sups'},
            {message: 'Last'},
            {message: 'Vatican'}
        ]
    },
    methods: {
        cut: function () {
            let cutIndex = document.getElementById('cutIndex').value
            this.items.splice(cutIndex)
        }
    }
})

var listing9 = new Vue({
    el: '#list9',
    data: {
        info: {
            name: 'Sim yunsup'
        }
    },
    methods: {
        // Vue.set
        plus1: function () {
            let value = document.getElementById('plusValue1').value
            Vue.set(this.info, 'age', value)
        },
        //$set 메소드를 사용한다.
        plus2: function () {
            let value = document.getElementById('plusValue2').value
            this.$set(this.info, 'Location', value)
        },
        //Object.assign 또는 _.extend를 사용하기도 한다.
        plus3: function () {
            let value = document.getElementById('plusValue3').value
            this.info = Object.assign({}, this.info, {
                major: value
            })
        }
    }
})

var listing10 = new Vue({
    el: '#list10',
    data: {
        numbers: [ 1, 2, 3, 4, 5 ]
    },
    //computed 속성을 사용할 수 없는 경우(중첩된 v-for 내부) methods도 가능하다고 한다.
    computed: {
        evenNumbers: function () {
            return this.numbers.filter(function (number) {
                return number % 2 === 0
            })
        }
    }
})

var listing11 = new Vue({
    el: '#list11'
})

var listing12 = new Vue({
    el: '#list12',
    data: {
        items: [
            {message: 'bitcoin'},
            {message: 30},
            {message: 'moo'}
        ]
    },
    methods: {
        plus: function() {
            let message = document.getElementById('plusList').value
            this.items.push({message: message})
        }
    }
})

var listing13 = new Vue({
    el: '#list13',
    data: {
        items: [
            {message: 'bitcoin', haveThis: false},
            {message: 'smartphone', haveThis: true},
            {message: 'laptop', haveThis: true}
        ]
    },
    methods: {
        enable: function() {
            let indexOfItem = document.getElementById('enableItem').value
            this.items[indexOfItem].haveThis = true
        },
        disable: function () {
            let indexOfItem = document.getElementById('disableItem').value
            this.items[indexOfItem].haveThis = false
        }
    }
})

var listing14 = new Vue({
    el: '#list14',
    data: {
        items: [
            'bitcoin',
            'smartphone',
            'laptop'
        ]
    },
    methods: {
        pop: function() {
            this.items.pop()
        }
    }
})

Vue.component('my-item', {
    template: '\
    <li>\
      {{ title }}\
      <button v-on:click="$emit(\'remove\')">X</button>\
    </li>\
  ',
    props: ['title']
})

new Vue({
    el: '#list15',
    data: {
        newItemText: '',
        items: [
            {
                id: 1,
                title: 'Smartphone',
            },
            {
                id: 2,
                title: 'Laptop',
            },
            {
                id: 3,
                title: 'Mouse'
            }
        ],
        nextItemId: 4
    },
    methods: {
        addNewItems: function () {
            this.items.push({
                id: this.nextItemId++,
                title: this.newItemText
            })
            this.newItemText = ''
        }
    }
})