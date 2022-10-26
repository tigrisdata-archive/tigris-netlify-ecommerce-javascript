import axios from "axios";
import _ from "json-bigint";
import data from "~/static/storedata.json";

export const state = () => ({
  searchStatus: "empty",
  cartUIStatus: "idle",
  searchedData: [],
  storedata: [],
  cart: [],
  clientSecret: "" // Required to initiate the payment from the client
});

export const getters = {
  featuredProducts: state => state.storedata.slice(0, 3),
  women: state => state.storedata.filter(el => el.gender === "Female"),
  men: state => state.storedata.filter(el => el.gender === "Male"),
  searchResult: state => state.searchedData,
  cartCount: state => {
    if (!state.cart.length) return 0;
    return state.cart.reduce((ac, next) => ac + next.quantity, 0);
  },
  cartTotal: state => {
    if (!state.cart.length) return 0;
    return state.cart.reduce((ac, next) => ac + next.quantity * next.price, 0);
  },
  cartItems: state => {
    if (!state.cart.length) return [];
    return state.cart.map(item => {
      return {
        id: item.id,
        quantity: item.quantity
      };
    });
  },
  clientSecret: state => state.clientSecret

};

export const mutations = {
  setProducts: (state, payload) => {
    state.storedata = payload;
  },
  searchedProducts: (state, payload) => {
    state.searchedData = payload, state.searchStatus = "success";
  },
  updateCartUI: (state, payload) => {
    state.cartUIStatus = payload;
  },
  clearCart: state => {
    //this clears the cart
    (state.cart = []), (state.cartUIStatus = "idle");
  },
  addToCart: (state, payload) => {
    let itemfound = state.cart.find(el => el.id === payload.id);
    itemfound
      ? (itemfound.quantity += payload.quantity)
      : state.cart.push(payload)
  },
  setClientSecret: (state, payload) => {
    state.clientSecret = payload;
   },
  addOneToCart: (state, payload) => {
    let itemfound = state.cart.find(el => el.id === payload.id)
    itemfound ? itemfound.quantity++ : state.cart.push(payload)
  },
  removeOneFromCart: (state, payload) => {
    let index = state.cart.findIndex(el => el.id === payload.id)
    state.cart[index].quantity
      ? state.cart[index].quantity--
      : state.cart.splice(index, 1)
  },
  removeAllFromCart: (state, payload) => {
    state.cart = state.cart.filter(el => el.id !== payload.id)
  }
};

export const actions = {
  async createPaymentIntent({ getters, commit }) {
    try {
      console.log(getters.cartItems)
      // Create a PaymentIntent with the information about the order
      const result = await axios.post(
        "https://ecommerce-netlify.netlify.app/.netlify/functions/create-payment-intent",
        {
          items: getters.cartItems
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (result.data.clientSecret) {
        // Store a reference to the client secret created by the PaymentIntent
        // This secret will be used to finalize the payment from the client
        commit("setClientSecret", result.data.clientSecret);
      }
    } catch (e) {
      console.log("error", e);
    }
  },

  async searchProducts ({ commit }, keyword ) {

    try {
      const response = await axios.post(
        "/.netlify/functions/search-products", 
        {
          q: keyword,
        }, 
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      if (response.data) {
        commit("searchedProducts", response.data);
      }
    } catch (errors) {
      console.error(errors);
    }
  },

  async getAllProducts ({ commit }) {
    console.log(process.env.TIGRIS_URL)
    //console.log("process.env.STATIC_DATA")
    //console.log(process.env.STATIC_DATA)
    // if (process.env.STATIC_DATA = true) {
    //   commit("setProducts", data)
    //   return
    // }
    try {
      //http://localhost:8885
      const response = await axios.post("/.netlify/functions/read-all-products");
      if (response.data) {
        commit("setProducts", response.data);
      }
    } catch (errors) {
      console.error(errors);
    }
  }
};
