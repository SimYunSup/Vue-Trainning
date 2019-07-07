//data에 객체를 넣으면 공유한다.
var instData = { chg : 1}

var inst1 = new Vue({
    el: '#instance1',
    data: instData
})

document.getElementById('plus').addEventListener('click', function(){
    instData.chg += 1
})
document.getElementById('plusAnother').addEventListener('click', function(){
    inst1.chg += 1
})

//Object.freeze(객체 명)으로 반응성을 없앤다.
var freeze = {
    foo: 'rebar'
}
Object.freeze(freeze)

new Vue({
    el:'#instance2',
    data: freeze
})

//인스턴스 속성과 메소드에는 $을 붙인다.
var prefix = {
    a: 1,
    b: 0
}
var inst3 = new Vue({
    el: '#instance3',
    data: prefix,
    methods:{
        plusa: function () {
            a++
        }
    }
})
document.getElementById('confirm').addEventListener('click', function(){
    if(inst3.$data === prefix)
        document.getElementById('correctdata').textContent = 'True'
    if(inst3.$el === document.getElementById('instance3'))
        document.getElementById('correctel').textContent = 'True'
    inst3.a++;
})

//a가 변경되면 호출된다.
inst3.$watch('a', function(){inst3.b++})
//이외에도 여러 메소드가 있다.

//인스턴스 라이프사이클에 따라서 created, mounted, updated, destroyed의 속성은 해당 라이프사이클의 단계에서 호출된다.
//https://medium.com/witinweb/vue-js-%EB%9D%BC%EC%9D%B4%ED%94%84%EC%82%AC%EC%9D%B4%ED%81%B4-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-7780cdd97dd4
/*
    - creation : 컴포넌트가 돔에 추가되기 이전. 서버 사이드 렌더링에서도 지원되는 유일한 훅이다.
    beforeCreate : data와 event가 활성화되지 않았음
    created : data와 event만이 세팅됨.
    - mounting : 초기 렌더링 직전. 컴포넌트에 접근할 수 있다. DOM에 삽입하는 단계이다.
    beforeMount : 첫 렌더링 이전. 템플릿과 렌더 함수들이 컴파일 된 이후이다.
    mounted : 컴포넌트, 템플릿, 렌더링된 돔에 접근할 수 있다.
    여기서 주의할 점은 컴포넌트가 부모->자식 순으로 created되지만 부모의 mounted는 모든 자식이 mounted된 후에 실행된다.
    - updating : 컴포넌트에서 사용되는 반응형 속성들이 변경되거나 어떤 이유로 재 렌더링이 발생되면 실행된다. 디버깅을 위해 재 렌더링 시점을 알기 위해 사용한다.
    beforeUpdate : DOM이 재 렌더링되고 패치되기 이전의 실행된다.
    updated : 컴포넌트의 데이터가 변하여 재 렌더링이 일어난 후 실행된다.
    - destruction : 해체
    beforeDestroy : Vue instance가 제거되기 직전에 호출된다. 컴포넌트가 그대로 있어 이벤트 리스너를 제거하거나 reactive subscription을 제거하고자 할 때 사용한다.
    destroyed : Vue instance가 제거된 후 실행된다. Vue instance의 모든 derective가 binding 해제되고 이벤트 리스너가 삭제되고 모든 하위 instance가 삭제된다.
    - 별도
    activated - deactivated : keep-alive 컴포넌트가 활성화/비활성화할 때 마다 호출된다.
 */
var inst4 = new Vue({
    el:'#instance4',
    data: {
        a:1
    },
    created: function(){
        this.a++
    },
    mounted: function () {
        this.a++
    }
})