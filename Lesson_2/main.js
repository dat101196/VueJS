//Học các event mouse
const app = Vue.createApp({
    data() {
        return {
            classTest: "active active-2",
            products: [
                {
                    thumb: "./assets/img/app_gallery.png",
                    name: "Sản phẩm 1",
                    price: 10,
                    inCart: false
                },
                {
                    thumb: "./assets/img/app_store.png",
                    name: "Sản phẩm 2",
                    price: 20,
                    inCart: false
                },
                {
                    thumb: "./assets/img/empty-cart.png",
                    name: "Sản phẩm 3",
                    price: 30,
                    inCart: false
                },
                {
                    thumb: "./assets/img/google_play.png",
                    name: "Sản phẩm 4",
                    price: 40,
                    inCart: false
                }
            ]
        }
    },
    methods: {
        onToggleCart(event, product) {
            product.inCart = !product.inCart
            event.target.textContent = product.inCart ? "Remove to cart" : "Add to cart";
        }
    },
    computed: {
        productFilters() {
            return this.products.filter(product => {
                return product.price < 30;
            })
        }
    }
});

app.mount('#body-container');