import { createApp } from "vue";

createApp({
  data() {
    return {
      message: "If you see this message in your browswer, that means Vue is successfully mounted! 🙌"
    }
  }
}).mount('#todosContainer');
