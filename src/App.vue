<template>
  <div id="app">
    <alert
      :modalShow="$store.state.alert.state"
      :title="$store.state.alert.title"
      @close_alert="closeAlert"
      @accept_alert="copyBoard"
      :buttons="button">
      <template v-slot:default>
        <b-row v-if="showPicture">
          <b-col cols="12">
            <b-img
              ref="image"
              :src="image.cropped_picture"
              :alt="image.id">
            </b-img>
            <b-row>
              <b-col cols="12">
                <b>Author: {{image.author}}</b>
              </b-col>
              <b-col cols="12">
                <b>Camera: {{image.camera}}</b>
              </b-col>
              <b-col cols="12">
                {{image.tags}}
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row v-else>
          {{image}}
          <b-col>
            <span>{{error}}</span>
          </b-col>
        </b-row>
      </template>
    </alert>
    <b-row >
      <b-col v-if="images.length > 0" cols="8" offset="2">
        <data-table
          :fields="fields"
          :items="images"
          @update:page="updatePage"
          :totalElements="total"
          :currentPage="page">
          <template slot="id" slot-scope="data">
            <span class="material-icons md-dark" style="cursor:pointer" @click="showImage(data.item.id)">visibility</span>
          </template>
        </data-table>
      </b-col>
      <b-col v-else>
        Sorry, the pictures not load correct. Refresh a page.
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Alert from "./components/common/Alert"
import axios from 'axios'
import DataTable from './components/common/DataTable.vue'
export default {
  name: 'App',
  components: {
    Alert,
    DataTable
  },
  data: function() {
    return {
      error: "",
      token: "",
      fields: [
        { key: "id", label: "ID", class: "text-center" },
      ],
      button: [
        { variant: "danger", text: "Cancelar", click: 'close' },
        { variant: "primary", text: "Sharing", click: 'save' },
      ],
      images: [],
      showPicture: false,
      image: {},
      page: 2,
      total: 0
    };
  },
  methods:{
    copyBoard(){
      navigator.clipboard.writeText(this.$refs.image.currentSrc);
    },
    closeAlert(){
      this.showPicture = false;
      this.$store.commit("close", { name: "alert" });
    },
    loadToken(){
      const config = {
        url: "http://interview.agileengine.com/auth",
        method: 'post',
        data: {
          apiKey: "23567b218376f79d9415"
        },
        timeout:20000
      };
      axios(config)
      .then(success => {
        this.token = success.data.token;
        this.loadImages();
      }).catch(error => {
        this.error = error.data.message;
        this.$store.commit("open", { name: "alert", title: "Sorry!" });
        setTimeout(() => {
          this.$store.commit("close", { name: "alert" }) 
        }, 4000);
      })
    },
    updatePage(i){
      this.page = i;
      this.loadImages()
    },
    loadImages(){
      const configImages = {
        url: "http://interview.agileengine.com/images?page="+this.page,
        method: 'get',
        headers:{
          'Authorization':'Bearer '+this.token,
        },
        timeout:20000
      };
      this.images = []
      axios(configImages)
      .then(success => {
        // this.images = []
        this.total = success.data.pageCount
        if (success.data.pictures.length>0) {
          success.data.pictures.forEach(o => {
            this.images.push({
              id: o.id,
              src: o.cropped_picture
            })
          });
        } else {
          this.error = "Sorry any pictures found";
          this.$store.commit("open", { name: "alert", title: "Sorry!" });
          setTimeout(() => {
            this.$store.commit("close", { name: "alert" }) 
          }, 4000);
        }
      }).catch(error => {
        this.error = error.data.message;
        this.$store.commit("open", { name: "alert", title: "Sorry!" });
        setTimeout(() => {
          this.$store.commit("close", { name: "alert" }) 
        }, 4000);
      })
    },
    showImage(i){
      const configImage = {
        url: "http://interview.agileengine.com/images/"+i,
        method: 'get',
        headers:{
          'Authorization':'Bearer '+this.token,
        },
        timeout:20000
      };
      
      axios(configImage)
      .then(success => {
        this.image = success.data;
        this.showPicture = true;
        this.$store.commit("open", { name: "alert", title: "Image!" });
      }).catch(error => {
        this.error = error.data.message;
        this.$store.commit("open", { name: "alert", title: "Sorry!" });
        setTimeout(() => {
          this.$store.commit("close", { name: "alert" }) 
        }, 4000);
      })
    }
  },
  mounted:function(){
    this.loadToken()
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
