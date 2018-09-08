
const initialState = {
  NETWORK_VERSION: '42', // We only accept kovan
  DAI_TO_USD: 1,
  DAI_CONTRACT: '0xc4375b7de8af5a38a93548eb8453a498222c4ff2',
  OASIS_CONTRACT: '0x8cf1cab422a0b6b554077a361f8419cdf122a9f9'
}

export default (state = initialState) => {
  // Immutable
  return state
}
