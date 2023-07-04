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
    {
        path: '/destination/:id/:slug',
        name: 'destination.show',
        component: () => import('@/views/DestinationShow.vue'),
        // Nếu ko cần phải xử lý param trong route thì ta chỉ cần khai báo props: true như bên dưới. 
        // props: true,
        //Trường hợp cần xử lý param trong route thì ta làm như bên dưới. Những param nào cần xử lý thì destructuring cụ thể ra còn lại dùng rest parameter.
        props: route => ({ ...route.params, id: parseInt(route.params.id) }),
        children: [
            //Children route:
            //Muốn hiển thị children route thì trong template của DestinationShow.vue (parent) phải có router-view. Khi đó thay vì nhấn vô router-link để chuyển vô view được định nghĩa bên dưới thì sẽ hiện trong router-view của parent
            {
                path: ':experienceSlug',
                name: 'experience.show',
                component: () => import('@/views/ExperienceShow.vue'),
                props: route => ({ ...route.params, id: parseInt(route.params.id) })
            }
        ]
    },
    //Normal route
    // {
    //     path: '/destination/:id/:slug/:experienceSlug',
    //     name: 'experience.show',
    //     component: () => import('@/views/ExperienceShow.vue'),
    //     props: route => ({ ...route.params, id: parseInt(route.params.id) })
    // }

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