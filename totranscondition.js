//watch속성을 통해 애니메이션 효과를 사용하고 있다.
//트랜지션을 재사용할 수 있게 한다.
var countNumber = {
    template: '<p>{{ changingValue }}</p>',
    props: {
        value: {
            type: Number,
            required: true
        }
    },
    data: function() {
        return {
            changingValue: 0
        }
    },
    watch: {
        value: function (newValue, oldValue) {
            this.changeNumber(oldValue, newValue)
        }
    },
    mounted: function() {
        this.changeNumber(0, this.value)
    },
    methods: {
        changeNumber: function(startValue, endValue) {
            var vm = this
            function animate () {
                if (TWEEN.update()) {
                    requestAnimationFrame(animate)
                }
            }

            new TWEEN.Tween({ changingValue: startValue })
                .easing(TWEEN.Easing.Quadratic.Out)
                .to({ changingValue: endValue }, 500)
                .onUpdate(function () {
                    vm.changingValue = this.changingValue.toFixed(0)
                })
                .start()

            animate()
        }
    }
}

var cond1 = new Vue({
    el: '#count-number',
    data: {
        number: 30
    },
    components: {
        'count-number': countNumber
    }
})

var Color = net.brehaut.Color

var serchColor = new Vue({
    el: '#search-color',
    data: {
        colorQuery: '',
        color: {
            red: 0,
            green: 0,
            blue: 0,
            alpha: 1
        },
        tweenedColor: {}
    },
    created: function () {
        this.tweenedColor = Object.assign({}, this.color)
    },
    watch: {
        color: function () {
            function animate () {
                if (TWEEN.update()) {
                    requestAnimationFrame(animate)
                }
            }

            new TWEEN.Tween(this.tweenedColor)
                .to(this.color, 750)
                .start()

            animate()
        }
    },
    computed: {
        tweenedCSSColor: function () {
            return new Color({
                red: this.tweenedColor.red,
                green: this.tweenedColor.green,
                blue: this.tweenedColor.blue,
                alpha: this.tweenedColor.alpha
            }).toCSS()
        }
    },
    methods: {
        updateColor: function () {
            this.color = new Color(this.colorQuery).toRGB()
            this.colorQuery = ''
        }
    }
})