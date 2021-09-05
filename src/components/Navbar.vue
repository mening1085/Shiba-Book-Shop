<template>
  <div>
    <v-app-bar app color="#1A2238" dark>
      <v-layout class=" d-flex align-center justify-space-between">
        <div
          class="d-flex align-center"
          @click="$router.push('/')"
          style="cursor: pointer"
        >
          <div style="color: #fff;font-size: 26px;" class="font-weight-bold">
            <span>Shiba</span> Book Shop
          </div>
        </div>

        <div v-if="$vuetify.breakpoint.smAndDown" class="d-flex align-center">
          <v-btn
            @click="onHandleShowCart()"
            min-height="50"
            depressed
            tile
            block
            icon
            dark
          >
            <v-icon style="font-size:28px;">
              mdi-cart
            </v-icon>
          </v-btn>
        </div>
      </v-layout>
    </v-app-bar>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: () => ({
    items: [
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me 2" },
    ],
    isMobile: false,
    windowWidth: window.innerWidth,
  }),
  computed: {
    ...mapState({
      showCart: (state) => state.book.showCart,
    }),
  },
  watch: {
    windowWidth(newWidth) {
      if (newWidth >= 960) {
        this.$store.commit("book/SET_SHOW_CART");
      }
    },
  },

  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
    },
    onHandleShowCart() {
      this.$store.commit("book/SHOW_CART");
    },
  },
};
</script>

<style>
@media only screen and (max-width: 600px) {
  .search {
    display: none;
  }
}
</style>
