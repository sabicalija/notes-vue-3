const { createApp } = Vue;
createApp({
  data() {
    return {
      notes: [],
      title: "",
      text: "",
    };
  },
  methods: {
    add() {
      if (this.title || this.text) {
        this.notes.push(createNote(this.title, this.text));
        this.title = "";
        this.text = "";
      }
    },
    del(id) {
      const position = this.notes.findIndex((note) => note.id === id);
      this.notes.splice(position, 1);
    },
  },
  watch: {
    notes: {
      handler(val) {
        localStorage.setItem("notes", JSON.stringify(val));
      },
      deep: true,
    },
  },
  created() {
    this.notes = JSON.parse(localStorage.getItem("notes")) || [];
    registerServiceWorker();
  },
}).mount("#app");

function createNote(title, text) {
  const id = generateId(title, text);
  return { id, title, text };
}

function generateId(title, text, length = 10) {
  return CryptoJS.SHA256(title + text + new Date())
    .toString()
    .substring(0, length);
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/notes-vue-3/sw.js", { scope: "/notes-vue-3/" })
      .then((registration) => console.log("Service Worker registered!", registration))
      .catch((error) => console.log("Service Worker registration failed!", error));
  }
}
