<script>
  import axios from 'axios'
  export default {
    computed: {
      filteredProductByID() {
        if (this.dataResult === null) {
          return []
        }

        return this.dataResult.find((obj) => obj.id === +this.$route.params.id)
      },
      isFavorite() {
        return this.$store.state.favorites[this.$route.params.id] !== undefined
      }
    },
    created() {
      axios.get('/products.json').then((result) => {
        this.dataResult = result.data.products
      })
    },
    data() {
      return {
        dataResult: null,
        reviewFlag1: 'black',
        reviewFlag2: 'black',
        reviewFlag3: 'black',
        reviewFlag4: 'black',
        reviewFlag5: 'black',
        show: true,
        showAll: false
      }
    },
    methods: {
      addToCart() {
        this.$store.commit('addToCart', this.filteredProductByID)
        this.$store.commit('openCart')
      },
      addOrRemoveFavorite() {
        this.$store.commit('addOrRemoveFavorites', this.filteredProductByID)
      },
      review(i) {
        /* eslint-disable no-fallthrough */
        switch (i) {
          case 4:
            this.reviewFlag5 = '#9857C2'
          case 3:
            this.reviewFlag4 = '#9857C2'
          case 2:
            this.reviewFlag3 = '#9857C2'
          case 1:
            this.reviewFlag2 = '#9857C2'
          case 0:
            this.reviewFlag1 = '#9857C2'
        }

        switch (i) {
          case 0:
            this.reviewFlag2 = 'black'
          case 1:
            this.reviewFlag3 = 'black'
          case 2:
            this.reviewFlag4 = 'black'
          case 3:
            this.reviewFlag5 = 'black'
        }
        /* eslint-enable no-fallthrough */
      }
    }
  }
</script>

