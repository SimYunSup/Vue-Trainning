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

//모든 props는 데이터를 받아 재렌더링하는 것은 가능하지만 props를 바꾸어 재렌더링하도록 하지 못한다.

var propsCounter = {
    template: '<p><button @click="counter += 1">{{ counter }}</button>\
        <button @click="changeInitial">{{initialCounter}}</button>\
        </p>\
        ',
    props: ['initialCounter'],
    data: function () {
        return { counter: this.initialCounter }
    },
    methods: {
        changeInitial: function () {
            this.initialCounter += 1
            //제랜더링되지 않는다.
        }
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

var notProps = {
    template: '<input class="underline" value="Props가 아닌 속성">'
}

var counterPlus = {
    template: '<button @click="increaseCounter">{{counter}}</button>',
    data: function () {
        return {
            counter: 0
        }
    },
    methods: {
        increaseCounter: function () {
            this.counter += 1
            this.$emit('increase')
        }
    }
}

var counterMinus = {
    template: '<button >-1 하기</button>'
}

var counterSync = {
    template: '<p><button @click="counter += 1">{{ counter }}</button>\
        <button @click="changeInitial">{{initialCounter}}</button>\
        <span>{{ changeCounter }}</span>\
        </p>\
        ',
    props: ['initialCounter'],
    data: function () {
        return {
            counter: this.initialCounter,
            changeCounter: 0
        }
    },
    methods: {
        changeInitial: function () {
            this.change += 1
            this.$emit('update:initialCounter', this.initialCounter + 1)
        },
    }
}

// v-model 활용 사용자 정의 컴포넌트 만들기

var numberInput = {
    template: '<p>\
    <input\
        ref="inputNum"\
        :value="value"\
        @input="updateValue($event.target.value)">\
        <span>{{value}}</span>\
        <br>\
        <span>$ref = {{refTest}}</span>\
        </p>\
        ',
    data: function() {
        return { refTest: ''}
    },
    props: ['value'],
    methods: {
        updateValue(value) {
            let formattedValue = value
                .trim()
                .slice(
                    0,
                    value.indexOf('.') === -1
                        ? value.length
                        : value.indexOf('.') + 3
                )
            //input 안의 값이 위와 같이 되지 않았을 경우 input.value 값을 바꾼다.
            if(formattedValue !== value)
                this.$refs.inputNum.value = formattedValue
            //입력이벤트로 바꾼 값을 숫자로 부모에게 보낸다.
            this.$emit('input', Number(formattedValue))
            //$refs 테스트
            this.refTest = this.$refs
        }
    }
}

var customCheckbox = {
    template: '<p>\
        <input\
        id="check"\
        type="checkbox"\
        :checked="checked"\
        @change="updateChecked($event.target.checked)">\
        <label for="check">{{checked}}</label>\
        <span> - {{value}}</span>\
        </p>',
    //checkbox에서의 v-model을 사용하기 위해 아래와 같은 model을 사용한다.
    model: {
        prop: 'checked',
        event: 'change'
    },
    //필요할 경우 검증
    props: {
        checked: Boolean,
        value: String
    },
    methods: {
        updateChecked(value){
            this.$emit('change', value)
        }
    }
}

var comp5 = new Vue({
    el: '#comp5',
    data: {
        totalCounter: 0,
        initialNum: 0,
        number: null,
        checking: false
    },
    methods: {
        increaseTotal: function () {
            this.totalCounter += 1
        },
        decreaseTotal: function() {
            this.totalCounter -= 1
        }
    },
    components: {
        'no-props-input': notProps,
        'counter-plus': counterPlus,
        'counter-minus': counterMinus,
        'counter-sync': counterSync,
        'number': numberInput,
        'checkbox': customCheckbox
    }
})


var showCorrect = {
    template: '<div v-show="show">작동합니다</div>',
    data: function () {
        return { show: true }
    }
}

var singleSlot = {
    template: '<div>\
        <h4>컴포넌트 속 내용</h4>\
        <slot>속 내용이 없는 경우 보인다.</slot>\
        </div>'
}

var namedSlot = {
    template: '<div class="container">\
        <header>\
            <slot name="header">이름이 붙음</slot>\
        </header>\
        <main>\
            <slot>슬롯이 없을 경우 나타난다. 이름이 붙지 않음</slot>\
        </main>\
        <footer>\
            <slot name="footer"></slot>\
        </footer>\
        </div>'
}

var scopeSlot = {
    template: '<div>\
        <slot text="Child Message by template">1</slot>\
        </div>'
}

var listSlot = {
    template: '<ul>\
    <slot name="item"\
        v-for="item in items"\
        :text="item">\
    </slot>\
    </ul>',
    props: ['items']
}

var comp6 = new Vue({
    el: '#comp6',
    data: {
        items: ['FrontEnd', 'BackEnd', 'IOS', 'Android']
    },
    components: {
        'show-correct': showCorrect,
        'single-slot': singleSlot,
        'named-slot': namedSlot,
        'scope-slot': scopeSlot,
        'li-slot': listSlot
    }
})

var comp7 = new Vue({
    el: '#comp7',
    data: {
        currentComponent: 'named-slot'
    },
    components: {
        'single-slot': singleSlot,
        'named-slot': namedSlot,
        'scope-slot': scopeSlot
    }
})

var childRef = {
    template: '<p><input ref="inputChild"><button @click="focusC">childFocus</button></p>',
    methods: {
        focusC: function () {
            this.$refs.inputChild.focus()
        }
    }
}

var parentRef = {
    //$ref는 반응적이지 않습니다.
    template: '<p><child-ref ref="child"></child-ref><button @click="focusP">focus</button></p>',
    methods: {
        focusP: function () {
            this.$refs.child.focusC()
        }
    },
    components: {
        'child-ref': childRef
    }
}

Vue.component( 'async-time', function (resolve, reject) {
    setTimeout(function () {
        resolve({
            template: '<div>비동기 처리 완료!</div>'
        })
    }, 1000)
})
//webpack으로 Vue 프로젝트를 짰을 경우 다음과 같은 것이 가능하다
/*
Vue.component('async-webpack-example', function (resolve) {
  // 이 특별한 require 구문은 Webpack이 Ajax 요청을 통해
  // 로드되는 번들로 작성된 코드를 자동으로 분리하도록 지시합니다.
  require(['./my-async-component'], resolve)
})
와
() => import(모듈이름) 으로 컴포넌트를 불려올 수 있다(전역 및 지역 등록 가능).
또는
다음과 같은 것이 들어간 객체를 반환할 수 있다.
component: import('모듈 이름')
loading: 로드되는 동안 사용할 컴포넌트
error: 에러가 발생할 시 컴포넌트
delay: 로딩 컴포넌트를 보여주기 전 지연 시간
timout: 에러를 보여주기 전 지연 시간
 */
//name이 있는 component는 자기 자신을 쓸 수 있다. stack overflow가 될 수 있기 때문에 v-if로 조절해야 한다.

var comp8 = new Vue({
    el: '#comp8',
    method: {
        focusChild: function () {
            this.$refs.childComp.focusOn()
        }
    },
    components: {
        'parent-ref': parentRef
    }
})

//- 순환참조
/*
    두 컴포넌트가 서로를 참조할 경우 컴포넌트가 지역등록으로 등록되었을 시에 오류가 발생한다.
    이를 해결하기 위해 두 가지 방법을 사용한다.
    1. 한 컴포넌트의 beforeCreate에서 this.$options.ccomponents.컴포넌트이름 = require구문을 함수로 넣는다.
    2. 또는 컴포넌트를 components에 넣을 때 비동기식으로 선언하는 방식이 있다.
 */

/*
- 인라인 템플릿
    하위 컴포넌트에 inline-template라는 속성이 들어가면 컴포넌트 안의 내용을 템플릿으로 사용한다.
- x-templates
    text/x-template 유형인 script의 ID를 template에 넣는 것으로 템플릿을 참조할 수 있다.
- v-once
    정적인 콘텐츠가 많이 포함되어있다면 v-once를 root에 추가한다.
 */
