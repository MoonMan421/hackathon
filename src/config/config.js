import {calculateFee, coins} from "@cosmjs/stargate";
import {chainInfo} from "./chainConfig";

const testnet = "testnet";
// const localnet = "localnet";
// const mainnet = "mainnet";
const selectedConfig = testnet;

const getDefaultMintFee = (gasPrice, gasLimit, denom) => {
  try {
    return calculateFee(gasLimit, gasPrice + denom);
  } catch (exception) {
    // logError("config getDefaultMintFee", exception);

    return {
      amount: coins(2500, denom),
      gas: '1000000',
    }
  }
}

const defaultGasLimit = 1_000_000;
const defaultGasPrice = "0.025";

export const config = {
  mainnet: {
    contractAddress: "juno1ce7wjfsuk79t2mdvpdjtv8280pcc64yh9mh62qptuvxe64twt4pqa68z2a",
    defaultMintFee: getDefaultMintFee(defaultGasPrice, defaultGasLimit, "uosmo"),
    denom: "ukuji",
    denomUsk:  "",
    denomKji: "",
    chainConfig: chainInfo.kujira,
    activeChain: "kujira",
    basePath: "https://",
  },
  testnet: {
    contractAddress: "kujira10vye4j9wnrr09cwajqtkm4em5cpn4xc4tryqz22xsd9cdvqx96qstvnrwd",
    defaultMintFee: getDefaultMintFee(defaultGasPrice, defaultGasLimit, "ukuji"),
    defaultMintFeeUsk: getDefaultMintFee(defaultGasPrice, defaultGasLimit, "factory/kujira1r85reqy6h0lu02vyz0hnzhv5whsns55gdt4w0d7ft87utzk7u0wqr4ssll/uusk"),
    denom: "ukuji",
    denomUsk:  "factory/kujira1r85reqy6h0lu02vyz0hnzhv5whsns55gdt4w0d7ft87utzk7u0wqr4ssll/uusk",
    denomKji: "factory/kujira10vye4j9wnrr09cwajqtkm4em5cpn4xc4tryqz22xsd9cdvqx96qstvnrwd/bombaclaat",
    chainConfig: chainInfo.kujiraTestnet,
    activeChain: "kujira",
    basePath: "https://",
  },
  localnet: {
    contractAddress: "kujira1r2xhhmsel27tt0p4c55xyeg2uzks7qv46ggkpcvv8v2j60pwaqjsv9n9ur",
    defaultMintFee: getDefaultMintFee(defaultGasPrice, defaultGasLimit, "ukuji"),
    denom: "ukuji",
    denomUsk:  "",
    denomKji: "",
    chainConfig: chainInfo.kujira,
    activeChain: "kujira",
    basePath: "http://localhost:3000",
  },
}

export function getCurrentConfig() {
  return {
    contractAddress: config[selectedConfig].contractAddress,
    defaultMintFee: config[selectedConfig].defaultMintFee,
    defaultMintFeeUsk: config[selectedConfig].defaultMintFeeUsk,
    denom: config[selectedConfig].denom,
    denomUsk: config[selectedConfig].denomUsk,
    denomKji: config[selectedConfig].denomKji,
    chainConfig: config[selectedConfig].chainConfig,
    activeChain: config[selectedConfig].activeChain,
    basePath: config[selectedConfig].basePath,
  }
}