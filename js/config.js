/* ==========================================================================
   QUANTUM COIN ($QCOIN) - SITE CONFIG
   No emojis anywhere in copy.
   ========================================================================== */
window.SITE = {
  name: "Quantum Coin",
  symbol: "QCOIN",
  description: "Quantum Coin brings cosmic energy to crypto culture. A golden Q surrounded by quantum orbits stands at the heart of a universe filled with infinite possibilities. Inspired by quantum physics and the mysteries of deep space, it blends futuristic style with bold meme spirit. From glowing nebulae to the next frontier, Quantum Coin invites.",
  aboutLong: "Holders ride golden orbits through violet nebulae. No roadmap of empty promises — just a luxury meme aesthetic on Solana, a golden Q as the signal, and a community ready for whatever the next collapse of the wavefunction brings.",
  chain: "solana",
  chainName: "Solana",
  contract: "Coming soon",
  domain: "quantumcoin.lol",
  links: {
    x: "https://x.com/QCoin_Sol",
    telegram: "",
    buy: "https://swap.pump.fun/",
    dexscreener: "https://dexscreener.com/solana"
  },
  dexName: "PumpSwap",
  dexscreenerEmbed: "",
  icons: {
    chain: "assets/icons/solana.svg",
    dex: "assets/icons/pumpfun-logomark.svg",
    wallet: "assets/icons/phantom.svg"
  },
  wallet: "Phantom",
  gasToken: "SOL",
  steps: [
    {
      title: "Create a Wallet",
      icon: "assets/icons/phantom.svg",
      img: "assets/media/03-orbit.jpg",
      text: "Download Phantom from phantom.com or your app store and create a Solana wallet. Write down your recovery phrase and keep it private."
    },
    {
      title: "Get Some SOL",
      icon: "assets/icons/solana.svg",
      img: "assets/media/04-nebula.jpg",
      text: "Buy SOL inside Phantom or on an exchange and send it to your Phantom address. A small amount of SOL covers network fees."
    },
    {
      title: "Go to PumpSwap",
      icon: "assets/icons/pumpfun-logomark.svg",
      img: "assets/media/05-launch.jpg",
      text: "Open swap.pump.fun, connect Phantom, and paste the {symbol} contract address as the token to buy. Always double check the address."
    },
    {
      title: "Swap for {symbol}",
      icon: "assets/icons/dexscreener.svg",
      img: "assets/media/06-frontier.jpg",
      text: "Enter the amount of SOL, confirm the swap in Phantom, and {symbol} lands in your wallet in seconds."
    }
  ],
  marquee: ["Quantum Coin", "$QCOIN", "Solana", "Cosmic Energy", "Golden Q", "Deep Space", "Infinite Orbit"],
  stats: [
    { label: "Ticker", value: "$QCOIN" },
    { label: "Chain", value: "Solana" },
    { label: "Tax", value: "0/0" },
    { label: "CA", value: "Soon" }
  ],
  // Gallery uses remaining media; hero=01, about=02, steps=03-06, floaters=gen from 07/09/11/12
  gallery: [
    { src: "assets/media/07-core.jpg", caption: "The Core", text: "A golden Q at the singularity of the coin." },
    { src: "assets/media/08-wave.jpg", caption: "Wavefront", text: "Probability waves roll across the void." },
    { src: "assets/media/09-cluster.jpg", caption: "Cluster", text: "Stars align around the emblem." },
    { src: "assets/media/10-horizon.jpg", caption: "Horizon", text: "The event edge of crypto culture." },
    { src: "assets/media/11-shatter.jpg", caption: "Shatter", text: "Reality fractures into gold and violet." },
    { src: "assets/media/12-vault.jpg", caption: "The Vault", text: "Where cosmic energy is stored." }
  ],
  floaters: [
    { src: "assets/gen/float-core.webp", cls: "fl-a" },
    { src: "assets/gen/float-cluster.webp", cls: "fl-b" },
    { src: "assets/gen/float-shatter.webp", cls: "fl-c" },
    { src: "assets/gen/float-vault.webp", cls: "fl-d" }
  ],
  slots: { about: "assets/media/02-about.jpg" },
  particles: { count: 90, shape: "star", linkDistance: 130, speed: 0.32 }
};
