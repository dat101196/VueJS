//Học cách tạo vue js app
//Sử dụng template để render html
//Học cách tạo và sử dụng data vô html
//Học cách tạo hàm và sử dụng hàm, sử dụng current context (this) trong hàm
const app = Vue.createApp({
    template: `<h1>Hello from {{teamName}} and {{ isShowName ? firstName + " " + lastName : "" }}</h1>
    <button @click="onChangeName">Change Name</button>
    <div class="modal" v-if="isShowModal">
        <h1>Modal content</h1>
    </div>
    <!-- template dùng để wrap html bên trong và template chỉ vue hiểu chứ ko phải html tag => khi cần dùng v-if cho 1 nhóm UI mà ko muốn dùng thẻ html wrap thì dùng template wrap với v-if => khi v-if = true thì vue sẽ render code bên trong template chứ ko xuất hiện thẻ template -->
    <template v-if="isShowModal">
        <div>menu 1</div>
        <div>menu 1</div>
        <div>menu 1</div>
        <div>menu 1</div>
        <div>menu 1</div>
    </template>`,
    data() {
        return {
            teamName: "Atom",
            firstName: "Tam",
            lastName: "Dang Anh",
            isShowName: true,
            isShowModal: true
        }
    },
    methods: {
        onChangeName() {
            console.log(this);
            this.firstName = "Atom";
            this.lastName = "Dang";
            this.isShowModal = !this.isShowModal;
        },
    },
});

app.mount('#contact');