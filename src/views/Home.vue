<template>
  <div class="pa-0">
    <v-layout wrap>
      <v-flex xs12 md7>
        <v-layout wrap class="books pa-5">
          <v-flex class="pa-4 xs12 sm6 md6" v-for="(book, i) in books" :key="i">
            <Card
              :clearQuantity="clearQuantity"
              :book="book"
              @update-cart="updateCart"
            />
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 md5 class="table-list" v-if="$vuetify.breakpoint.mdAndUp">
        <v-layout justify-space-between wrap class="layout-table-list ">
          <v-flex xs12 class="pa-3 block-table">
            <table :key="reRender">
              <thead>
                <tr>
                  <th width="5%" class="text-center">ลำดับ</th>
                  <th width="65%" class="text-left">รายการ</th>
                  <th width="10%" class="text-center">
                    จำนวน
                  </th>
                  <th width="20%" class="text-right">
                    ราคา
                  </th>
                </tr>
              </thead>
              <tbody v-if="carts.length > 0">
                <tr v-for="(item, i) in carts" :key="item.id">
                  <td class="text-center">{{ i + 1 }}</td>
                  <td class="text-left">{{ item.title }}</td>
                  <td class="text-center">x{{ item.quantity }}</td>
                  <td class="text-right">{{ item.price }}</td>
                </tr>
                <tr>
                  <td colspan="3" class="text-right">Discount</td>
                  <td class="text-right">{{ discount }}</td>
                </tr>
                <tr>
                  <td colspan="3" class="text-right">Net</td>
                  <td class="text-right">{{ totalPrice }}</td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td colspan="4" class="text-center">
                    ไม่มีรายการ
                  </td>
                </tr>
                <tr>
                  <td colspan="3" class="text-right">Discount</td>
                  <td class="text-right">{{ discount }}</td>
                </tr>
                <tr>
                  <td colspan="3" class="text-right">Net</td>
                  <td class="text-right">{{ totalPrice }}</td>
                </tr>
              </tbody>
            </table>
            <div
              class="pa-2 ma-2"
              style="font-size: 10px;border: 1px solid #1A2238;color: #1A2238"
            >
              buy 2 unique series books discount 10% of those 2 books <br />
              buy 3 unique series books discount 11% of those 3 books<br />
              buy 4 unique series books discount 12% of those 4 books<br />
              buy 5 unique series books discount 13% of those 5 books<br />
              buy 6 unique series books discount 14% of those 6 books<br />
              buy 7 unique series books discount 15% of those 7 books<br />
            </div>
          </v-flex>

          <v-flex class="d-flex align-end">
            <v-layout justify-center align-center>
              <v-flex xs5>
                <v-btn
                  min-height="50"
                  @click="onClickClear"
                  depressed
                  tile
                  block
                  color="#1A2238"
                  dark
                >
                  ยกเลิกรายการ
                </v-btn>
              </v-flex>
              <v-flex xs7 class="d-flex align-center">
                <v-btn
                  @click="payment"
                  min-height="50"
                  depressed
                  tile
                  block
                  color="#FF6A3D"
                  dark
                >
                  <v-icon style="font-size:28px;">
                    mdi-cash-usd
                  </v-icon>
                  <span style="font-size:16px;">
                    ชําระเงิน
                  </span>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

    <template>
      <v-row justify="center">
        <v-dialog
          v-model="showCart"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <v-card color="#B0B4BC" class="table-list">
            <v-toolbar dark color="#1A2238">
              <v-btn icon dark @click="onHandleShowCart()">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>
                <span>Shiba</span> Book Shop Cart
              </v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>

            <v-layout justify-space-between wrap class="layout-table-list ">
              <v-flex xs12 class="pa-3 block-table">
                <table :key="reRender">
                  <thead>
                    <tr>
                      <th width="5%" class="text-center">ลำดับ</th>
                      <th width="65%" class="text-left">รายการ</th>
                      <th width="10%" class="text-center">
                        จำนวน
                      </th>
                      <th width="20%" class="text-right">
                        ราคา
                      </th>
                    </tr>
                  </thead>
                  <tbody v-if="carts.length > 0">
                    <tr v-for="(item, i) in carts" :key="item.id">
                      <td class="text-center">{{ i + 1 }}</td>
                      <td class="text-left">{{ item.title }}</td>
                      <td class="text-center">x{{ item.quantity }}</td>
                      <td class="text-right">{{ item.price }}</td>
                    </tr>
                    <tr>
                      <td colspan="3" class="text-right">Discount</td>
                      <td class="text-right">{{ discount }}</td>
                    </tr>
                    <tr>
                      <td colspan="3" class="text-right">Net</td>
                      <td class="text-right">{{ totalPrice }}</td>
                    </tr>
                  </tbody>
                  <tbody v-else>
                    <tr>
                      <td colspan="4" class="text-center">
                        ไม่มีรายการ
                      </td>
                    </tr>
                    <tr>
                      <td colspan="3" class="text-right">Discount</td>
                      <td class="text-right">{{ discount }}</td>
                    </tr>
                    <tr>
                      <td colspan="3" class="text-right">Net</td>
                      <td class="text-right">{{ totalPrice }}</td>
                    </tr>
                  </tbody>
                </table>
                <div
                  class="pa-2 ma-2"
                  style="font-size: 10px;border: 1px solid #1A2238;color: #1A2238"
                >
                  buy 2 unique series books discount 10% of those 2 books <br />
                  buy 3 unique series books discount 11% of those 3 books<br />
                  buy 4 unique series books discount 12% of those 4 books<br />
                  buy 5 unique series books discount 13% of those 5 books<br />
                  buy 6 unique series books discount 14% of those 6 books<br />
                  buy 7 unique series books discount 15% of those 7 books<br />
                </div>
              </v-flex>

              <v-flex class="d-flex align-end">
                <v-layout justify-center align-center>
                  <v-flex xs5>
                    <v-btn
                      min-height="50"
                      @click="onClickClear"
                      depressed
                      tile
                      block
                      color="#1A2238"
                      dark
                    >
                      ยกเลิกรายการ
                    </v-btn>
                  </v-flex>
                  <v-flex xs7 class="d-flex align-center">
                    <v-btn
                      @click="payment"
                      min-height="50"
                      depressed
                      tile
                      block
                      color="#FF6A3D"
                      dark
                    >
                      <v-icon style="font-size:28px;">
                        mdi-cash-usd
                      </v-icon>
                      <span style="font-size:16px;">
                        ชําระเงิน
                      </span>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Card from "../components/Card.vue";
