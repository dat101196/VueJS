import { createStore } from "vuex";

// Create a new store instance.
const store = createStore({
  state() {
    return {
      count: 1000,
      transaction: null,
      transactions: [],
      error: null,
      numbers: [1, 2, 3, 4, 5, 6, 7, 8],
    };
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    setTransaction(state, transactionPayload) {
      state.transaction = transactionPayload;
    },
    setTransactions(state, transactionsPayload) {
      state.transactions = transactionsPayload;
    },
    setError(state, errorPayload) {
      state.error = errorPayload;
    },
  },
  getters: {
    numbersFiltered(state) {
      return state.numbers.filter((number) => number % 2 == 0);
    },
  },
  actions: {
    async getTransaction({ commit }, { id }) {
      const res = await fetch(`http://localhost:3000/transactions/${id}`);
      const data = await res.json();
      commit("setTransaction", data);
    },
    async getAllTransactions({ commit }) {
      try {
        const response = await fetch("http://localhost:3000/transactions");
        if (!response.ok) throw new Error("Something went wrong!!!");
        const data = await response.json();
        commit("setTransactions", data);
      } catch (err) {
        //console.log(err);
        commit("setError", new Error("Something went wrong!!!"));
      }
    },
  },
});

export default store;
