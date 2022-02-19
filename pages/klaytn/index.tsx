import React, { useCallback, useContext, useEffect, useState } from 'react';

declare global {
  type Klaytn = {
    networkVersion: string;
    selectedAdderess: string;
    isKlaytn: boolean;
  } 

  interface Window {
    klaytn: Klaytn  
  }
}

// 지갑 컨텍스트
const KlaytnContext = React.createContext(undefined);

// Klaytn Index Page
const Index = () => {
  const [Klaytn, setKlaytn] = useState();

  useEffect(() => {
    if(typeof window.klaytn !== 'undefined') {
      setKlaytn(window.klaytn);
    }
    console.log('KlaytnIndexPage - render once');
  }, []);

  if(Klaytn) {
    return (
      <>
        <h1>Klaytn Index Page</h1>
        <KlaytnContext.Provider value={Klaytn}>
          <Wallet />
        </KlaytnContext.Provider>
      </>
    )
  } else {
    return <p>setup Klaytn first...</p>
  }
}

// 지갑 컴포넌트
const Wallet = () => {
  const page = 'Wallet';

  const Klaytn = useContext(KlaytnContext);

  const [status, setStatus] = useState(false);
  const [address, setAddress] = useState('unknown');
  const [network, setNetwork] = useState('unknown');

  const networkName = {
    1001: 'Baobab Test Network',
    8217: 'Cypress Main Network'
  };

  // 지갑 활성화 콜백
  const enableKlaytn = useCallback(
    async () => {
      try {
        if(Klaytn === undefined) return
        await Klaytn.enable(); 
        setAccountInfo();
        setNetworkInfo();
        setStatus(true);
        Klaytn.on('accountsChanged', () => setAccountInfo());
        Klaytn.on('networkChanged', () => setNetworkInfo());
      } catch (error) {
        console.log(`${page} - User denied account access`);
      }
    }, [address]
  );

  const setNetworkInfo = useCallback(
    () => {
      if (Klaytn === undefined) return
      setNetwork(networkName[Klaytn.networkVersion]);
    }, [network]
  )

  // 계정 정보 변경 콜백
  const setAccountInfo = useCallback(
    () => {  
      if (Klaytn === undefined) return
      setAddress(Klaytn.selectedAddress);
    }, [address]
  );

  useEffect(() =>{
    enableKlaytn();
    console.log(`${page} - comp is rendered`);
  },[]);

  return (
    <div>
      <h2>Wallet Component</h2>
      <div>
        <label style={{color:'#999999'}}>Status</label>
        {
          status ? (<span style={{paddingLeft: '10px', color:'green'}}>😀</span>) 
            : (<span style={{paddingLeft: '10px', color:'red'}}>🥲</span>)
        }
      </div>
      <div>
        <label style={{color:'#999999'}}>Address</label>
        <span style={{paddingLeft: '10px'}}>{address}</span>
      </div>
      <div>
        <label style={{color:'#999999'}}>Network</label>
        <span style={{paddingLeft: '10px'}}>{network}</span>
      </div>
    </div>
  )
}

export default Index;