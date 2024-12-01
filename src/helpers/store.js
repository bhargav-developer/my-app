import {create} from 'zustand';

const useStore = create((set) => ({
    userInfo: {}, // initial state
    setUserInfo: (userInfo) => set({ userInfo }) // method to update state
}));

export default useStore;