import { books } from "../json/books.json";

export default {
  components: { Card },
  name: "Home",
  data() {
    return {
      books: books,
      carts: [],
      reRender: 1,
      totalPrice: 0,
      discount: 0,
      clearQuantity: false,
      dialog: false,
    };
  },
  computed: {
    ...mapState({
      showCart: (state) => state.book.showCart,
    }),
  },

  methods: {
    onHandleShowCart() {
      this.$store.commit("book/SHOW_CART");
    },
    updateCart(book, updateType) {
      this.reRender++;
      if (this.carts.length > 0) {
        const item = this.carts.filter((cart) => cart.id == book.id);
        if (item.length > 0) {
          for (let i = 0; i < this.carts.length; i++) {
            if (this.carts[i].id === book.id) {
              if (updateType === "subtract") {
                if (this.carts[i].quantity == 1) {
                  this.carts.splice(i, 1);
                  if (this.carts.length > 0) {
                    this.calculateTotal();
                  } else {
                    this.totalPrice = 0;
                    this.discount = 0;
                  }
                } else if (this.carts[i].quantity !== 0) {
                  // total
                  this.carts[i].quantity--;
                  this.carts[i].totalPrice =
                    +this.carts[i].price * +this.carts[i].quantity;
                  this.calculateTotal();
                }
              } else {
                this.carts[i].quantity++;
                this.carts[i].totalPrice =
                  +this.carts[i].price * +this.carts[i].quantity;
                this.calculateTotal();
              }
              break;
            }
          }
        } else {
          book.quantity = 1;
          book.totalPrice = book.price;
          this.addNewBook(book);
        }
      } else {
        book.quantity = 1;
        book.totalPrice = book.price;
        this.addNewBook(book);
      }
      this.$forceUpdate();
    },
    addNewBook(book) {
      this.carts.push(book);
      this.calculateTotal();
    },
    calculateTotal() {
      this.totalPrice = 0.0;
      this.carts.forEach((data) => {
        this.totalPrice += +data.price * data.quantity;
      });
      this.discount = this.calculateDiscount(this.carts).toFixed(2);
      this.totalPrice -= this.discount;
      this.totalPrice = this.totalPrice.toFixed(2);
    },
    calculateDiscount(val) {
      let discount = 0;
      if (val.length > 1) {
        switch (val.length) {
          case 2:
            for (let i = 0; i < val.length; i++) {
              discount += (+val[i].price * 10) / 100;
            }
            break;
          case 3:
            for (let i = 0; i < val.length; i++) {
              discount += (+val[i].price * 11) / 100;
            }
            break;
          case 4:
            for (let i = 0; i < val.length; i++) {
              discount += (+val[i].price * 12) / 100;
            }
            break;
          case 5:
            for (let i = 0; i < val.length; i++) {
              discount += (+val[i].price * 13) / 100;
            }
            break;
          case 6:
            for (let i = 0; i < val.length; i++) {
              discount += (+val[i].price * 14) / 100;
            }
            break;
          case 7:
            for (let i = 0; i < val.length; i++) {
              discount += (+val[i].price * 15) / 100;
            }
            break;
          default:
            for (let i = 0; i < val.length; i++) {
              discount += (+val[i].price * 15) / 100;
            }
        }
      } else {
        discount = 0;
      }

      return discount;
    },
    onClickClear() {
      this.carts = [];
      this.clearQuantity = true;
      setTimeout(() => {
        this.clearQuantity = false;
      }, 1000);
    },

    payment() {
      if (this.carts.length > 0) {
        this.$swal({
          width: "40rem",
          title: `ยอดการชำระเงินจำนวน ${this.totalPrice} บาท`,
          text: `*ร้าน "Shiba Book Shop" รับเฉพาะเงินสด`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "ชำระเงิน",
          cancelButtonText: "ยกเลิก",
          reverseButtons: true,
          confirmButtonColor: "#FF6A3D",
        }).then((result) => {
          if (result.isConfirmed) {
            this.$swal({
              icon: "warning",
              title: "กรุณาเลือกหนังสือ",
              confirmButtonColor: "#FF6A3D",
            });
            this.$store.commit("book/SET_SHOW_CART");
            this.$swal({
              width: "40rem",
              icon: "success",
              title: `ชำระเงินจำนวน ${this.totalPrice} เรียบร้อยแล้ว`,
              confirmButtonColor: "#FF6A3D",
            }).then(() => {
              if (result.isConfirmed) {
                this.carts = [];
                this.totalPrice = 0;
                this.discount = 0;
                this.clearQuantity = true;
                setTimeout(() => {
                  this.clearQuantity = false;
                }, 1000);
              }
            });
          }
        });
      } else {
        this.$swal({
          icon: "warning",
          title: "กรุณาเลือกหนังสือ",
          confirmButtonColor: "#FF6A3D",
        }).then(() => {
          this.$store.commit("book/SET_SHOW_CART");
        });
      }
    },
  },
};
</script>

<style lang="scss">
.books {
  max-height: calc(100vh - 64px);
  overflow-y: scroll;
}
.table-list {
  position: relative;
  background: #1a223857;
  color: #1a2238;
  .btn-table-list {
    position: absolute;
    bottom: 15px;
    left: 50%;
    transform: translate(-50%, 0);
  }
  .layout-table-list {
    height: calc(100vh - 64px);
  }
  table {
    // border: 3;
    thead {
      color: #fff;
      background: #1a2238d0;
      th {
        padding: 5px;
        font-size: 16px;
        font-weight: 500;
      }
    }
    tbody {
      color: #fff;
      background: #1a223857;
      td {
        padding: 5px;
        font-size: 14px;
      }
    }
  }
}
.block-table {
  overflow-y: scroll;
  height: calc(100vh - 114px);
}
</style>
