import { reactive } from './reactive';
import Watcher from './watcher';
import computed from './computed';
import watch from './watch';

window.data = reactive({
    num: 1,
    detail: {
        name: '响应式原理'
    }
})

const computedData = computed(() => data.num * 2);

watch(
    () => data.num,
    (newValue,oldValue) => {
        console.log(newValue,oldValue)
    }
)

new Watcher(() => {
    document.getElementById('app').innerHTML = data.detail.name;
    document.getElementById('num').innerHTML = data.num;
    document.getElementById('computed').innerHTML = computedData.value;
})
