import './Modules.css'
import Terminal from '../Terminal/Terminal'
import { CONFIG } from '../../config';

function Modules(){

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

    const modules = [
        { name: "Çevre", system_code: 1 },
        { name: "Görev", system_code: 2 },
        { name: "Hareket", system_code: 3 },
        { name: "Kontrol", system_code: 4 },
        { name: "Tümü", system_code: 0 },
        { name: "Görev Yönetimi", system_code: 6 },
    ];
    
    const commands = [
        { label: "Çalıştır", code: 0, className: "module-control-button-init" },
        { label: "Başlat", code: 1, className: "module-control-button-start" },
        { label: "Durdur", code: 3, className: "module-control-button-halt" },
        { label: "Duraklat", code: 2 },
        { label: "Sıfırla", code: 4 },
        { label: "Bağlan", code: 5 },
    ];

    return(

        <div className="component-modules">
            <Terminal context="Module"/>
                { /* Terminal Component */ }
            <div className="module-control-container">
                <div className="controls-grid">
                    {modules.map((mod) => (
                        <ul key={mod.name} className="module-controller">
                        <h2 className="module-heading">{mod.name}</h2>
                        {commands.map((cmd) => (
                            <li
                                key={cmd.label}
                                className={`module-control-button ${cmd.className || ""}`}
                                onClick={() => sendCommand(mod.system_code, cmd.code)}
                            >
                                {cmd.label}
                            </li>
                            ))}
                        </ul>
                    ))}
                </div>
            </div>
            </div>

    )

}

export default Modules;