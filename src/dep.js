export default class Dep {
    constructor(){
        // 收集watcher
        this.subs = [];
    }

    addSub(watcher){
        this.subs = this.subs.filter(item => item !== watcher);
        this.subs.push(watcher);
    }

    // 收集依赖
    depend(){
        if(Dep.target){
            Dep.target.addDep(this)
        }
    }

    // 通知依赖数据变化
    notify(){
        this.subs.forEach(watcher => {
            watcher.update();
        })
    }
}

Dep.target = null;

// watcher栈,比如父子组件嵌套时，会把父组件watcher放入栈中
const targetStack = [];

export function pushTarget(target){
    if(Dep.target){
        targetStack.push(Dep.target)
    }
    Dep.target = target;
}

export function popTarget(){
    Dep.target = targetStack.pop()
}