import Observe from './observe'

export function initstate(vm) {
    //做不同的初始化工作
    let opts = vm.$options
    if (opts.data) {
        initData(vm)
    }
    if (opts.computed) {
        initComputed()
    }
    if (opts.watch) {
        initWatch()
    }
}

export function observe(data) {
    //判断data是否是对象
    if(typeof data !== 'object' || data == null){
        return
    }
    return new Observe(data)  //观察数据的业务逻辑
}

function proxy(vm,source,key) {
    Object.defineProperty(vm,key, {
        get() {
            return vm[source][key]
        },
        set(newValue) {
            return vm[source][key] = newValue
        }
    })
}

function initData(vm) {
    //获取用户传入的data
    let data = vm.$options.data
    //判断是否是函数
    //把数据赋值给vm._data 方便观察
    vm._data = typeof data === 'function' ? data.call(vm) : data || {}
    //其实是vm._data 代理了 vm的操作
    for(let key in data) {
        Proxy(vm,'_data',key)
    }
    //观察数据
    observe(data)

}

function initComputed() {
}

function initWatch() {
}