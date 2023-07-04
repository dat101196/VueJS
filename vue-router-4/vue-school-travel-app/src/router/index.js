import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
//Sử dụng lazyload ko cần import view
//Bỏ comment nếu dùng normal loading routes
// import Brazil from '@/views/Brazil.vue'
// import Hawaii from '@/views/Hawaii.vue'
// import Panama from '@/views/Panama.vue'
//
const routes = [
    { path: '/', name: 'Home', component: Home },
    //Lazy loading routes
    //Sử dụng arrow function để import view => khi nào url trỏ để view nào mới load code của view tương ứng. Do ko phải import tất cả view từ đầu nên không load tất cả view khi load/reload trang
    { path: '/destination/:id/:slug', name:'destination.show', component: () =>import('@/views/DestinationShow.vue') },
    

    //Normal loading routes
    //Phải import tất cả view từ đầu nên sẽ nặng và chậm hơn khi load/reload trang
    // { path: '/brazil', name: 'Brazil', component: Brazil },
    // { path: '/hawaii', name: 'Hawaii', component: Hawaii },
    // { path: '/panama', name: 'Panama', component: Panama },
    
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
    //Set class tùy chọn khi link được active
    // linkActiveClass: 'vue-school-active-link'
})

export default router;