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
        components: {
            //default là router-view ko có name
            default: Home,
            //Named views. 
            //LeftSideBar là name của router-view bên trong template của App.vue
            LeftSideBar: () => import('@/components/LeftSideBar.vue'),
        },
        //Alias cho ra kết quả tương tự dùng redirect. Khi ng ta gõ host/home thì sẽ redirect vô trang Home đã đc khai báo phía trên
        alias: '/home',

    },
    //Redirect path: dùng để khai báo 1 path ko tồn tại và redirect về 1 path/trang có tồn tại để tránh trường hợp hiện NotFound
    //Đoạn khai báo dưới đẩy dùng để khi ng ta gõ host/home thì sẽ redirect vô trang Home đã đc khai báo phía trên
    // {
    //     path: '/home',
    //     redirect: to => ({ name: 'Home' })
    // },
    //Lazy loading routes
    //Sử dụng arrow function để import view => khi nào url trỏ để view nào mới load code của view tương ứng. Do ko phải import tất cả view từ đầu nên không load tất cả view khi load/reload trang
    {
        path: '/protected',
        name: 'protected',
        //Khi dùng nhiều router-view với named router-view thì ta cần dùng components để khai báo views/components cho từng router-views
        components: {
            //default là router-view ko có name
            default: () => import('@/views/Protected.vue'),
            //Named views. 
            //LeftSideBar là name của router-view bên trong template của App.vue
            LeftSideBar: () => import('@/components/LeftSideBar.vue'),
        },
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
        //-Dùng regex cho param để quy định giá trị param. Vd: :id(\\d+) nghĩa là param id chỉ được phép là số, nếu khác số sẽ trả NotFound page
        // path: '/example/:id(\\d+)',

        //-Thêm dấu + sau param để có thể thêm nhiều param và khi đó param sẽ là array với số lượng /param tương ứng, PARAM PHẢI LÀ SỐ. Vd: /:id+ khi ta gõ /1/2/3 thì param id sẽ là array 3 phần tử là 1,2,3
        // path: '/example/:id+',
        //-Kết hợp cả 2 loại trên
        //Nghĩa là param phải có ít nhất 1 cái và PHẢI LÀ SỐ tương tự thêm +
        // path: '/example/:id(\\d+)+',

        //-Thêm dấu * ở sau param thì có nghĩa là param là optional có thể thêm hoặc ko thêm cũng đc. Vd: /example thôi hoặc /example/1, example/1/2/3 đều được
        // path: '/example/:id(\\d+)*',

        //-Thêm dấu ? ở sau param thì có nghĩa là không được sử dụng param. Vd: chỉ cho phép /example thôi nếu /example/1, example/1/2/3 sẽ trả NotFound page
        path: '/example/:id(\\d+)?',
        component: () => import('@/views/Login.vue'),
    },
    {
        path: '/invoices',
        name: 'invoices',
        //Khi dùng nhiều router-view với named router-view thì ta cần dùng components để khai báo views/components cho từng router-views
        components: {
            //default là router-view ko có name
            default: () => import('@/views/Invoices.vue'),
            //Named views. 
            //LeftSideBar là name của router-view bên trong template của App.vue
            LeftSideBar: () => import('@/components/LeftSideBar.vue'),
        },
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