import { defineStore } from 'pinia';

export const useLoadingStatus = defineStore('loading', {
  state: () => {
    return { isLoading: false };
  },
});
