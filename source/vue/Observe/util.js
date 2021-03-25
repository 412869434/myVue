const defaultRE = /\{\{((?:.|\r?\n)+?)\}\}/g

export const util = {
    getValue(vm,expr) {
        let keys = expr.split('.')
        return keys.reduce((memo,current) => {
            memo = memo[current]
            return memo
        },vm)
    },
    compilerText(node,vm) { //编译文本
        node.textContent = node.textContent.replace(defaultRE,function (...args) {
            return util.getValue(vm,args[1])
        })
    }
}

export function compiler (node,vm) {
    //取出子节点
    let childNodes = node.childNodes;
    // 将类数组转换成数组
    [...childNodes].forEach(child => {
        if(child.nodeType === 1) {
            compiler(child,vm)
        }
        //3 是文本节点
        else if (child.nodeType === 3) {
            util.compilerText(child,vm)
        }
    });
}

