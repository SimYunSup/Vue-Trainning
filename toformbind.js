var form1 = new Vue({
    el: '#form1',
    data: {
        message: ''
    }
})

var form2 = new Vue({
    el: '#form2',
    data: {
        message: ''
    }
})

var form3 = new Vue({
    el: '#form3',
    data: {
        checked: false,
        checkedItems: []
    }
})

var form4 = new Vue({
    el: '#form4',
    data: {
        picked: ''
    }
})

var form5 = new Vue({
    el: '#form5',
    data: {
        selected: '',
        selectmulti: [],
        selectFor: 'comfortable',
        options: [
            {message: 'Lying', value: 'comfortable'},
            {message: 'sitting', value: 'waist pain'},
            {message: 'Stand', value: 'foot pain'}
        ]
    }
})

var form6 = new Vue({
    el: '#form6',
    data: {
        toggle: 'no',
        bindpick: '',
        a: 10,
        b: 20,
        selectObject: {}
    }
})

var form7 = new Vue({
    el: '#form7',
    data: {
        msg: '',
        number: '',
        message: ''
    },
    computed: {
        isNumber: function() {
            let type = typeof this.number
            if(type === 'number')
                return true
            else
                return false
        }
    }
})