export const chainInfo = {
  kujira: {
    chainId: "kaiyo-1",
    chainName: "Kujira",
    rpc: "https://kujira-testnet-rpc.polkachu.com",
    rest: "https://rest.cosmos.directory/kujira",
    stakeCurrency: {
      coinDenom: "KUJI",
      coinMinimalDenom: "ukuji",
      coinDecimals: 6,
      coinGeckoId: "kujira",
      coinImageUrl: "",
    },
    bip44: {
      coinType: 118,
    },
    bech32Config: {
      bech32PrefixAccAddr: "kujira",
      bech32PrefixAccPub: "kujirapub",
      bech32PrefixValAddr: "kujiravaloper",
      bech32PrefixValPub: "kujiravaloperpub",
      bech32PrefixConsAddr: "kujiravalcons",
      bech32PrefixConsPub: "kujiravalconspub",
    },
    currencies: [
      {
        coinDenom: "KUJI",
        coinMinimalDenom: "ukuji",
        coinDecimals: 6,
        coinGeckoId: "kujira",
        coinImageUrl: "",
      },
    ],
    feeCurrencies: [
      {
        coinDenom: "KUJI",
        coinMinimalDenom: "ukuji",
        coinDecimals: 6,
        coinGeckoId: "kujira",
        coinImageUrl: "",
        gasPriceStep: {
          low: 0,
          average: 0.025,
          high: 0.04,
        },
      },
    ],
    coinType: 118,
    features: ["ibc-transfer", "ibc-go", "cosmwasm"],
    chainSymbolImageUrl: "",
    txExplorer: {
      name: "Mintscan",
      basePath: "https://www.mintscan.io/kujira/",
    }
  },
  kujiraTestnet: {
    chainId: "harpoon-4",
    chainName: "Kujira",
    rpc: "https://kujira-testnet-rpc.polkachu.com",
    rest: "https://rest.cosmos.directory/kujira",
    stakeCurrency: {
      coinDenom: "KUJI",
      coinMinimalDenom: "ukuji",
      coinDecimals: 6,
      coinGeckoId: "kujira",
      coinImageUrl: "",
    },
    bip44: {
      coinType: 118,
    },
    bech32Config: {
      bech32PrefixAccAddr: "kujira",
      bech32PrefixAccPub: "kujirapub",
      bech32PrefixValAddr: "kujiravaloper",
      bech32PrefixValPub: "kujiravaloperpub",
      bech32PrefixConsAddr: "kujiravalcons",
      bech32PrefixConsPub: "kujiravalconspub",
    },
    currencies: [
      {
        coinDenom: "KUJI",
        coinMinimalDenom: "ukuji",
        coinDecimals: 6,
        coinGeckoId: "kujira",
        coinImageUrl: "",
      },
    ],
    feeCurrencies: [
      {
        coinDenom: "KUJI",
        coinMinimalDenom: "ukuji",
        coinDecimals: 6,
        coinGeckoId: "kujira",
        coinImageUrl: "",
        gasPriceStep: {
          low: 0,
          average: 0.025,
          high: 0.04,
        },
      },
    ],
    coinType: 118,
    features: ["ibc-transfer", "ibc-go", "cosmwasm"],
    chainSymbolImageUrl: "",
    txExplorer: {
      name: "Mintscan",
      basePath: "https://www.mintscan.io/kujira/",
    }
  }
}



