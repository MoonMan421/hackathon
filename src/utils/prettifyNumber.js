
export const prettifyNumber = (number) => {

  try {
    if (number >= 1_000_000_000) {
      return (number/1_000_000_000).toFixed(2) + "b";
    } else if (number >= 100_000_000) {
      return (number/1_000_000).toFixed(1) + "m";
    } else if (number >= 10_000_000) {
      return (number/1_000_000).toFixed(1) + "m";
    } else if (number >= 1_000_000) {
      return (number/1_000_000).toFixed(2) + "m";
    } else if (number >= 1_000) {
      return (number/1_000).toFixed(2) + "k";
    } else {
      return number.toFixed(2);
    }
  } catch (exception) {
    // logError("reduceAmount", exception);
  }

  return 0;
}