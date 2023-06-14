//Học cách tạo vue js app
//Sử dụng template để render html
//Học cách tạo và sử dụng data vô html
//Học cách tạo hàm và sử dụng hàm, sử dụng current context (this) trong hàm
const app = Vue.createApp({
    template: `<h1>Hello from {{teamName}} and {{ isShowName ? firstName + " " + lastName : "" }}</h1>
    <button @click="onChangeName">Change Name</button>
    <div class="modal" v-if="isShowModal">
        <h1>Modal content</h1>
    </div>`,
    data() {
        return {
            teamName: "Atom",
            firstName: "Tam",
            lastName: "Dang Anh",
            isShowName: true,
            isShowModal: false
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