import React, {useEffect} from "react";
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Routes,} from "react-router-dom";
import './index.css';
import MainPage from "./pages/MainPage"
import useStore from './store/useStore.js'
import useLocalStore from './store/useLocalStore.js'
import {getCurrentConfig} from "./config/config";
// import {getNonSigningCosmWasmClient, getNonSigningStargateClient} from "./utils/rpcConnector";
import {Helmet, HelmetProvider} from 'react-helmet-async';

const Content = () => {
  const setNonSigningClient = useStore((state) => state.setNonSigningClient);
  const setStargateClient = useStore((state) => state.setStargateClient);
  const setOfflineSigningClient = useLocalStore((state) => state.setOfflineSigningClient);
  const setWalletAddress = useStore((state) => state.setWalletAddress);
  const isLeap = useStore((state) => state.isLeap)
  const isCosmostation = useStore((state) => state.isCosmostation)
  const isLedger = useStore((state) => state.isLedger)
  const isExplicitlyDisconnected = useStore((state) => state.isExplicitlyDisconnected)
  const setIsExplicitlyDisconnected = useStore((state) => state.setIsExplicitlyDisconnected)

  // console.log = console.warn = console.error = () => {
  // };

  // useEffect(() => {
  //   const initNonSigningClient = async () => {
  //     await getNonSigningCosmWasmClient("kujira", getCurrentConfig().chainConfig.rpc)
  //       .then(client => setNonSigningClient(client));
  //   }
  //   initNonSigningClient()
  //     .catch(error => console.log("failed to process initNonSigningClient:", error));
  // }, [setNonSigningClient]);

  // useEffect(() => {
  //   const initStargateClient = async () => {
  //     await getNonSigningStargateClient("kujira", getCurrentConfig().chainConfig.rpc)
  //       .then(client => setStargateClient(client));
  //   }
  //   initStargateClient()
  //     .catch(error => console.log("failed to process initStargateClient:", error));
  // }, [setStargateClient]);

  // window.onload = async () => {
  //   if (isExplicitlyDisconnected) {
  //     return;
  //   }

  //   ConnectWallet(setIsExplicitlyDisconnected, setOfflineSigningClient, setWalletAddress, isLeap, isCosmostation, isLedger, true)
  //     .catch(error => console.log("failed to process index ConnectWallet:", error));
  // }

  return (
    <Routes>
      <Route path="/ecosystem" element={<MainPage/>}/>
      {/* <Route path='*' element={<NotFoundPage/>}/> */}
    </Routes>
  );
}

ReactDOM.hydrate(
  <HelmetProvider>
    <Helmet>
      <meta charSet="utf-8"/>
      <link rel="canonical" href="https://kujiraindex.io"/>
      <link rel="shortcut icon" href="favicon.ico"/>
      <meta property="og:title" content="Kujira Index"/>
      <meta property="og:type" content="website"/>
      <meta property="og:url" content="https://kujiraindex.io"/>
      <meta property="og:site_name" content="Kujira Index"/>
      <meta property="og:image" content="https://daz8pacze04kn.cloudfront.net/ogimage.png"/>
      <meta property="og:image:alt" content="Kujira Index"/>
      <meta property="og:description" content="A protocol for asset indexes. The first launched index is KJI, an asset tracking the Kujira Ecosystem."/>
      <meta property="image" content="https://daz8pacze04kn.cloudfront.net/ogimage.png"/>
      <meta name="twitter:card" content="summary_large_image"/>
      <meta name="twitter:site" content="@KujiraIndex"/>
      <meta name="twitter:creator" content="@KujiraIndex"/>
      <meta name="twitter:image" content="https://daz8pacze04kn.cloudfront.net/ogimage.png"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <meta name="theme-color" content="#000000"/>
      <meta
        name="description"
        content="One domain for the entire interchain"
      />
      <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png"/>
      <link rel="manifest" href="manifest.json"/>
      <title>KujiraIndex - App</title>
    </Helmet>
    <Router basename="/">
      <div className="App">
        <Content/>
      </div>
    </Router>
  </HelmetProvider>,
  document.getElementById('root')
)