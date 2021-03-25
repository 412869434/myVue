import { popTarget, pushTarget } from "./dep"

let id = 0
class Watcher {
    constructor(vm,exprOrfn,cb = () => {}, opts) {
        this.vm = vm
        this.exprOrfn = exprOrfn
        this.cb = cb
        this.deps = []
        this.depsId = new Set()
        this.id = id++
        if (typeof exprOrfn === 'function') {
            this.getter = exprOrfn
        }
        this.get()  //默认创建一个watcher 会调用自身的get方法
    }
    get() {
        //渲染watcher
        pushTarget(this)    //dep.target = watcher
        this.getter()   //当获取属性的时候 调用
        popTarget()
    }
    update() {
        this.get()
    }
    addDep(dep) {
        let id = dep.id
        if (!this.depsId.has(id)) {
            this.depsId.add(id)
            // 当前的watcher 记录当前的dep
            this.deps.push(dep)
            dep.addSub(this)
        }
    }
}

export default Watcher