Vue.component('my-component', {
    template: '<p>전역정의 컴포넌트 입니다!</p>'
})
var Child = {
    template: '<p>지역정의 컴포넌트 입니다!</p>'
}

var comp1 = new Vue({
    el: '#comp1',
    components: {
        'local-component': Child
    }
})

Vue.component('rule-comp', {
    template: '\
        <li>\
            {{ rule }}\
        </li>\
    ',
    props: ['rule']
})

var comp2 = new Vue({
    el: '#comp2',
    data: {
        rules: ['<script type="text/x-template">', 'JavaScript 인라인 템플릿 문자열', '.vue 컴포넌트']
    }
})

var data= { counter: 0 }

var relatedCounter = {
    template: '<button @click="counter += 1">{{ counter }}</button>',
    data: function(){
        return data
    }
}

var simpleCounter = {
    template: '<button @click="counter += 1">{{ counter }}</button>',
    data: function () {
        return { counter: 0 }
    }
}

var comp3 = new Vue({
    el: '#comp3',
    components: {
        'counter1': relatedCounter,
        'counter2': simpleCounter
    }
})

var passiveComp = {
    template: '<p>{{message}}</p>',
    props: ['message']
}

var passiveKabab = {
    template: '<p>{{myMessage}}</p>',
    props: ['myMessage']
}

var activeComp = {
    template: '<p>{{activeMessage}}</p>',
    props: ['activeMessage']
}

var objectProp = {
    template: '<p>{{type}} is {{getThis}}</p>',
    props: ['type', 'getThis']
}

var propsCounter = {
    template: '<button @click="counter += 1">{{ counter }}</button>',
    props: ['initialCounter'],
    data: function () {
        return { counter: this.initialCounter }
    }
}

var propsText = {
    template: '<p>{{normalized}} <- {{text}}</p>',
    props: ['text'],
    computed: {
        normalized: function () {
            return this.text.trim().toLowerCase()
        }
    }
}

var propsCheck = {
    template:'<p>{{propA}}  {{propB}}  {{propC}}  {{propD}}  {{propE}}  {{propF}}</p>',
    props: {
        // 기본 타입 확인 (`null` 은 어떤 타입이든 가능하다는 뜻입니다)
        propA: Number,
        // 여러개의 가능한 타입
        propB: [String, Number],
        // 문자열이며 꼭 필요합니다
        propC: {
            type: String,
            required: true
        },
        // 숫자이며 기본 값을 가집니다
        propD: {
            type: Number,
            default: 100
        },
        // 객체/배열의 기본값은 팩토리 함수에서 반환 되어야 합니다.
        propE: {
            type: Object,
            default: function () {
                return { message: 'hello' }
            }
        },
        // 사용자 정의 유효성 검사 가능
        propF: {
            validator: function (value) {
                return value > 10
            }
        }
    }
}

var comp4 = new Vue({
    el: '#comp4',
    data: {
        message: '',
        item: {
            type: 'smartphone',
            getThis: true
        },
        initialNumber: 0,
        text: '',
        checkNumber: '',
        checkMulti: '',
        checkString: '',
        checkDefault: null,
        checkObject: {
        },
        checkUser: 0
    },
    components: {
        'passive0': passiveComp,
        'passive1': passiveKabab,
        'active': activeComp,
        'item': objectProp,
        'counter': propsCounter,
        'origin': propsText,
        'check': propsCheck
    }
})