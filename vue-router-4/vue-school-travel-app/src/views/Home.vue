<template>
    <div class="home">
        <h1>All destinations</h1>
        <button @click="triggerRouterError">Trigger Router Error</button>
        <button @click="addDynamicRoute">Add dynamic route</button>
        <button @click="removeDynamicRoute">Remove dynamic route</button>
        <router-link to="/dynamic">Go to dynamic route</router-link>
        <p>{{ result }}</p>
        <div class="destinations">
            <router-link v-for="des in destinations" :key="des.id"
                :to="{ name: 'destination.show', params: { id: des.id, slug: des.slug } }">
                <h2>{{ des.name }}</h2>
                <img :src="`/images/${des.image}`" :alt="des.name">
            </router-link>
        </div>
    </div>
</template>   
<script setup>
import sourceData from '@/data.json';
import { ref } from 'vue'
import { useRouter, isNavigationFailure, NavigationFailureType } from 'vue-router'
const destinations = ref(sourceData.destinations);
const router = useRouter();
const triggerRouterError = async () => {
    const navigationFailure = await router.push('/');
    if (isNavigationFailure(navigationFailure, NavigationFailureType.duplicated)) {
        //Error
        //NavigationFailureType.aborted: false was returned inside of a navigation guard to the navigation.
        //NavigationFailureType.duplicated: The navigation was prevented because we are already at the target location.
        //NavigationFailureType.cancelled: A new navigation took place before the current navigation could finish. e.g. router.push was called while waiting inside of a navigation guard.
        console.log('Failure from: ', navigationFailure.from);
        console.log('Failure to: ', navigationFailure.to);
    } else {
        //Success
    }
};
let result = ref('');
const addDynamicRoute = () => {
    //Dynamic route chỉ tồn tại ở life của SPA mà nó được tạo ra, nếu ta mở route này ở tab khác hoặc refresh lại trang thì nó sẽ biến mất
    router.addRoute({
        name: 'dynamic',
        path: '/dynamic',
        component: () => import('@/views/Login.vue'),
    });
    result.value = 'Add dynamic route success';
    setTimeout(() => {
        result.value = '';
    }, 3000);
}

const removeDynamicRoute = () => {
    //Remove route = route name
    router.removeRoute('dynamic');
    result.value = 'Remove dynamic route success';
    setTimeout(() => {
        result.value = '';
    }, 3000);
}
</script>