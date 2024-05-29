import create from 'zustand'

const useLocalStore = create((set) => ({
    offlineSigningClient: null,
    setOfflineSigningClient: (client) => set((state) => ({offlineSigningClient: client})),
    resetOfflineSigningClient: () => set((state) => ({offlineSigningClient: null})),
  }))


export default useLocalStore;

