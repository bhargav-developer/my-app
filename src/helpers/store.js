import {create} from 'zustand';

const useStore = create((set) => ({
    userInfo: {},
    setUserInfo: (userInfo) => set({ userInfo }) ,
    products: [],
    setProducts: (products) => set({ products }),
    product: {},
    setProduct: (product) => set({ product }) ,
    category: undefined,
    setCategory: (category) => set({category}),
}));

export default useStore;
