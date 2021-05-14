import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
export const store = new Vuex.Store({
    state: {
      alert: {
        state: false,
        title: "",
        image: false
      }
    },
    getters: {},
    mutations: {
      open(state, o) {
        if (o.name === "alert") {
          state[o.name].title = o.title;
          // state[o.name].description.text = o.text;
          // state[o.name].buttons = o.buttons;
        }
        state[o.name].state = true;
      },
      close(state, o){
        state[o.name].state = false;
      }
    },
    actions: {}
})