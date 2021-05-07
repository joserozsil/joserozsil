const app = new Vue({
  el: "#index",
  http: {
    emulateJSON: true,
    emulateHTTP: true,
  },
  mounted() {
    this.saveView();
  },
  data: {},
  methods: {
    saveView() {},
    downloadCv() {},
  },
});
