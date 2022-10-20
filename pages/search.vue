<template>
<div>
  <div class="search">
    <input type="text" v-model="keyword" placeholder="Search Keyword"/> <br />
    <button
        class="search button"
        @click="search"
      >Search Products</button>
  </div>


  <app-store-grid :data="search" />

</div>
</template>

<script>
import { mapGetters } from "vuex";
import AppStoreGrid from "~/components/AppStoreGrid.vue";

export default {
  components: {
    AppStoreGrid
  },
  computed: {
    ...mapGetters(["searchProducts"])
  },
  data() {
    return {
      complete: false,
      keyword: "",
      error: "",
      loading: false
    };
  },
   methods: {
    search() {
      console.log("search")
      this.loading = true;
      this.$store.dispatch("searchProducts", this.keyword)
    }
   }
};


</script>

<style lang="scss" scoped>
  .search {
    margin: 20px auto;
    justify-content: center;
  }
</style>