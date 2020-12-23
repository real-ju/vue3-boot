// 资源文件
import loadingImg from '@/img/loading.gif'

let app = null;

function regDirective(appInstance) {
    app = appInstance;

    loading();
}

// "加载中"指令
function loading() {
    app.directive('loading', {
        inserted: insertedOrUpdate,
        update: insertedOrUpdate
    })

    function insertedOrUpdate(el, binding) {
        if(typeof binding.value != 'boolean') {
            throw 'v-loading指令参数类型为Boolean'
        }

        if(binding.value != binding.oldValue) {
            let style = window.getComputedStyle(el);
            if(style.position == 'static') {
                el.style.position = 'relative'
            }
            if(binding.value) {
                let maskEl = document.createElement('div');
                maskEl.className = 'v-loading-dom';
                maskEl.style.width = '100%';
                maskEl.style.height = '100%';
                maskEl.style.backgroundColor = 'white';
                maskEl.style.position = 'absolute';
                maskEl.style.top = '0px';
                maskEl.style.left = '0px';
                maskEl.style.display = 'flex';
                maskEl.style.justifyContent = 'center';
                maskEl.style.alignItems = 'center';
                maskEl.style.overflow = 'hidden';
                maskEl.style.zIndex = '999';

                let imgEl = document.createElement('img');
                imgEl.src = loadingImg;

                maskEl.appendChild(imgEl);
                el.appendChild(maskEl)
            }
            else {
                let baseEl = el.querySelector('.v-loading-dom');
                if(baseEl) {
                    el.removeChild(baseEl);
                }
            }
        }
    }
}

export default regDirective
