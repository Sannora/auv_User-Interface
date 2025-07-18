import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronDown, faMicrochip, faComputer, faTemperatureLow, faCompress, faRulerVertical, faDroplet,
    faImages, faVideo, faMapLocationDot
} from '@fortawesome/free-solid-svg-icons'
import './SystemDetails.css'
import { CONFIG } from '../../config';

function SystemDetails(){

    const [isOpen, setIsOpen] = useState(false);

    // Sistem detaylarını tutacak state'ler
    const [cpu, setCpu] = useState(null);
    const [gpu, setGpu] = useState(null);
    const [temperature, setTemperature] = useState(null);
    const [pressure, setPressure] = useState(null);
    const [depth, setDepth] = useState(null);
    const [leak, setLeak] = useState(null);
    const [images, setImages] = useState([]);

    const toggleDropdown = () => setIsOpen(!isOpen);

    // WebSocket bağlantısı kur ve mesajları dinle
    useEffect(() => {
        const socket = new WebSocket(`ws://${CONFIG.WS_IP}:${CONFIG.WS_PORT}`);

        socket.onmessage = (event) => {
            try {
                const msg = JSON.parse(event.data);

                if (msg.type === 'SystemDetails') {
                    console.log("📡 Sistem detayları mesajı alındı:", msg.data);

                    const { cpuUsage, gpuUsage, temperature, pressure, depth, leak, images } = msg.data;

                    if ( cpuUsage !== undefined ) setCpu(cpuUsage);
                    if ( gpuUsage !== undefined ) setGpu(gpuUsage);
                    if ( temperature !== undefined ) setTemperature(temperature);
                    if ( pressure !== undefined ) setPressure(pressure);
                    if ( depth !== undefined ) setDepth(depth);
                    if ( leak !== undefined ) setLeak(leak);
                    if ( images !== undefined ) setImages(images);
                }
            } catch (error) {
                console.error("🛑 Mesaj işlenirken hata:", error);
            }
        }

        socket.onerror = (error) => console.error("❗ WebSocket hatası:", error);
        socket.onclose = () => console.log("❌ WebSocket bağlantısı kapandı");

        return () => socket.close();
    }, []);

    return(

        <div className="component-system-details">
                <h1 className="system-details-heading">Sistem Detayları</h1>
            <ul className="system-details-container">
                <li className="system-details-unit">
                    <div className="system-detail">
                        <FontAwesomeIcon icon={faMicrochip} className='system-detail-icon' />
                        <p className="system-detail-key">CPU Kullanımı:</p>
                    </div>
                    <p className="system-detail-info">{cpu ?? '-'}</p>
                </li>
                <li className="system-details-unit">
                    <div className="system-detail">
                        <FontAwesomeIcon icon={faComputer} className='system-detail-icon' />
                        <p className="system-detail-key">GPU Kullanımı:</p>
                    </div>
                    <p className="system-detail-info">{gpu ?? '-'}</p>
                </li>
                <li className="system-details-unit">
                    <div className="system-detail">
                        <FontAwesomeIcon icon={faTemperatureLow} className='system-detail-icon' />
                        <p className="system-detail-key">Sıcaklık:</p>
                    </div>
                    <p className="system-detail-info">{temperature ?? '-'}</p>
                </li>
                <li className="system-details-unit">
                    <div className="system-detail">
                        <FontAwesomeIcon icon={faCompress} className='system-detail-icon' />
                        <p className="system-detail-key">Basınç:</p>
                    </div>
                    <p className="system-detail-info">{pressure ?? '-'}</p>
                </li>
                <li className="system-details-unit">
                    <div className="system-detail">
                        <FontAwesomeIcon icon={faRulerVertical} className='system-detail-icon' />
                        <p className="system-detail-key">Derinlik:</p>
                    </div>
                    <p className="system-detail-info">{depth ?? '-'}</p>
                </li>
                <li className="system-details-unit">
                    <div className="system-detail">
                        <FontAwesomeIcon icon={faDroplet} className='system-detail-icon' />
                        <p className="system-detail-key">Sızdırma:</p>
                    </div>
                    <p className="system-detail-info">{leak ?? '-'}</p>
                </li>
                <li className="system-details-unit system-details-photo-dropdown-toggle" onClick={toggleDropdown}>
                    <div className="system-detail">
                        <FontAwesomeIcon icon={faImages} className='system-detail-icon' />
                        <p className="system-detail-key">Yakalanan Fotoğraflar:</p>
                    </div>
                    <p className="system-detail-info">{images.length > 0 ? `${images.length} fotoğraf yakalandı` : 'Henüz fotoğraf yok' }</p>
                    <FontAwesomeIcon icon={faChevronDown} className='icon-dropdown' />
                </li>
                <div className={`captured-photos ${isOpen ? 'captured-photos-open' : 'captured-photos-closed'}`}>
                    {isOpen && images.length > 0 ? (
                    images.map((img, index) => (
                    <img
                    key={index}
                    src={`data:image/jpeg;base64,${img.data}`}
                    alt={`Yakalanan Görsel ${index + 1}`}
                    className="captured-photo"
                    />
                    ))
                    ) : isOpen ? (
                    <p>Henüz görsel alınmadı.</p>
                    ) : null}
                </div>

                {/* Mobile Only */}
                <li className="system-details-unit system-detail-mobile">
                    <div className="system-detail">
                        <FontAwesomeIcon icon={faVideo} className='system-detail-icon' />
                        <p className="system-detail-key">Kamerayı Aç</p>
                    </div>
                    <p className="system-detail-info"></p>
                </li>
                <li className="system-details-unit system-detail-mobile">
                    <div className="system-detail">
                        <FontAwesomeIcon icon={faMapLocationDot} className='system-detail-icon' />
                        <p className="system-detail-key">Haritayı Göster</p>
                    </div>
                    <p className="system-detail-info"></p>
                </li>
                { /* ---------------- */ }
            </ul>
        
        </div>

    )

}

export default SystemDetails