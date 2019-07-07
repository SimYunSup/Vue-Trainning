var bindcls1 = new Vue({
    el: '.bindingclass1',
    data: {
        isActive: false
    },
    methods: {
        activation: function() {
        if(this.isActive === false)
            this.isActive = true
        else
            this.isActive = false
        }
    }
})

var bindcls2 = new Vue({
    el: '.bindingclass2',
    data: {
        objectClassBind: {
            underline : false
        }
    },
    methods: {
        activation: function() {
            if(this.objectClassBind.underline === false)
                this.objectClassBind.underline = true
            else
                this.objectClassBind.underline = false
        }
    }
})
var bindcls3 = new Vue({
    el: '.bindingclass3',
    data: {
        isActive: false
    },
    methods: {
        activation: function() {
            if(this.isActive === false)
                this.isActive = true
            else
                this.isActive = false
        }
    },
    computed: {
        objectClassBind: function(){
            return {
                underline: this.isActive
            }
        }
    }
})

var bindcls4 = new Vue({
    el: '.bindingclass4',
    data: {
        red: 'textRed',
        objectClassBind: {
            underline: false
        }
    },
    methods: {
        activation: function () {
            this.objectClassBind.underline ? this.objectClassBind.underline = false : this.objectClassBind.underline = true
        }
    }
})

Vue.component('bigfont', {
    template: '<p class="bigFont">component class binding</p>'
})

var bindcls5 = new Vue({
    el: '.bindingclass5',
    data: {
        objectClassBind: {
            underline: false
        }
    },
    methods: {
        activation: function () {
            this.objectClassBind.underline ? this.objectClassBind.underline = false : this.objectClassBind.underline = true
        }
    }
})

var bindsty1 = new Vue({
    el: '.bindingstyle1',
    data: {
        styleObject: {
            color: 'red',
            fontSize: '13px'
        }
    }
})

var bindsty2 = new Vue({
    el: '.bindingstyle2',
    data: {
        baseStyles: {
            color: 'red',
            fontSize: '13px'
        },
        plusStyles: {
            textDecorationLine : 'underline'
        }
    }
})

var bindsty3 = new Vue({
    el: '.bindingstyle3'
})