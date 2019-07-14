var anchoredHeading1 = {
    template: '<div>\
        <h1 v-if="level === 1">\
            <slot></slot>\
        </h1>\
        <h2 v-else-if="level === 2">\
            <slot></slot>\
        </h2>\
        <h3 v-else-if="level === 3">\
            <slot></slot>\
        </h3>\
        <h4 v-else-if="level === 4">\
            <slot></slot>\
        </h4>\
        <h5 v-else-if="level === 5">\
            <slot></slot>\
        </h5>\
        <h6 v-else-if="level === 6">\
            <slot></slot>\
        </h6>\
    </div>',
    props: ['level']
}

var anchoredHeading2 = {
    render: function (createElement) {
        return createElement(
            'h' + this.level,   // 태그 이름
            this.$slots.default // 자식의 배치
        )
    },
    props: {
        level: {
            type: Number,
            required: true
        }
    }
}
/*
    Vue는 DOM을 조작할 경우 모든 Repaint(Layout, CSS변경작업)과 Reflow(Painting, 레이아웃 변경작업)을 할 경우
    모든 DOM을 다시 Repaint/Reflow작업을 하게 하는 것을 막게 하기 위해 Virtual DOM을 만들어 먼저 Virtual DOM을 조작하고
    그 후 기존 DOM에서 바뀐 부분만 Repaint/Reflow작업을 하게 하여 처음 렌더링 시간을 좀 더 걸리게 하는 대신 조작 시
    렌더링 시간을 줄인다.
 */

var getChildrenTextContent = function (children) {
    return children.map(function (node) {
        return node.children
            ? getChildrenTextContent(node.children)
            : node.text
    }).join('')
}

var anchoredHeading3 = {
    render: function (createElement) {
        // kebabCase id를 만듭니다.
        var headingId = getChildrenTextContent(this.$slots.default)
            .toLowerCase()
            .replace(/\W+/g, '-')
            .replace(/(^\-|\-$)/g, '')

        return createElement(
            /*
                이 자리에는 String|Object|Function이 들어간다.
                내용은 HTML 태그 이름, 컴포넌트 옵션 또는 함수 중 하나 이여야 하고 필수로 들어가야 한다.
             */
            'h' + this.level,
            /*
                선택사항으로 이 자리에는 템플릿에 사용할 속성에 해당하는 데이터 객체가 들어간다.
                {
                    // = v-bind:class
                    'class': {
                        underline: true
                    },
                    // = v-bind:style
                    style: {
                        text-align: center
                    },
                    // HTML 속성
                    attrs: {
                        id: 'asdf'
                    },
                    // 컴포넌트일 경우 props
                    props: {
                        message: 'bar'
                    },
                    // DOM 속성
                    domProps: {
                        innerHTML: 'baz'
                    },
                    // `v-on:keyup.enter`와 같은 수식어가 지원되지 않으나
                    // 이벤트 핸들러는 `on` 아래에 중첩됩니다.
                    // 수동으로 핸들러에서 keyCode를 확인해야 합니다.
                    on: {
                        click: this.clickHandler
                    },
                    // 컴포넌트 전용.
                    // `vm.$emit`를 사용하여 컴포넌트에서 발생하는 이벤트가 아닌
                    // 기본 이벤트를 받을 수 있게 합니다.
                    nativeOn: {
                        click: this.nativeClickHandler
                    },
                    // 사용자 지정 디렉티브.
                    // Vue는 이를 관리하기 때문에 바인딩의 oldValue는 설정할 수 없습니다.
                    directives: [
                        {
                            name: 'my-custom-directive',
                            value: '2',
                            expression: '1 + 1',
                            arg: 'foo',
                            modifiers: {
                                bar: true
                            }
                        }
                    ],
                    // 범위 지정 슬롯. 형식은
                    // { name: props => VNode | Array<VNode> } 입니다.
                    scopedSlots: {
                        default: props => createElement('span', props.text)
                    },
                    // 이 컴포넌트가 다른 컴포넌트의 자식인 경우, 슬롯의 이름입니다.
                    slot: 'name-of-slot',
                    // 기타 최고 레벨 속성
                    key: 'myKey',
                    ref: 'myRef'
                }
             */
            /*
                이 다음에는 String|Array이 들어가 VNode를 넣는다.
                createElement를 사용하거나
                문자열을 사용해 text VNode를 얻는다.
                Array를 사용할 시에 VNode를 같은 것을 사용하는 것을 제한다.
             */
            [
                createElement('a', {
                    attrs: {
                        name: headingId,
                        href: '#' + headingId
                    }
                }, this.$slots.default)
            ]
        )
    },
    props: {
        level: {
            type: Number,
            required: true
        }
    }
}

var manyP = {
    render: function (createElement) {
        return createElement('div',
            Array.apply(null, { length: this.number }).map(function () {
                return createElement('p', 'hi')
            })
        )
    },
    props: {
        number: {
            type: Number,
            required: true
        }
    }
}

