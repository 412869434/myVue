//默认 source/vue
import Vue from 'vue'

let vm = new Vue({
    el: '#app',
    data() {
        return {
            msg: 'hello',
            haha: {
                a:1
            },
            arr: [1,2,3]
        }
    },
    computed: {},
    watch: {}
})

console.log(vm);