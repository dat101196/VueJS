import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      //Alias cho ra kết quả tương tự dùng redirect. Khi ng ta gõ host/home thì sẽ redirect vô trang Home đã đc khai báo phía trên
      alias: '/home'
    },
    {
      path: '/shop',
      name: 'shop',
      //Khi dùng nhiều router-view với named router-view thì ta cần dùng components để khai báo views/components cho từng router-views
      component: () => import('@/views/ShopView.vue'),
      
      children: [
        //Children route:
        //Muốn hiển thị children route thì trong template của DestinationShow.vue (parent) phải có router-view. Khi đó thay vì nhấn vô router-link để chuyển vô view được định nghĩa bên dưới thì sẽ hiện trong router-view của parent
        {
          path: ':isn/:slug',
          name: 'products.show',
          component: () => import('@/views/ProductsView.vue'),
          //Ngăn ko cho transition khi nhấn vô experience card
          meta: { transition: 'none' }
        }
      ]
    },
    {
      path: '/flower-detail/:id',
      name: 'flower-detail',
      component: () => import('../views/ProductDetailView.vue')
    },
    {
      path: '/cart-detail',
      name: 'cart-detail',
      component: () => import('../views/CartDetailView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/demo-menu-page',
      name: 'demo-menu-page',
      component: () => import('../views/DemoSideMenuView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFound.vue'),
      meta: { transition: 'none' }
    }
  ]
})

export default router
