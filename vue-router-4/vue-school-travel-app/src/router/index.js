import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import sourceData from '@/data.json'
//Sử dụng lazyload ko cần import view
//Bỏ comment nếu dùng normal loading routes
// import Brazil from '@/views/Brazil.vue'
// import Hawaii from '@/views/Hawaii.vue'
// import Panama from '@/views/Panama.vue'
//
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    //Lazy loading routes
    //Sử dụng arrow function để import view => khi nào url trỏ để view nào mới load code của view tương ứng. Do ko phải import tất cả view từ đầu nên không load tất cả view khi load/reload trang
    {
        path: '/protected',
        name: 'protected',
        component: () => import('@/views/Protected.vue'),
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login.vue'),
    },
    {
        path: '/invoices',
        name: 'invoices',
        component: () => import('@/views/Invoices.vue'),
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/destination/:id/:slug',
        name: 'destination.show',
        component: () => import('@/views/DestinationShow.vue'),
        // Nếu ko cần phải xử lý param trong route thì ta chỉ cần khai báo props: true như bên dưới. 
        // props: true,
        //Trường hợp cần xử lý param trong route thì ta làm như bên dưới. Những param nào cần xử lý thì destructuring cụ thể ra còn lại dùng rest parameter.
        props: route => ({ ...route.params, id: parseInt(route.params.id) }),
        //Hàm gọi trước khi enter vô route này
        beforeEnter: (to, from) => {
            //Check data có tồn tại ko nếu ko thì chuyển sang page/view NotFound thay vì nhảy vô route này mà ko có nội dung hiện lên
            const exists = sourceData.destinations.find(des => des.id === parseInt(to.params.id));
            if (!exists) return {
                name: 'NotFound',
                //Allows keeping the URL while rendering a different page
                params: { pathMatch: to.path.split('/').slice(1) },
                query: to.query,
                hash: to.hash
            }
        },
        children: [
            //Children route:
            //Muốn hiển thị children route thì trong template của DestinationShow.vue (parent) phải có router-view. Khi đó thay vì nhấn vô router-link để chuyển vô view được định nghĩa bên dưới thì sẽ hiện trong router-view của parent
            {
                path: ':experienceSlug',
                name: 'experience.show',
                component: () => import('@/views/ExperienceShow.vue'),
                props: route => ({ ...route.params, id: parseInt(route.params.id) }),
                //Ngăn ko cho transition khi nhấn vô experience card
                meta: { transition: 'none' },
            }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/NotFound.vue'),
        meta: { transition: 'none' },
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
    //
    scrollBehavior(to, from, savedPosition) {
        //Scroll to top khi chuyển trang
        // return savedPosition || { top: 0 }
        //Scroll to top sau 1 khoảng thời gian nhất định. Sử dụng khi có dùng route transition, chờ transition xong thì mới scroll, khoảng thời gian timeout = thời gian thực hiện transition hoặc cân chỉnh cho phù hợp
        console.log('scrollBehavior - to:', to.name);
        if (to.name == "experience.show") {
            //Ngăn ko cho scroll to top khi nhấn vô experience card
            console.log('savedPosition: ', savedPosition);
            return savedPosition;
        } else {
            console.log('top');
            return savedPosition || new Promise(resolve => {
                setTimeout(() => resolve({ top: 0 }), 400);
            })
        }
    }
})

router.beforeEach((to, from) => {
    if (to.meta.requiresAuth && !window.user) {
        //Need to login if not already logged in
        return { name: 'login', query: { redirect: to.fullPath } }
    }
});
export default router;