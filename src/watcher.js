import Dep, { pushTarget, popTarget} from "./dep";
// 组件的渲染函数,computed, watch都会生成watcher
export default class Watcher{
    constructor(getter,options = {}){
        const { lazy, watch, callback } = options;

        this.getter = getter; //渲染函数 
        this.deps = [];

        this.lazy = lazy;
        this.dirty = lazy; //true时,取值时重新运行getter,false时直接用watcher的value

        this.watch = watch;
        this.callback = callback; //watch的回调函数

        if(!lazy){ //如果不是computed的直接运行get
            this.get();
        }
    }

    // 运行渲染函数
    get(){
        pushTarget(this); //Dep.target设置成当前watcher实例
        this.value = this.getter(); //运行渲染函数，Dep会收集依赖（存入watcher）
        popTarget();
        return this.value;
    }

    addDep(dep){
        // watcher储存dep
        this.deps = this.deps.filter(item => item !== dep);
        this.deps.push(dep);
        // dep储存watcher
        dep.addSub(this)
    }
    // 触发computed的get时，Dep.target变为computed的watcher,dep收集这个watcher
    // dep触发notify时，会运行这个watcher的update,把dirty设为true
    // 当有渲染函数再次触发computed的get，则会运行evaluate,重新运行get
    depend(){
        this.deps.forEach(dep => dep.depend());
    }
    // computed从新获取值
    evaluate(){
        this.value = this.get();
        this.dirty = false; //false时等待取值时执行返回this.value
    }

    // 数据更新后，运行
    update(){
        if(this.lazy){
            this.dirty = true; //计算属性的更新，直接把dirty改为true,下次取值重新运行get
        }
        else if(this.watch){
            const oldValue = this.value;
            this.get();
            this.callback(this.value,oldValue)
        }
        else {
            this.get();
        }
    }
}