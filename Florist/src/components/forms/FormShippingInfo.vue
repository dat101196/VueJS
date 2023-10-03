<template>
    <div class="grid">
        <div class="row">
            <div class="col l-8 m-7 s-12">
                <FormField type="text" title="Họ tên" value="Atom" />
            </div>
            <div class="col l-4 m-5 s-12">
                <FormField type="number" title="Điện thoại" placeholder="0773772222" />
            </div>
        </div>
        <div class="row">
            <div class="col l-12 m-12 s-12">
                <FormField type="text" title="Địa chỉ chi tiết (Tòa nhà, số nhà, tên đường, khu phố)"
                    placeholder="Tòa nhà 90/5A Yên Thế" />
            </div>
        </div>
        <div class="row">
            <div class="col l-4 m-12 s-12">
                <div class="field-container">
                    <p class="field-title">Tỉnh/Thành phố</p>
                    <select @change="onCityChange($event)">
                        <option value="0">Chọn tỉnh/thành phố</option>
                        <option v-for="city in cities" :key="city.code" :value="city.code">{{ city.name }}</option>
                    </select>
                </div>
            </div>
            <div class="col l-4 m-12 s-12">
                <div class="field-container">
                    <p class="field-title">Quận/Huyện</p>
                    <select @change="onDistrictChange($event)">
                        <option value="0">Chọn quận/huyện</option>
                        <option v-for="district in districts" :key="district.code" :value="district.code">{{ district.name
                        }}</option>
                    </select>
                </div>
            </div>
            <div class="col l-4 m-12 s-12">
                <div class="field-container">
                    <p class="field-title">Phường/Xã</p>
                    <select @change="onWardChange($event)">
                        <option value="0">Chọn phường/xã</option>
                        <option v-for="ward in wards" :key="ward.code" :value="ward.code">{{ ward.name }}</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import FormField from "@/components/controls/FormField.vue"
import { useAddressStore } from "@/stores/AddressData"
import { storeToRefs } from "pinia";
const store = useAddressStore()
const { cities, districts, wards } = storeToRefs(store)
console.log("List city: ", cities)
console.log("List districts: ", districts)
console.log("List wards: ", wards)
function onCityChange(event: Event) {
    const el = event.target as HTMLSelectElement
    console.log("[onCityChange] Select: ", el.value)
    const cityCode = parseInt(el.value)
    store.setSelectedCity(cityCode)
}

function onDistrictChange(event: Event) {
    const el = event.target as HTMLSelectElement
    console.log("[onDistrictChange] Select: ", el.value)
    const districtCode = parseInt(el.value)
    store.setSelectedDistrict(districtCode)
}

function onWardChange(event: Event) {
    const el = event.target as HTMLSelectElement
    console.log("[onWardChange] Select: ", el.value)
    const wardCode = parseInt(el.value)
    store.setSelectedWard(wardCode)
}
</script>

<style scoped>
.field-container {
    margin: 5px 0;
}

.field-container select{
width: 100%;
}
.field-title {
    font-size: 1.6rem;
}
</style>