import create from 'zustand'
import {persist} from 'zustand/middleware'

const useStore = create(persist((set) => ({
    nonSigningClient: null,
    setNonSigningClient: (client) => set((state) => ({nonSigningClient: client})),
    resetNonSigningClient: () => set((state) => ({nonSigningClient: null})),
    stargateClient: null,
    setStargateClient: (client) => set((state) => ({stargateClient: client})),
    resetStargateClient: () => set((state) => ({stargateClient: null})),
    walletAddress: null,
    setWalletAddress: (address) => set((state) => ({walletAddress: address})),
    resetWalletAddress: () => set((state) => ({walletAddress: null})),
    balance: null,
    setBalance: (balance) => set((state) => ({balance: balance})),
    resetBalance: () => set((state) => ({balance: null})),
    kujiBalance: null,
    setKujiBalance: (balance) => set((state) => ({kujiBalance: balance})),
    resetKujiBalance: () => set((state) => ({kujiBalance: null})),
    uskBalance: null,
    setUskBalance: (balance) => set((state) => ({uskBalance: balance})),
    resetUskBalance: () => set((state) => ({uskBalance: null})),
    // contractKujiBalance: null,
    // setContractKujiBalance: (balance) => set((state) => ({contractKujiBalance: balance})),
    // resetContractKujiBalance: () => set((state) => ({contractKujiBalance: null})),
    // contractUskBalance: null,
    // setContractUskBalance: (balance) => set((state) => ({contractUskBalance: balance})),
    // resetContractUskBalance: () => set((state) => ({contractUskBalance: null})),
    indexPrice: null,
    setIndexPrice: (indexPrice) => set((state) => ({indexPrice: indexPrice})),
    resetIndexPrice: () => set((state) => ({indexPrice: null})),
    kujiPrice: null,
    setKujiPrice: (kujiPrice) => set((state) => ({kujiPrice: kujiPrice})),
    resetKujiPrice: () => set((state) => ({kujiPrice: null})),
    redeemFee: 0.01,
    setRedeemFee: (fee) => set((state) => ({fee: fee})),
    resetRedeemFee: () => set((state) => ({fee: null})),
    isLeap: false,
    setIsLeap: (isLeap) => set((state) => ({isLeap: isLeap})),
    isLedger: false,
    setIsLedger: (isLedger) => set((state) => ({isLedger: isLedger})),
    isCosmostation: false,
    setIsCosmostation: (isCosmostation) => set((state) => ({isCosmostation: isCosmostation})),
    isExplicitlyDisconnected: false,
    setIsExplicitlyDisconnected: (isExplicitlyDisconnected) => set((state) => ({isExplicitlyDisconnected: isExplicitlyDisconnected})),
    chainData: null,
    setChainData: chainData => set((state) => ({chainData: chainData})),
  }),
  {
    name: "client-storage",
  }))


export default useStore;

