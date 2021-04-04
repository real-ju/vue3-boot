/* eslint-disable */
import { Store } from 'vuex';
import { Router } from 'vue-router';

declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}

declare module 'vue/types/vue' {
    interface Vue {
        $store: Store;
        $router: Router;
        Api: any;
    }
}
// declare module '@vue/runtime-core' {
//     interface ComponentCustomProperties {
//         $store: Store;
//         $router: Router;
//         Api: any;
//     }
// }