<template>
  <b-row>
    <b-col cols="12">
      <b-table
        :fields="fields"
        :items="items"
        :responsive="responsive"
      >
        <template v-for="field in fields" v-slot:[`cell(${field.key})`]="data">
          <slot :name="field.key" v-bind="data">{{ data.item[field.key] }}</slot>
        </template>
      </b-table>
      <b-row>
        <b-col cols="4" offset="8">
          <b-pagination
            pills 
            :total-rows="totalElements"
            :per-page="10"
            :value="currentPage"
            @input="emitPageValue"
          >
          </b-pagination>
        </b-col>
      </b-row>
      Now you see: <b>{{items.length}}</b>{{' '+(items.length == 1?'element':'elements')}} 
    </b-col>
  </b-row>
</template>
<script>
export default {
  components: {},
  mixins: [],
  directives: {},
  props: {
    fields: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      default: () => []
    },
    responsive: {
      type: Boolean,
      default: true
    },
    totalElements: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 0
    },
  },
  data: function() {
    return {
      perPage: 2,
      perPages: [
        1,
        2,
        5,
        10,
        20,
        100,
      ]
    };
  },
  computed: {},
  watch: {},
  filters: {},
  methods: {
    emitPageValue(page){
      this.$emit("update:page", page);
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
