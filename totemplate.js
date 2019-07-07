var template1 = new Vue({
    el:"#template1",
    data:{
        a:1,
        rawhtml: '<span style="color:blue">파랑색</span>',
        changeableid: 'temp'
    },
    methods:{
        minusa: function () {
            a--
        }
    }
})