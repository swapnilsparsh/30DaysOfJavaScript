import './App.css';
import CollectionCard from './Components/CollectionCard';
import Header from './Components/Header';
import { useState, useEffect } from 'react'
import axios from 'axios';
import Punklist from './Components/Punklist';
import Main from './Components/Main';

function App() {
  const [punkListData, setPunkListData] = useState([])
  const [selectedPunk, setSelectedPunk] = useState(0)

  useEffect(() => {
    const getmyNfts = async () => {
      const openseaData = await axios.get(
        'https://testnets-api.opensea.io/assets?asset_contract_address=0x3CC54A4444997626A13219d54E04Ca57FD6C7F8e&order_direction=asc')
    console.log(openseaData.data.assets)
    setPunkListData(openseaData.data.assets)
  }
  return getmyNfts()
  }, [])


  return (
    <div className='app'>
      <Header />
      {
        punkListData.length > 0 && ( 
        <>
        <Main punkListData={punkListData} selectedPunk={selectedPunk}/>
        <Punklist 
          punkListData={punkListData} 
          setSelectedPunk={setSelectedPunk} 
        />
      </>
    )}
    </div>
  )
}

export default App;
