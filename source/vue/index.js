import { compiler } from './Observe/util'
import { initstate } from './Observe'
import { Watcher} from './Observe/Watcher'


function Vue(options) { //vue中传入参数
    //初始化用户传入的选项
    this._init(options)

}

//初始化
Vue.prototype._init = function(options) {
    let vm = this
    vm.$options = options
    //重修初始化状态 data computed watch
    initstate(vm)
    //初始化 渲染页面
    if (vm.$options.el) {
        vm.$mount()
    }
}

function query(el) {
    if (typeof el === 'string') {
        return document.querySelector(el)
    }
    return el
}

Vue.prototype.$mount = function () {
    let vm = this
    let el = vm.$options.el
    el = vm.$el = query(el)//获取当前节点
    //渲染节点 通过watcher
    let updateComponet = () => {
        vm._update()
    }
    new Watcher(vm,updateComponet)
}

vm.prototype._update = function () {
    //拿到数据更新视图
    let vm = this
    let el = vm.$el
    //渲染所有元素 把内容换成数据
    let node = document.createDocumentFragment()
    let firstChild
    while(firstChild = el.firstChild) {
        node.appendChild(firstChild)
    }
    //文本替换
    compiler(node,vm)
    el.appendChild(node)    //替换完再放进去
}

export default Vue