import './Header.css'

function Header(){

    // Zaman ve tarih bilgileri
    const currentTime = new Date().toLocaleDateString();
    const currentDate = new Date().toLocaleTimeString();


    return(
        <>
        <div className="header-container">
            <div className="header-left">
                <div className="logo-container">
                    <img src="" alt="" className="logo" />
                </div>
                <ul className="header-items">
                    <li className="header-item">
                        <a href="/dashboard">Görev Takip</a>
                    </li>
                    <li className="header-item">
                        <a href="/modules">Modüller</a>
                    </li>
                    <li className="header-item">
                        <a href="/test">Test</a>
                    </li>
                    <li className="header-item">
                        <a href="/settings">Ayarlar</a>
                    </li>
                </ul>
            </div>
            <div className="header-right">
                <ul className="header-stats-items">
                    <li className="header-stats-item header-time">{currentTime}</li>
                    <li className="header-stats-item header-date">{currentDate}</li>
                    <li className="header-stats-item header-battery">
                        <p className="header-text-battery">%100</p>
                        <img src="" alt="" className="image-battery" />
                    </li>
                </ul>
            </div>
        </div>
        </>
    )

}

export default Header;