// 전역 사용자 정의 디렉티브 v-click 등록
Vue.directive('click', {
    // 바인딩 된 엘리먼트가 DOM에 삽입되었을 때
    inserted: function (el) {
        // 엘리먼트에 포커스를 줍니다
        el.click()
    }
})
//지역 사용자 정의 디렉티브 v-focuson 등록
var direct1 = new Vue({
    el: '#direct1',
    data: {
        show: true
    },
    directives: {
        focuson: {
            inserted: function (el) {
                el.focus()
            }
        }
    }
})

var direct2 = new Vue({
    el: '#direct2',
    data: {
        show: true
    },
    directives: {
        hook: {
            bind: function(el, binding){
                var s = JSON.stringify
                el.innerHTML += '디렉티브가 처음 element에 바인딩 될 때 한번만 호출 됩니다. <br>'+
                    'name: '       + s(binding.name) + '<br>' +
                    'value: '      + s(binding.value) + '<br>' +
                    'expression: ' + s(binding.expression) + '<br>' +
                    'argument: '   + s(binding.arg) + '<br>' +
                    'modifiers: '  + s(binding.modifiers) + '<br>'
            },
            inserted: function(el){
                var direct = document.getElementById('text-direct')

                direct.innerHTML += '바인딩된 element가 부모 노드에 삽입될 때 호출된다. <br>'
            },
            update: function(el, binding){
                var direct = document.getElementById('text-direct')
                var info = document.getElementById('text-info')
                var s = JSON.stringify

                direct.innerHTML += '포함하는 컴포넌트가 업데이트 된 후 호출됩니다. 자식이 업데이트 되기 전에 호출될 수도 있다.<br>'
                info.innerHTML =
                    'name: '       + s(binding.name) + '<br>' +
                    'value: '      + s(binding.value) + '<br>' +
                    'oldValue: '   + s(binding.oldValue) + '<br>' +
                    'expression: ' + s(binding.expression) + '<br>' +
                    'argument: '   + s(binding.arg) + '<br>' +
                    'modifiers: '  + s(binding.modifiers) + '<br>'
            },
            componentUpdated: function () {
                var direct = document.getElementById('text-direct')

                direct.innerHTML += '포함하고 있는 컴포넌트와 그 자식들 이 업데이트 된 후에 호출됩니다. 이외에도 unbind는 디렉티브가 언바인딩 되었을 때 호출된다.<br>'
            }
        }
    }
})