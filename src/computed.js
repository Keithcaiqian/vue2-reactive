import Dep from "./dep";
import Watcher from "./watcher";

// 惰性取值
export default function computed(getter){
    let def = {};
    const computedWatcher = new Watcher(getter,{ 
        lazy: true, //生命lazy属性，标记 computed wathcer
    });
    Object.defineProperty(def,'value',{
        get(){
            // 重新执行getter函数
            if(computedWatcher.dirty){
                computedWatcher.evaluate();
            }

            if(Dep.target){
                computedWatcher.depend(); //把当前渲染函数的watcher收集到computedWatcher的dep中
            }
            
            return computedWatcher.value; //返回getter运行后的值
        }
    })

    return def; //使用的时候用 .value取值
}