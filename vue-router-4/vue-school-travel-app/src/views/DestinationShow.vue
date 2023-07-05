<template>
    <div>
        <!-- Giao diện đối với trường hợp get data từ API
    Cần phải v-if để check có data mới render UI -->
        <!-- <div v-if="des">
        <section class="destination">
            <h1>{{ des.name }}</h1>
            <div class="destination-details">
                <img :src="`/images/${des.image}`" :alt="des.name">
                <p>{{ des.description }}</p>
            </div>
        </section>
        <section class="experiences">
            <h2>Top Experiences in {{ des.name }}</h2>
            <div class="cards">
                <router-link v-for="exp in des.experiences" :key="exp.slug"
                    :to="{ name: 'experience.show', params: { experienceSlug: exp.slug } }">
                    <ExperienceCard :experience="exp" />
                </router-link>
            </div>
            <router-view></router-view>
        </section>
    </div>
    <p v-else>Loading...</p> -->
        <section class="destination">
            <div class="destination-header">
                <GoBack />
                <h1 class="destination-header__title">{{ des.name }}</h1>
            </div>
            <div class="destination-details">
                <img :src="`/images/${des.image}`" :alt="des.name">
                <p>{{ des.description }}</p>
            </div>
        </section>
        <section class="experiences">
            <h2>Top Experiences in {{ des.name }}</h2>
            <div class="cards">
                <router-link v-for="exp in des.experiences" :key="exp.slug"
                    :to="{ name: 'experience.show', params: { experienceSlug: exp.slug } }">
                    <ExperienceCard :experience="exp" />
                </router-link>
            </div>
            <router-view></router-view>
        </section>
    </div>
</template>
<script setup>
import { useRoute } from "vue-router";
import { ref, watchEffect, computed } from 'vue';
import sourceData from '@/data.json';
import ExperienceCard from "@/components/ExperienceCard.vue";
import GoBack from "@/components/GoBack.vue";
const route = useRoute();

//define props
const props = defineProps({
    //id, slug, experienceSlug là property of route.params. Thay vì dùng route.params.id, route.params.slug, route.params.experienceSlug thì ta khai báo props để hứng và trong file router/index.js ta thêm props: true trong route dẫn tới trang này.
    //Lưu ý: ta cần tạo props hứng tất cả param truyền trong route để tránh warning từ vue
    id: {
        type: Number,
        required: true,
    },
    slug: String,
    experienceSlug: String,
});
//Get data from data.json file
//Dùng props.id thay thế route.params.id
// const destinationId = computed(() => parseInt(route.params.id));
const des = computed(() => {
    console.log('props.id: ', props.id);
    return sourceData.destinations.find(des => des.id == props.id)
});

console.log('props slug: ', props.slug);
console.log('props experienceSlug: ', props.experienceSlug);

//Code get data from API
//Cần tạo ref để hứng data get từ API và dùng watchEffect để theo dõi khi route param (hoặc route props) thay đổi thì thực hiện get data lại 
// let des = ref(null);
// const getDestination = async () => {
//     const response = await fetch(`https://travel-dummy-api.netlify.app/${props.slug}.json`);
//     des.value = await response.json();
//     console.log(des);
// }

// watchEffect(() => {
//     getDestination();
// });


</script>