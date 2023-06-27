//Học các event mouse
const app = Vue.createApp({
    data() {
        return {
            x: 0,
            y: 0
        }
    },
    methods: {
        onLogEvent(event, newX = 0, newY = 0){
            console.log('onLogEvent: ', event);
            this.x = newX; 
            this.y = newY;
        },
        onMouseMoveEvent(event){
            console.log('onMouseMoveEvent: ', event);
            this.x = event.offsetX;
            this.y = event.offsetY;
        }
    },
});

app.mount('#body-container');