<template>
  <v-card flat outlined class="pa-6">
    <v-img
      contain
      :lazy-src="book.cover"
      height="250"
      :aspect-ratio="9 / 16"
      :src="book.cover"
    >
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular
            indeterminate
            color="grey lighten-5"
          ></v-progress-circular>
        </v-row>
      </template>
    </v-img>

    <v-card-text style="color: #1A2238; font-size: 14px" class="mx-n3">
      <div><span class="font-weight-bold">เรื่อง :</span> {{ book.title }}</div>
      <div><span class="font-weight-bold">ราคา :</span> {{ book.price }}</div>
    </v-card-text>

    <v-card-actions>
      <v-layout class="d-flex align-center justify-center">
        <v-flex
          shrink
          class="font-weight-bold"
          style="font-size: 12px;color: #1A2238;"
        >
          <v-btn
            min-width="35"
            height="35"
            color="#FF6A3D"
            depressed
            small
            class="text-capitalize pa-0 ma-0"
            dark
            @click="quantity > 0 ? updateCart(book, 'subtract') : ''"
            :loading="loading"
          >
            <v-icon>
              mdi-minus
            </v-icon>
          </v-btn>
        </v-flex>
        <v-flex shrink mx-6>
          {{ quantity }}
        </v-flex>
        <v-flex shrink>
          <v-btn
            min-width="35"
            height="35"
            color="#FF6A3D"
            depressed
            class="text-capitalize pa-0 ma-0"
            dark
            @click="updateCart(book, 'add')"
            :loading="loading"
          >
            <v-icon style="font-size:28px;">
              mdi-plus
            </v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    book: [],
    clearQuantity: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    loading: false,
    quantity: 0,
  }),
  watch: {
    clearQuantity(val) {
      if (val) {
        this.quantity = 0;
      }
    },
  },
  methods: {
    updateCart(book, type) {
      this.$emit("update-cart", book, type);
      if (type === "subtract") {
        if (this.quantity != 0) {
          this.quantity--;
        }
      } else {
        this.quantity++;
      }
    },
  },
};
</script>
