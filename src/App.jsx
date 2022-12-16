import React, { useEffect, useState } from "react";
import './App.css';
import SearchIcon from './search.svg';
import CoinItem from "./CoinItem";

const  COIN_MARKETCAP_URL = 'https://heraapi.azurewebsites.net/api/CoinMarketCap';
const coin = {
    "id": 0,
    "marketCapRanking": 1,
    "name": "Bitcoin",
    "symbol": "BTC",
    "currentPrice": 16780.27639799228,
    "percentChange7D": -2.85195859,
    "marketCap": 322356341905,
    "percentChange24H": 1.26484453,
    "maxSupply": 21000000,
    "circulatingSupply": 19210431,
    "totalSupply": 19210431,
    "volume24h": 27105554987,
    "currentDateTime": "2022-11-18T06:44:26.0329137+00:00"
}
const App = () => {
    const [coins, setCoins] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCoins, setFilterCoins] = useState([]);
    const searchCoins =  async (searchTerm) => {
        const result = coins.filter(x => x.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                         x.symbol.toLowerCase().includes(searchTerm.toLowerCase()) );
        setFilterCoins(result);
        }
    const keyDownHandler = (event) => {
        if(event.code === "Enter"){
            searchCoins(searchTerm); 
        }
    }    
    useEffect(() => {
        fetch(`${COIN_MARKETCAP_URL}/list-coins?start=1&limit=100&sortColumn=MarketCap`)
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data);
                        setCoins(data);
                        setFilterCoins(data);
                    })
                    .finally(() => setLoading(false));
    },[]);

    return (
        <div className="app">
            <h1>CryptoLand</h1>
            <div className="search">
                <input placeholder="Search for coins"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={keyDownHandler}></input>
                <img src={SearchIcon} 
                     alt="search"
                     onClick={() => searchCoins(searchTerm)}>
                </img>
            </div>
            {filterCoins?.length > 0 ? (
                <div className="container">
                    {filterCoins.map((coin) => 
                        <CoinItem coin={coin}></CoinItem>
                    )}
                </div>
            ): (
                <div className="empty">
                    {isLoading ?  (<h3>Loading ...</h3>) : (<h3>No coins found</h3>) }
                </div>
            )}
            
        </div>
    );
}

export default App;