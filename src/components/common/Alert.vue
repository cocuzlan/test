<template>
  <b-row>
    <b-col cols="12">
      <b-modal v-model="modalShow">
        <template #modal-header>
          <h3><b>{{title}}</b></h3>
        </template>
        <slot name="default">
        </slot>
        <template #modal-footer>
          <b-row>
            <b-col
              v-for="(b, i) in buttons"
              :key="i"
              :cols="buttons.length === 1 ? '12' : buttons.length === 2 ? '6' : '4'">
              <b-button :variant="b.variant" @click="buttonAction(b.click)">
                <span>{{b.text}}</span>
              </b-button>
            </b-col>
          </b-row>
        </template>
      </b-modal>
    </b-col>
  </b-row>
</template>
<script>
export default {
  components: {},
  mixins: [],
  directives: {},
  props: {
    modalShow: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    buttons: {
      type: Array,
      default: () => [
        { variant: "danger", text: "Cancelar", click: 'close' },
        { variant: "success", text: "Aceptar", click: 'save' },
      ]
    },
  },
  data: function() {
    return {};
  },
  computed: {},
  watch: {},
  filters: {},
  methods: {
    buttonAction(i){
      switch (i) {
        case 'save':
          this.$emit("accept_alert")
          break;
        case 'close':
          this.$emit("close_alert")
          break;
        default:
          this.$emit("some_method")
          break;
      }
    }
  },
  beforeCreate: function() {},
  created: function() {},
  beforeMount: function() {},
  mounted: function() {},
  beforeUpdate: function() {},
  updated: function() {},
  activated: function() {},
  deactivated: function() {},
  beforeDestroy: function() {},
  destroyed: function() {}
};
</script>
<style scoped>
</style>
