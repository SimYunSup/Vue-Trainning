/*
computed 속성은 method 속성이 렌더링할 때마다 항상 실행하는데에 비해
종속된 대상이 변경될 때에만 함수를 실행하고 변하지 않았을 경우에는 저장한 값을 반환한다.
 */
var computed = new Vue({
    el: '#computed',
    data: {
        firstName: 'first',
        lastName: 'last'
    },
    computed: {
        fullName: {
            // fullName = '값'을 하게되면 setter함수로 된다.
            // getter 함수, 값을 받기만 하는 함수다.
            get: function () {
                return this.firstName + ' ' + this.lastName
            },
            // setter 함수, 값을 설정하는 함수이다. 보통 함수 하나로 설정하는데 그 경우에는 setter함수가 없는 것이다.
            set: function (newValue) {
                var names = newValue.split(' ')
                this.firstName = names[0]
                this.lastName = names[names.length - 1]
            }
        }
    }
})
/*보통 watch 속성은 비동기식 처리를 하거나 시간이 오래 걸리는 경우 사용된다.*/
var watch = new Vue({
    el: '#watch',
    data: {
        firstName: 'Foo',
        lastName: 'Bar',
        fullName: 'Foo Bar'
    },
    watch: {
        //watch는 모두 다 설정해야 한다.
        firstName: function (val) {
            this.fullName = val + ' ' + this.lastName
        },
        lastName: function (val) {
            this.fullName = this.firstName + ' ' + val
        }
    }
})