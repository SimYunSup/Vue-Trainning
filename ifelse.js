var conditional1 = new Vue({
    el: '#cond1',
    data: {
        showThis : false
    },
    methods: {
        toggleThis: function () {
            this.showThis ? this.showThis = false : this.showThis = true
        }
    }
})

var conditional2 = new Vue({
    el: '#cond2',
    data: {
        showA : false,
        showB : false,
        showC : false
    },
    methods: {
        toggleA: function () {
            this.showA = true
            this.showB = false
            this.showC = false
        },
        toggleB: function () {
            this.showA = false
            this.showB = true
            this.showC = false
        },
        toggleC: function () {
            this.showA = false
            this.showB = false
            this.showC = true
        },
        toggle: function () {
            this.showA = false
            this.showB = false
            this.showC = false
        }
    }
})

var conditionalNoKey = new Vue({
    el: '#cond3NoKey',
    data: {
        loginType: 'username'
    },
    methods: {
        toggleThis: function () {
            this.loginType === 'username' ? this.loginType = 'emailname' : this.loginType = 'username'
        }
    }
})

var conditional3 = new Vue({
    el: '#cond3',
    data: {
        loginType: 'username'
    },
    methods: {
        toggleThis: function () {
            this.loginType === 'username' ? this.loginType = 'emailname' : this.loginType = 'username'
        }
    }
})


var conditional4 = new Vue({
    el: '#cond4',
    data: {
        ok: true
    },
    methods: {
        isOk: function () {
            this.ok === true ? this.ok = false : this.ok = true
        }
    }
})