<template>
  <b-card
    no-body
    class="overflow-hidden"
    style="
      width: 90%;
      margin-left: auto;
      margin-right: auto;
      margin-top: 50px;
      padding: 40px;
      border: 1px solid #000;
    "
  >
    <b-container class="productPage">
      <b-row class="g-0">
        <b-col md="4">
          <b-card-img
            :src="filteredProductByID.image"
            :alt="filteredProductByID.name"
            class="rounded-0"
          />
        </b-col>
        <b-col md="7">
          <b-card-body :title="filteredProductByID.name">
            <b-card-text id="desktopDescription">
              {{ filteredProductByID.description }}
            </b-card-text>
            <b-card-text v-if="show"
              ><div id="mobileDescription">
                {{ filteredProductByID.description }}
              </div>
              <button
                class="showButton"
                @click=";(show = !show), (showAll = !showAll)"
              >
                Read more
              </button>
            </b-card-text>
            <b-card-text id="mobileFullDescription" v-if="showAll">
              {{ filteredProductByID.description }}
              <button
                class="showButton"
                @click=";(show = !show), (showAll = !showAll)"
              >
                Read less
              </button>
            </b-card-text>

            <b-row style="justify-content: center; align-items: center">
              <b-col md="6">
                <b-card-text
                  v-if="filteredProductByID.sale_price"
                  style="line-height: 2.4; text-align: center"
                >
                  <span class="sales"
                    >{{ filteredProductByID.sale_price }}€</span
                  >
                  <span class="line-throw"
                    >{{ filteredProductByID.price }}€</span
                  >
                </b-card-text>

                <b-card-text
                  v-else
                  style="line-height: 2.4; text-align: center"
                >
                  {{ filteredProductByID.price }}€
                </b-card-text>
              </b-col>
              <div
                class="stock"
                style="color: #1d8600"
                v-if="filteredProductByID.items_available > 10"
              >
                <svg
                  width="29"
                  height="26"
                  viewBox="0 0 32 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.935 8.95861L14.3749 0.539313C14.6154 -0.285434 15.7838 -0.113612 15.7838 0.711135V23.8041C15.7838 24.2508 15.3714 24.5944 14.9247 24.4913L3.13769 21.914C2.82841 21.8453 2.58786 21.5704 2.58786 21.2267V9.71462C2.58786 9.30225 2.89714 8.99297 3.30951 8.99297H11.935V8.95861ZM13.1377 9.88645C13.069 10.1957 12.7597 10.4019 12.4505 10.4019H4.03117V20.6425L14.3749 22.8762V5.72835L13.1377 9.88645ZM14.1 1.53588L3.82498 2.66991L1.69438 8.95861H11.9006L14.1 1.53588ZM12.4505 10.4019H0.697814C0.216711 10.4019 -0.126933 9.92081 0.044889 9.47407L2.65659 1.77643C2.72532 1.50152 2.96587 1.29533 3.24078 1.29533L15.0278 0.0238463C15.5089 -0.0448827 15.9213 0.43622 15.7838 0.917322L13.1721 9.88645C13.069 10.1957 12.7597 10.4019 12.4505 10.4019ZM27.1928 8.95861C27.6052 8.95861 27.9145 9.30225 27.9145 9.68026V16.5532C27.9145 16.9655 27.6052 17.2748 27.1928 17.2748C26.7804 17.2748 26.4712 16.9655 26.4712 16.5532V10.4019H17.6739C17.3646 10.4019 17.0897 10.1957 16.9866 9.88645L15.7838 5.72835V22.8762L20.2512 21.914C20.6292 21.8453 21.0072 22.0858 21.0759 22.4638C21.179 22.8418 20.9385 23.2199 20.5605 23.2886L15.1996 24.457C14.7529 24.5601 14.3405 24.2164 14.3405 23.7697V0.711135C14.3405 -0.113612 15.5089 -0.285434 15.7494 0.539313L18.1893 8.95861H27.1928ZM17.6739 10.4019C17.3646 10.4019 17.0897 10.1957 16.9866 9.88645L14.3749 0.917322C14.2374 0.43622 14.6498 -0.0448827 15.1309 0.0238463L26.9179 1.29533C27.1928 1.29533 27.4334 1.50152 27.5365 1.77643L30.1482 9.47407C30.2856 9.92081 29.942 10.4019 29.4609 10.4019H17.6739ZM18.2237 8.95861H28.4643L26.2993 2.66991L16.0587 1.53588L18.2237 8.95861ZM24.0313 24.7663H28.3956L29.942 19.7147H22.5192L24.0313 24.7663ZM30.3543 18.3057C30.9729 18.3057 31.4884 18.8212 31.4884 19.4398C31.4884 19.5429 31.4884 19.6803 31.4196 19.7834L29.6671 25.4192C29.5296 25.9003 29.0829 26.2096 28.6018 26.2096H23.8251C23.3096 26.2096 22.8973 25.9003 22.7254 25.3848L20.8698 19.2336V19.1992C20.7323 18.8212 20.5605 18.4432 20.3199 18.0996C20.1481 17.859 19.9763 17.7559 19.7357 17.7559C19.3577 17.7559 19.0141 17.4466 19.0141 17.0343C19.0141 16.6219 19.3577 16.347 19.7357 16.347C20.4574 16.347 21.0759 16.6562 21.4883 17.2748C21.7289 17.6184 21.9007 17.9621 22.0381 18.3057H30.3543ZM24.3749 28.6494C23.8251 28.6494 23.3784 28.2027 23.3784 27.6185C23.3784 27.0343 23.8251 26.6219 24.3749 26.6219C24.9248 26.6219 25.3715 27.0687 25.3715 27.6185C25.3715 28.1683 24.9248 28.6494 24.3749 28.6494ZM27.9488 28.6494C27.399 28.6494 26.9523 28.2027 26.9523 27.6185C26.9523 27.0343 27.399 26.6219 27.9488 26.6219C28.4987 26.6219 28.9454 27.0687 28.9454 27.6185C28.9454 28.1683 28.4987 28.6494 27.9488 28.6494Z"
                    fill="#1D8600"
                  />
                </svg>
                <p class="stockText">
                  {{ filteredProductByID.items_available }} in stock
                </p>
              </div>
              <div
                class="stock"
                style="color: #c54e03"
                v-if="
                  filteredProductByID.items_available > 0 &&
                  filteredProductByID.items_available <= 10
                "
              >
                <svg
                  width="29"
                  height="26"
                  viewBox="0 0 32 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.935 8.95861L14.3749 0.539313C14.6154 -0.285434 15.7838 -0.113612 15.7838 0.711135V23.8041C15.7838 24.2508 15.3714 24.5944 14.9247 24.4913L3.13769 21.914C2.82841 21.8453 2.58786 21.5704 2.58786 21.2267V9.71462C2.58786 9.30225 2.89714 8.99297 3.30951 8.99297H11.935V8.95861ZM13.1377 9.88645C13.069 10.1957 12.7597 10.4019 12.4505 10.4019H4.03117V20.6425L14.3749 22.8762V5.72835L13.1377 9.88645ZM14.1 1.53588L3.82498 2.66991L1.69438 8.95861H11.9006L14.1 1.53588ZM12.4505 10.4019H0.697814C0.216711 10.4019 -0.126933 9.92081 0.044889 9.47407L2.65659 1.77643C2.72532 1.50152 2.96587 1.29533 3.24078 1.29533L15.0278 0.0238463C15.5089 -0.0448827 15.9213 0.43622 15.7838 0.917322L13.1721 9.88645C13.069 10.1957 12.7597 10.4019 12.4505 10.4019ZM27.1928 8.95861C27.6052 8.95861 27.9145 9.30225 27.9145 9.68026V16.5532C27.9145 16.9655 27.6052 17.2748 27.1928 17.2748C26.7804 17.2748 26.4712 16.9655 26.4712 16.5532V10.4019H17.6739C17.3646 10.4019 17.0897 10.1957 16.9866 9.88645L15.7838 5.72835V22.8762L20.2512 21.914C20.6292 21.8453 21.0072 22.0858 21.0759 22.4638C21.179 22.8418 20.9385 23.2199 20.5605 23.2886L15.1996 24.457C14.7529 24.5601 14.3405 24.2164 14.3405 23.7697V0.711135C14.3405 -0.113612 15.5089 -0.285434 15.7494 0.539313L18.1893 8.95861H27.1928ZM17.6739 10.4019C17.3646 10.4019 17.0897 10.1957 16.9866 9.88645L14.3749 0.917322C14.2374 0.43622 14.6498 -0.0448827 15.1309 0.0238463L26.9179 1.29533C27.1928 1.29533 27.4334 1.50152 27.5365 1.77643L30.1482 9.47407C30.2856 9.92081 29.942 10.4019 29.4609 10.4019H17.6739ZM18.2237 8.95861H28.4643L26.2993 2.66991L16.0587 1.53588L18.2237 8.95861ZM24.0313 24.7663H28.3956L29.942 19.7147H22.5192L24.0313 24.7663ZM30.3543 18.3057C30.9729 18.3057 31.4884 18.8212 31.4884 19.4398C31.4884 19.5429 31.4884 19.6803 31.4196 19.7834L29.6671 25.4192C29.5296 25.9003 29.0829 26.2096 28.6018 26.2096H23.8251C23.3096 26.2096 22.8973 25.9003 22.7254 25.3848L20.8698 19.2336V19.1992C20.7323 18.8212 20.5605 18.4432 20.3199 18.0996C20.1481 17.859 19.9763 17.7559 19.7357 17.7559C19.3577 17.7559 19.0141 17.4466 19.0141 17.0343C19.0141 16.6219 19.3577 16.347 19.7357 16.347C20.4574 16.347 21.0759 16.6562 21.4883 17.2748C21.7289 17.6184 21.9007 17.9621 22.0381 18.3057H30.3543ZM24.3749 28.6494C23.8251 28.6494 23.3784 28.2027 23.3784 27.6185C23.3784 27.0343 23.8251 26.6219 24.3749 26.6219C24.9248 26.6219 25.3715 27.0687 25.3715 27.6185C25.3715 28.1683 24.9248 28.6494 24.3749 28.6494ZM27.9488 28.6494C27.399 28.6494 26.9523 28.2027 26.9523 27.6185C26.9523 27.0343 27.399 26.6219 27.9488 26.6219C28.4987 26.6219 28.9454 27.0687 28.9454 27.6185C28.9454 28.1683 28.4987 28.6494 27.9488 28.6494Z"
                    fill="#C54E03"
                  />
                </svg>
                <p class="stockText">
                  {{ filteredProductByID.items_available }} in stock
                </p>
              </div>
              <div
                class="stock"
                v-if="filteredProductByID.items_available === 0"
              >
                <svg
                  width="29"
                  height="26"
                  viewBox="0 0 32 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.935 8.95861L14.3749 0.539313C14.6154 -0.285434 15.7838 -0.113612 15.7838 0.711135V23.8041C15.7838 24.2508 15.3714 24.5944 14.9247 24.4913L3.13769 21.914C2.82841 21.8453 2.58786 21.5704 2.58786 21.2267V9.71462C2.58786 9.30225 2.89714 8.99297 3.30951 8.99297H11.935V8.95861ZM13.1377 9.88645C13.069 10.1957 12.7597 10.4019 12.4505 10.4019H4.03117V20.6425L14.3749 22.8762V5.72835L13.1377 9.88645ZM14.1 1.53588L3.82498 2.66991L1.69438 8.95861H11.9006L14.1 1.53588ZM12.4505 10.4019H0.697814C0.216711 10.4019 -0.126933 9.92081 0.044889 9.47407L2.65659 1.77643C2.72532 1.50152 2.96587 1.29533 3.24078 1.29533L15.0278 0.0238463C15.5089 -0.0448827 15.9213 0.43622 15.7838 0.917322L13.1721 9.88645C13.069 10.1957 12.7597 10.4019 12.4505 10.4019ZM27.1928 8.95861C27.6052 8.95861 27.9145 9.30225 27.9145 9.68026V16.5532C27.9145 16.9655 27.6052 17.2748 27.1928 17.2748C26.7804 17.2748 26.4712 16.9655 26.4712 16.5532V10.4019H17.6739C17.3646 10.4019 17.0897 10.1957 16.9866 9.88645L15.7838 5.72835V22.8762L20.2512 21.914C20.6292 21.8453 21.0072 22.0858 21.0759 22.4638C21.179 22.8418 20.9385 23.2199 20.5605 23.2886L15.1996 24.457C14.7529 24.5601 14.3405 24.2164 14.3405 23.7697V0.711135C14.3405 -0.113612 15.5089 -0.285434 15.7494 0.539313L18.1893 8.95861H27.1928ZM17.6739 10.4019C17.3646 10.4019 17.0897 10.1957 16.9866 9.88645L14.3749 0.917322C14.2374 0.43622 14.6498 -0.0448827 15.1309 0.0238463L26.9179 1.29533C27.1928 1.29533 27.4334 1.50152 27.5365 1.77643L30.1482 9.47407C30.2856 9.92081 29.942 10.4019 29.4609 10.4019H17.6739ZM18.2237 8.95861H28.4643L26.2993 2.66991L16.0587 1.53588L18.2237 8.95861ZM24.0313 24.7663H28.3956L29.942 19.7147H22.5192L24.0313 24.7663ZM30.3543 18.3057C30.9729 18.3057 31.4884 18.8212 31.4884 19.4398C31.4884 19.5429 31.4884 19.6803 31.4196 19.7834L29.6671 25.4192C29.5296 25.9003 29.0829 26.2096 28.6018 26.2096H23.8251C23.3096 26.2096 22.8973 25.9003 22.7254 25.3848L20.8698 19.2336V19.1992C20.7323 18.8212 20.5605 18.4432 20.3199 18.0996C20.1481 17.859 19.9763 17.7559 19.7357 17.7559C19.3577 17.7559 19.0141 17.4466 19.0141 17.0343C19.0141 16.6219 19.3577 16.347 19.7357 16.347C20.4574 16.347 21.0759 16.6562 21.4883 17.2748C21.7289 17.6184 21.9007 17.9621 22.0381 18.3057H30.3543ZM24.3749 28.6494C23.8251 28.6494 23.3784 28.2027 23.3784 27.6185C23.3784 27.0343 23.8251 26.6219 24.3749 26.6219C24.9248 26.6219 25.3715 27.0687 25.3715 27.6185C25.3715 28.1683 24.9248 28.6494 24.3749 28.6494ZM27.9488 28.6494C27.399 28.6494 26.9523 28.2027 26.9523 27.6185C26.9523 27.0343 27.399 26.6219 27.9488 26.6219C28.4987 26.6219 28.9454 27.0687 28.9454 27.6185C28.9454 28.1683 28.4987 28.6494 27.9488 28.6494Z"
                    fill="#B20202"
                  />
                </svg>
                <p class="stockText" style="color: #b20202">SOLD OUT</p>
              </div>
              <b-col id="addButtons" md="6" style="text-align: center">
                <b-button class="addB" @click="addToCart">Add to cart</b-button>
                <b-button
                  @click="addOrRemoveFavorite"
                  class="heart addB"
                  :class="{ active: isFavorite }"
                >
                  &#9825;
                  {{
                    !isFavorite ? 'Add to favorites' : 'Remove from favorites'
                  }}
                </b-button>
              </b-col>
            </b-row>
          </b-card-body>
        </b-col>
      </b-row>
    </b-container>

    <div>
      <p id="rate">Rate this game:</p>
      <div>
        <span>
          <i
            @click="review(0)"
            :style="'color: ' + this.reviewFlag1"
            class="bi bi-controller"
        /></span>
        <span>
          <i
            @click="review(1)"
            :style="'color: ' + this.reviewFlag2"
            class="bi bi-controller"
        /></span>
        <span>
          <i
            @click="review(2)"
            :style="'color: ' + this.reviewFlag3"
            class="bi bi-controller"
        /></span>
        <span>
          <i
            @click="review(3)"
            :style="'color: ' + this.reviewFlag4"
            class="bi bi-controller"
        /></span>
        <span>
          <i
            @click="review(4)"
            :style="'color: ' + this.reviewFlag5"
            class="bi bi-controller"
        /></span>
      </div>
    </div>
  </b-card>
