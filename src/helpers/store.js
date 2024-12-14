import {create} from 'zustand';

const useStore = create((set) => ({
    userInfo: {},
    setUserInfo: (userInfo) => set({ userInfo }) ,
    category: undefined,
    setCategory: (category) => set({category}),
}));

export default useStore;
