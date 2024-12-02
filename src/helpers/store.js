import {create} from 'zustand';

const useStore = create((set) => ({
    userInfo: {},
    setUserInfo: (userInfo) => set({ userInfo }) ,
    products: [],
    setProducts: (products) => set({ products }) 
}));

export default useStore;
