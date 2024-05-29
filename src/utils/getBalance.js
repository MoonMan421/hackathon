import bigDecimal from "js-big-decimal";
import {getChainName, getNonSigningStargateClient} from "./rpcConnector";

const bigDecimalZero = new bigDecimal(0);
const bigDecimalNegativeOne = new bigDecimal(-1);

export const getBalance = async (chainConfig, walletAddress) => {
  try {
    const client = await getNonSigningStargateClient(getChainName(chainConfig), chainConfig.rpc)
      .catch(exception => {
        console.log("getBalance connect exception:", exception.message);

        throw new Error("Failed to connect");
      });
    const denom = chainConfig.stakeCurrency.coinMinimalDenom;
    const coinBalance = await client.getBalance(walletAddress, denom)
      .catch(exception => {
        console.log("getBalance exception:", exception.message);

        throw new Error("Failed to fetch balance");
      });

    return new bigDecimal(coinBalance.amount);
  } catch (error) {
    console.log("failed to process error:", error);

    throw new Error("Failed to fetch balance: " + error.message);
  }
}

export const getMaxAmountInMinDenom = async (chainConfig, walletAddress, denom, feeAmount) => {
  try {
    const balance = await getBalance(chainConfig.rpc, walletAddress, denom);
    const maxAmount = balance.subtract(feeAmount);

    if (maxAmount.compareTo(bigDecimalZero) > 0) {
      return balance.subtract(feeAmount);
    } else {
      return bigDecimalZero;
    }
  } catch (error) {
    console.log("failed to process error:", error);
  }

  return bigDecimalZero;
}

export const getAmountInWallet = async (chainConfig, walletAddress) => {
  try {
    if (!walletAddress || walletAddress.length < 10) {
      return bigDecimalZero;
    }
    const denom = chainConfig.stakeCurrency.coinMinimalDenom;
    const balance = await getBalance(chainConfig, walletAddress, denom);
    const amountOfDecimals = chainConfig.stakeCurrency.coinDecimals;

    return balance.divide(new bigDecimal(Math.pow(10, amountOfDecimals).toString()), 4);
  } catch (error) {
    console.log("failed to process error:", error);
  }

  return bigDecimalNegativeOne;
}

export const getMaxAmountInDenom = async (chainConfig, walletAddress, feeAmountInUdenomString) => {
  try {
    if (!walletAddress || walletAddress.length < 10) {
      return bigDecimalZero;
    }
    const denom = chainConfig.stakeCurrency.coinMinimalDenom;
    const balance = await getBalance(chainConfig, walletAddress, denom);
    const maxAmount = balance.subtract(new bigDecimal(feeAmountInUdenomString));
    const amountOfDecimals = chainConfig.stakeCurrency.coinDecimals;

    if (maxAmount.compareTo(bigDecimalZero) > 0) {
      return maxAmount.divide(new bigDecimal(Math.pow(10, amountOfDecimals).toString()), 4);
    } else {
      return bigDecimalZero;
    }
  } catch (error) {
    console.log("failed to process error:", error);
  }

  return bigDecimalNegativeOne;
}