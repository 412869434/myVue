import { oberse } from "."
import { 
    arrayMethods,
    observeArray
} from "./array"
import Dep from "./dep"

class Observe {
    constructor(data) { //data就是vue里面定义的data vm._data
        //实现监听，讲用户的数据使用defineProperty定义
        if (Array.isArray(data)) {
            data.__proto__ = arrayMethods
            //只能拦截数组的方法，数组里的每一项还要监听
            observeArray(data)
        }
        else{
            this.walk(data)
        }       
    }
    walk(data) {
        let keys = Object.keys(data)
        for(let i = 0;i < keys.length; i++) {
            let key = keys[i]   //所有的key
            let value = data[keys[i]] //所有的value
            defineReactive(data,key,value)
        }
    }
}

export function defineReactive(data,key,value) {
    //贯彻value是不是一个对象,如果是一个对象，递归监听
    oberse(value)
    let dep = new Dep()
    Object.defineProperty(data,key,{
        get() {
            //console.log('获取数据');
            if(Dep.target) {
                // 在watcher里面记录dep 也要在dep里面记录watcher
                dep.depend()
                //dep.addSub(watcher)
            }
            return value
        },
        set(newValue) {
            console.log('设置数据');
            if(newValue === value) return
            // 有可能你设置的时候 也是一个对象
            oberse(newValue)
            value = newValue
            //当属性设置的时候
            dep.notify()
        }
    })
}

export default Observe