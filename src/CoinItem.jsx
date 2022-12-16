const CoinItem = ({ coin }) => {
    const openInNewTab = url => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="coin">
                <h3 onClick={() => openInNewTab(`https://coinmarketcap.com/currencies/${coin.name.replace(/\s/g, '-')}/`)}>{coin.name}</h3>
                <p>Rank {coin.marketCapRanking}</p>
                <p>{coin.symbol}</p>
                <p>{coin.currentPrice}</p>
        </div>
    )
}

export default CoinItem;