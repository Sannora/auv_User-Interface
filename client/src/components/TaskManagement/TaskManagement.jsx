import { useState } from 'react';
import './TaskManagement.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faRightFromBracket, faXmark } from '@fortawesome/free-solid-svg-icons'
import SystemDetails from '../SystemDetails/SystemDetails';
import Terminal from '../Terminal/Terminal';
import LeafletMap from '../Map/LeafletMap';
import ThreeDModel from '../ThreeDModel/ThreeDModel';
import Camera from '../Camera/Camera';
import { CONFIG } from '../../config';

function TaskManagement(){

    // Görev seçim dropdown'ını kontrol eden useState hook'ları
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("Görev Seç");
    const [selectedSystemCode, setSelectedSystemCode] = useState(null);
    const [taskCommandCode, setTaskCommandCode] = useState(null);

    // Dropdown aç/kapat mekaniği
    const toggleDropdown = () => setIsOpen(!isOpen);
    
    // Dropdown seçeneklerini yöneten fonksiyon
    const handleSelect = (option) => {
        setSelected(option.name);
        setSelectedSystemCode(option.system_code);
        setTaskCommandCode(option.task_command_code);
        setIsOpen(false);
    }

    // Görev yönetim seçenekleri
    const options =
    [
        {name : "Hazine Avı", system_code : 6, task_command_code : 0},
        {name : "Anomali Tespiti", system_code : 6, task_command_code : 1},
    ]

    // Sidebar'ı kontrol eden useState hook'u
    const [isSidebarActive, setIsSidebarActive] = useState(false);

    // Sidebar aç/kapat mekaniği
    const toggleSidebar = () => setIsSidebarActive(!isSidebarActive);

    // Görev ayarlamak için gönderilecek komut fonksiyonu
    const sendCommand = async (system_code, command_code) => {
        try {
                await fetch(`http://${CONFIG.WS_IP}:3001/api/send-command`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ system_code, command_code }),
            });
                console.log("Komut gönderildi:", system_code, command_code);
            } catch (error) {
                console.error("Komut gönderme hatası:", error);
            }
        };

    const commands = [
        { label: "Hazine Avı TEST", command_code: 0},
        { label: "Anomali Tespiti TEST", command_code: 1},
        { label: "TEST", command_code: 2 },
        { label: "Hazine Avı", command_code: 3 },
        { label: "Anomali Tespiti", command_code: 4 },
        { label: "Başlat", command_code: 5 },
        { label: "Durdur", command_code: 6 },
        { label: "Raporla", command_code: 7 },
    ]

    return(
         <div className="task-management-container">
            <FontAwesomeIcon
                icon={isSidebarActive ? faXmark : faRightFromBracket}
                className="icon-toggle-sidebar"
                onClick={toggleSidebar}
            />

            <div className={`task-sidebar ${isSidebarActive ? 'task-sidebar-open' : 'task-sidebar-closed'}`}>
                <SystemDetails />

                <div className="task-management-utils">
                    <h1 className="task-management-heading">Görev Yönetim</h1>

                    <button className="button-dropdown-toggle" onClick={toggleDropdown}>
                        {selected}
                        <FontAwesomeIcon className="icon-dropdown" icon={faChevronDown} />
                    </button>

                    {isOpen && (
                        <ul className="dropdown-tasklist">
                            {options.map((option, index) => (
                                <li
                                    key={index}
                                    className="dropdown-item"
                                    onClick={() => handleSelect(option)}
                                >
                                    {option.name}
                                </li>
                            ))}
                        </ul>
                    )}

                    <div className="task-buttons-grid">
                        <button
                            className="button-task-util button-task-start"
                            onClick={() => sendCommand(selectedSystemCode, 5)} // Başlat
                        >
                            Başlat
                        </button>

                        <button
                            className="button-task-util button-task-halt"
                            onClick={() => sendCommand(selectedSystemCode, 6)} // Durdur
                        >
                            Durdur
                        </button>

                        <button className="button-task-util">Duraklat</button>

                        <button
                            className="button-task-util"
                            onClick={() => {
                                if (taskCommandCode !== null) {
                                    sendCommand(6, taskCommandCode); // ← ÇALIŞTIR = 6. sistem, görev özel komutu
                                } else {
                                    alert("Lütfen önce bir görev seçin.");
                                }
                            }}
                        >
                            Çalıştır
                        </button>

                        <button
                            className="button-task-util button-task-report"
                            onClick={() => sendCommand(selectedSystemCode, 7)} // Raporla
                        >
                            Raporla
                        </button>
                    </div>
                </div>
            </div>

            <div className="task-management-right">
                <div className="status-monitor-container">
                    <div className="camera-component">
                        <Camera />
                        <ThreeDModel />
                    </div>
                    <LeafletMap />
                </div>

                <Terminal context="Task" />
                <input type="text" placeholder="Input..." className="terminal-input" />
            </div>
        </div>
    )

}

export default TaskManagement;