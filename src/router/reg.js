import { asyncViewImport } from '@/config/util'

export default [
    {
        path: '/test',
        name: 'test',
        meta: {
            title: '测试',
            public: true
        },
        component: asyncViewImport('test/index.vue')
    }
]
