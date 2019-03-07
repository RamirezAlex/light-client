export class Web3Provider {
  static async provider() {
    const ethereum = window.ethereum;
    let provider = null;
    if (typeof ethereum !== 'undefined') {
      await ethereum.enable();
      provider = ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    }

    return provider;
  }
}
