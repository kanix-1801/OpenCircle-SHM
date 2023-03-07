import '@rainbow-me/rainbowkit/styles.css'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import {
  RainbowKitProvider,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit'
import { metaMaskWallet } from '@rainbow-me/rainbowkit/wallets'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Explore from './pages/Explore'
import Create from './pages/Create'
import Profile from './pages/Profile'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

const shardeumChain = {
  id: 8082,
  name: 'Shardeum',
  network: '	Shardeum Sphinx 1.X',
  iconUrl: 'https://avatars.githubusercontent.com/u/98940804?s=200&v=4',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'SHARD',
    symbol: 'SHM',
  },
  rpcUrls: {
    default: {
      http: ['https://sphinx.shardeum.org/'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Shardeum Explorer',
      url: 'https://explorer-sphinx.shardeum.org/',
    },
  },
  testnet: true,
}

const { chains, provider } = configureChains(
  [shardeumChain],
  [
    jsonRpcProvider({
      rpc: (chain) => ({ http: chain.rpcUrls.default.http[0] }),
    }),
  ],
)

const connectors = connectorsForWallets([
  {
    groupName: 'Popular',
    wallets: [metaMaskWallet({ chains })],
  },
])

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider modalSize="compact" chains={chains}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Explore" element={<Explore />} />
            <Route path="/Create" element={<Create />} />
            <Route path="/Profile" element={<Profile />} />
          </Routes>
        </Router>
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>,
)
