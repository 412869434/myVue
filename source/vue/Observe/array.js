//['push','shift','unshift','pop','reverse','sort','splice']
import {
    observe
} from './index'
//获取数组原型上的方法
let oldArrayProtoMethods = Array.prototype
//复制一份 然后改新的
export let arrayMethods = Object.create(oldArrayProtoMethods)

//修改的方法
let methods = ['push','shift','unshift','pop','reverse','sort','splice']

export function observeArray (inserted) {
    //循环监听新增每一个的属性
    for (let i = 0; i < inserted.length; i++) {
        observe(inserted[i])
    }
}


methods.forEach(method => {
    arrayMethods[method] = function(...arg) {
        //不光要返回新的数组方法，还要去执行监听
        let res = oldArrayProtoMethods[method].apply(this,arg)
        //实现新增属性的监听
        //拿到新增的属性
        let inserted
        switch (method) {
            case 'push':
            case 'push':
                inserted = arg
                break;
            case 'splice':
                inserted = args.slice(2)
            default:
                break;
        }
        //实现新增属性的监听
        if(inserted) {
            observeArray(inserted)
        }
        return res
    }
})
