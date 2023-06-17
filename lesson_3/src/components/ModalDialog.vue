<template>
  <div @click.self="onCloseModal" class="modal-fade">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <!-- <h3>{{ title }}</h3> -->
          <slot name="header"/>
        </div>
        <div class="modal-body" :class="{ error: theme == 'error' }">
          <!-- <p>{{ body }}</p> -->
          <slot/>
        </div>
        <div class="modal-footer">
          <!-- <button
            :style="{
              display:
                theme == 'alert' || theme == 'error' ? 'none' : 'inline-block',
            }"
          >
            Yes
          </button>
          <button
            :style="{
              display:
                theme == 'alert' || theme == 'error' ? 'none' : 'inline-block',
            }"
          >
            No
          </button>
          <button
            :style="{
              display: theme == 'confirm' ? 'none' : 'inline-block',
            }"
            @click="onCloseModal"
          >
            {{ theme == "alert" || theme == "error" ? "Close" : "Cancel" }}
          </button> -->
          <slot name="footer"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      default: "",
    },
    theme: {
      type: String,
      default: "alert",
      // validator dùng để đưa code validate value đưa vô prop. Nếu ko thỏa sẽ có warning ở console
      validator(value) {
        return ["alert", "confirm", "confirm-3-options", "error"].includes(
          value
        );
      },
    },
  },
  methods: {
    onCloseModal() {
      this.$emit("cancel");
    },
  },
};
</script>
// scoped dùng để set cho các class trong style chỉ áp dụng cho riêng file này chứ ko áp dụng cho toàn project
<style scoped lang="css">
.modal-fade {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  animation: fadeIn ease-in 0.3s;
}

.modal-dialog {
  margin: auto;
  background-color: white;
  width: 500px;
  height: 300px;
}

.modal-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.modal-header {
  margin: 16px 0;
  font-weight: bold;
}

.modal-body {
  flex-grow: 1;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  padding: 16px 0;
}

.modal-body.error {
  color: red;
}

.modal-footer {
  margin: 16px 0;
}

.modal-footer button {
  min-width: 50px;
}

.modal-footer button + button {
  margin-left: 16px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>