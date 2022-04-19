import Dep from './dep';

// 简单实现 默认传入的都是对象(假装typeof 出来的都是对象 没有数组)
export function reactive(data){
    if(typeof data === 'object'){
        Object.keys(data).forEach(key => {
            defineReactive(data,key)
        })
    }
    return data;
}

// 定义响应式
function defineReactive(data,key){
    let val = data[key];

    const dep = new Dep();
    Object.defineProperty(data,key,{
        get(){
            dep.depend();
            return val
        },
        set(newVal){
            if(newVal === val) return;
            val = newVal;
            dep.notify();
        }
    })

    if(typeof val === 'object'){
        reactive(val)
    }
}

