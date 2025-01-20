// src/store/modules/inventory.js

import InventoryService from '@/services/InventoryService.js';

// 초기 상태 || 공통 관리되는 상태값을 관리,  접근방법- this.$store.state.items
const state = {
  products: [],
  searchQuery: '',
  filters: {},
};

// 실 사용 메서드 || this.$store.commit('경로명/함수명')
const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products;
  },
  ADD_PRODUCT(state, product) {
    state.products.push(product);
  },
  UPDATE_PRODUCT(state, updatedProduct) {
    const index = state.products.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
      state.products.splice(index, 1, updatedProduct);
    }
  },
  DELETE_PRODUCT(state, id) {
    state.products = state.products.filter(product => product.id !== id);
  },
  SET_SEARCH_QUERY(state, query) {
    state.searchQuery = query;
  },
  SET_FILTERS(state, filters) {
    state.filters = filters;
  },
};

// 비동신 통신 및 동작 정의 || this.$store.dispatch('경로명/함수명')
const actions = {
  async fetchProducts({ commit }) {
    try {
      const products = await InventoryService.getProducts();
      commit('SET_PRODUCTS', products);
    } catch (error) {
      console.error('재고 목록을 가져오는 데 실패했습니다:', error);
    }
  },
  async addProduct({ commit }, product) {
    try {
      const newProduct = await InventoryService.addProduct(product);
      commit('ADD_PRODUCT', newProduct);
    } catch (error) {
      console.error('제품 추가에 실패했습니다:', error);
    }
  },
  async updateProduct({ commit }, product) {
    try {
      const updatedProduct = await InventoryService.updateProduct(product);
      commit('UPDATE_PRODUCT', updatedProduct);
    } catch (error) {
      console.error('제품 수정에 실패했습니다:', error);
    }
  },
  async deleteProduct({ commit }, id) {
    try {
      await InventoryService.deleteProduct(id);
      commit('DELETE_PRODUCT', id);
    } catch (error) {
      console.error('제품 삭제에 실패했습니다:', error);
    }
  },
  setSearchQuery({ commit }, query) {
    commit('SET_SEARCH_QUERY', query);
  },
  setFilters({ commit }, filters) {
    commit('SET_FILTERS', filters);
  },
};


// 공유되는 상태 값을 조회 로직을 관리 || this.$store.getters('경로명/함수명')
const getters = {
  filteredProducts(state) {
    let products = state.products;

    // 검색어 적용
    if (state.searchQuery) {
      products = products.filter(product =>
        product.name.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    }

    // 필터 적용
    for (const [key, value] of Object.entries(state.filters)) {
      if (value) {
        products = products.filter(product => product[key] === value);
      }
    }

    return products;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
