import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      counter: 0,
      cartIsOpen: false,
      products: []
    }
  },

  mutations: {
    addToCart(state, inputProduct) {
      state.products.push(inputProduct)
    },
    openCart(state) {
      state.cartIsOpen = true
    },
    closeCart(state) {
      state.cartIsOpen = false
    },
    toggleCart(state) {
      state.cartIsOpen = !state.cartIsOpen
    },
    deleteProduct(state, index) {
      state.products.splice(index, 1)

      // state.products = state.products.filter((pro) => {
      //   return pro != index
      // })
    }
  }
})

export default store

// import { createStore } from 'vuex'

// const mutations = {
//     gameItems(state, products) {
//       state.products = products
//     }
//   },
//   state = {
//     products: []
//   }

// export default createStore({
//   mutations,
//   state,
//   strict: true
// })