var render1 = new Vue({
    el: '#render1',
    data: {
        number: 1,
        numbers: [1,2,3,4,5,6]
    },
    components: {
        'anchor-heading': anchoredHeading1,
        'right-heading': anchoredHeading2,
        'perfect-heading': anchoredHeading3,
        'lot-p': manyP
    }
})

var condition = {
    //v-if v-else를 작성함. 여기서 map은 배열을 함수를 호출한 결과로 만든 배열로 바꾸는 메소드이다.
    render: function (createElement) {
        if (this.goods.length) {
            return createElement('ul', this.goods.map(function (item) {
                return createElement('li', item)
            }))
        } else {
            return createElement('p', 'No items found.')
        }
    },
    props: ['goods']
}

var model = {
    //v-model이 없으므로 직접 구현해야 한다.
    data: function() {
        return {
            value: 'asdf'
        }
    },
    render: function (createElement) {
        var self = this
        return createElement('div', [
            createElement('input', {
                domProps: {
                    value: self.value
                },
                on: {
                    input: function (event) {
                        self.value = event.target.value
                        self.$emit('input', event.target.value)
                    }
                }
            }),
            createElement('p', self.value)
        ])
    }
}

var event = {
    render: function (createElement) {
        return createElement(
            'div',
            {
                on: {
                    /*
                        .passive = &
                        .capture = !
                        .once = ~
                        .capture.once | .once.capture = ~!
                     */
                    '~!click': function () {
                        alert('바깥 작동')
                    }
                }
            },
            [
                '바깥의 것이 먼저 작동한다.',
                createElement('br'),
                createElement(
                    'a',
                    {
                        attr: {
                            href: './render.html'
                        },
                        on: {
                            'click': function(event) {
                                alert('안 작동')
                                /*
                                    .stop = event.stopPropagation()
                                    .prevent = event.preventDefault()
                                    .self = if (event.target !== event.currentTarget) return
                                    .enter = if (event.keyCode !== 13) return
                                    .ctrl = if (!event.ctrlKey) return // ctrlKey를 altKey, shiftKey 또는 metaKey로 각각 변경
                                 */
                                event.preventDefault()
                            }
                        }
                    },
                    '링크'
                )
            ]
        )
    }
}

var simpleSlot = {
    render: function (createElement) {
        // `<div><slot></slot></div>`
        return createElement('div', this.$slots.default)
    }
}

var scopeSlot = {
    data: function () {
        return {
            user: {
                firstName: 'Sim',
                lastName: 'Yunsup',
                age: 18,
                major: 'Computer Engineering'
            }
        }
    },
    render: function (createElement) {
        // `<div><slot :user="user"></slot></div>`
        return createElement('div', [
            this.$scopedSlots.default({
                user: this.user
            })
        ])
    }
}

var scopedSlots = {
    data: function () {
        return {

        }
    },
    render (createElement) {
        return createElement('div', [
            createElement('child', {
                // 데이터 객체의 `scopedSlots`를 다음 형식으로 전달합니다
                // { name: props => VNode | Array<VNode> }
                scopedSlots: {
                    default: function (props) {
                        return createElement('span', props.user.firstName)
                    }
                }
            })
        ])
    },
    components: {
        'child': scopeSlot
    }
}

var render2 = new Vue({
    el: '#render2',
    data: {
        plusQuery: '',
        array: []
    },
    methods: {
        plusToArray: function () {
            this.plusQuery !== '' ? this.array.push(this.plusQuery) : {}
        }
    },
    components: {
        'list': condition,
        'model': model,
        'handle': event,
        'simple-slot': simpleSlot,
        'scope-slot': scopeSlot,
        'scoped-slot': scopedSlots
    }
})

//Vue와 JSX를 함께 사용하기 위해 Babel plugin를 이용할 수 있다고 한다.

/*
    이외에도 플러그인을 다음과 같이 작성하고

        MyPlugin.install = function (Vue, options) {
            // 1. 전역 메소드 또는 속성 추가
            Vue.myGlobalMethod = function () {
                // 필요한 로직 ...
            }

            // 2. 전역 에셋 추가
            Vue.directive('my-directive', {
                bind(el, binding, vnode, oldVnode) {
                    // 필요한 로직 ...
                }
                ...
            })

            // 3. 컴포넌트 옵션 주입
            Vue.mixin({
                created: function () {
                    // 필요한 로직 ...
                }
                ...
            })

            // 4. 인스턴스 메소드 추가
            Vue.prototype.$myMethod = function (options) {
                // 필요한 로직 ...
            }
            // 5. 가지고 있는 API를 제공하면서 동시에 위의 일부 조합을 주입하는 라이브러리는 require로 갖고 온다.
        }
        Vue.use(Myplugin)으로 플러그인을 사용한다.
 */

var filter = new Vue({
    el: '#filter',
    data: {
        query: ''
    },
    filters: {
        capitalize: function (value) {
            if (!value) return ''
            value = value.toString()
            return value.charAt(0).toUpperCase() + value.slice(1)
        }
    }
})