</template>

<style scoped>
  .btn.active {
    background-color: red;
  }
  .heart {
    margin-left: 10px;
  }
  .productPage {
    color: #000;
  }

  img {
    max-width: 300px;
  }

  .sales {
    color: red;
    padding-right: 10px;
  }

  .line-throw {
    text-decoration: line-through;
  }
  #addButtons {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    width: fit-content;
  }
  .addB {
    width: 200px;
    height: 61px;
    background-color: #3a0ca3;
  }
  .stock {
    display: flex;
    padding: 0;
    font-weight: bold;
  }
  .stockText {
    margin-left: 10px;
    margin-bottom: 0;
  }
  .box {
    width: 23px;
  }

  .bi {
    color: #000;
    font-size: 30px;
  }
  .bi:hover {
    background-color: rgb(54, 54, 58, 0.1);
    border-radius: 5px;
  }
  #rate {
    color: #000;
    margin: 0;
  }
  #mobileDescription {
    max-height: 3em;
    overflow: hidden;
  }
  .showButton {
    background: none !important;
    border: none;
    padding: 0;
    color: #3a0ca3;
    text-decoration: underline;
    cursor: pointer;
  }

  @media (min-width: 600px) {
    #mobileDescription,
    #mobileFullDescription,
    .showButton {
      display: none;
    }
  }
  @media (max-width: 600px) {
    #desktopDescription {
      display: none;
    }
  }
</style>
