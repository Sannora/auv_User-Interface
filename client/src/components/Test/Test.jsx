import './Test.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo, faRedo, faChevronUp, faChevronDown, faChevronLeft, faChevronRight, faArrowsDownToLine, faArrowsUpToLine, faLightbulb, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import EngineUnit from '../EngineUnit/EngineUnit';
import { useEffect, useRef, useState } from 'react';
import ThreeDModel from '../ThreeDModel/ThreeDModel';
import AngleControl from '../AngleControl/AngleControl';

function Test() {
    const analogRef = useRef(null);
    const padRef = useRef(null);
    const [activeDirection, setActiveDirection] = useState(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const analog = analogRef.current;
            const pad = padRef.current;

            if (!analog || !pad) return;

            const handleMouseMove = (e) => {
                const padRect = pad.getBoundingClientRect();
                const centerX = padRect.left + padRect.width / 2;
                const centerY = padRect.top + padRect.height / 2;

                const dx = e.clientX - centerX;
                const dy = e.clientY - centerY;

                const maxDistance = padRect.width / 4.5;
                const distance = Math.min(Math.hypot(dx, dy), maxDistance);
                const angle = Math.atan2(dy, dx);

                const x = distance * Math.cos(angle);
                const y = distance * Math.sin(angle);

                analog.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;

                if (Math.abs(dx) > Math.abs(dy)) {
                    if (dx > 20) setActiveDirection('right');
                    else if (dx < -20) setActiveDirection('left');
                    else setActiveDirection(null);
                } else {
                    if (dy > 20) setActiveDirection('backward');
                    else if (dy < -20) setActiveDirection('forward');
                    else setActiveDirection(null);
                }
            };

            const handleMouseUp = () => {
                analog.style.transform = 'translate(-50%, -50%)';
                setActiveDirection(null);
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('mouseup', handleMouseUp);
            };

            const handleMouseDown = () => {
                window.addEventListener('mousemove', handleMouseMove);
                window.addEventListener('mouseup', handleMouseUp);
            };

            analog.addEventListener('mousedown', handleMouseDown);

            return () => {
                analog.removeEventListener('mousedown', handleMouseDown);
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('mouseup', handleMouseUp);
            };
        }, 0);

        return () => clearTimeout(timeout);
    }, []);

    const handleDirectionClick = (direction) => {
        setActiveDirection(direction);
        setTimeout(() => setActiveDirection(null), 200);
    };

    useEffect(() => {
        console.log("🔁 activeDirection değişti:", activeDirection);
    }, [activeDirection]);

    return (
        <div className="component-test">
            <div className="camera-container">
                <div className="camera-left">
                    <p className="temperature">19°C</p>
                    <AngleControl />
                    {/* Camera Angle Controller */}
                    <ThreeDModel />
                </div>
                <div className="camera-right">
                    <div className="camera-status">
                        <ul className="camera-utility-buttons">
                            <li className="camera-utility-button"><FontAwesomeIcon icon={faLightbulb} /></li>
                            <li className="camera-utility-button"><FontAwesomeIcon icon={faPowerOff} /></li>
                        </ul>
                        <div className="camera-engines">
                            <p className='camera-engines-heading'>Motorlar</p>
                            <ul className="camera-engines-display">
                                <li className="camera-engine-unit"></li>
                                <li className="camera-engine-unit"></li>
                                <li className="camera-engine-unit"></li>
                                <li className="camera-engine-unit"></li>
                                <li className="camera-engine-unit"></li>
                                <li className="camera-engine-unit"></li>
                                <li className="camera-engine-unit"></li>
                                <li className="camera-engine-unit"></li>
                            </ul>
                        </div>
                    </div>
                    {/* SLAM Map Component */}
                </div>

                {/* Camera component will be added here */}
            </div>
            <div className="vehicle-utils-container three-column-layout">
                {/* Left: Control Pad */}
                <div className="control-pad-container">
                    <div className="control-pad" ref={padRef}>
                        <div className={`control-button button-forward ${activeDirection === 'forward' ? 'active' : ''}`}
                            onClick={() => handleDirectionClick('forward')}
                        >
                            <FontAwesomeIcon icon={faChevronUp} />
                        </div>
                        <div className={`control-button button-left ${activeDirection === 'left' ? 'active' : ''}`}
                            onClick={() => handleDirectionClick('left')}
                        >
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </div>
                        <div className="control-analog" ref={analogRef}></div>
                        <div className={`control-button button-right ${activeDirection === 'right' ? 'active' : ''}`}
                            onClick={() => handleDirectionClick('right')}
                        >
                            <FontAwesomeIcon icon={faChevronRight} />
                        </div>
                        <div className={`control-button button-backward ${activeDirection === 'backward' ? 'active' : ''}`}
                            onClick={() => handleDirectionClick('backward')}
                        >
                            <FontAwesomeIcon icon={faChevronDown} />
                        </div>
                    </div>
                </div>
                {/* Middle: Engine Controls */}
                <div className="engine-controls-container">
                    <h1 className="engine-controls-heading">Motor Kontrol</h1>
                    <div className="engine-units-container">
                        {[...Array(8)].map((_, i) => (
                            <EngineUnit key={i} index={i + 1} />
                        ))}
                    </div>
                </div>
                {/* Right: Auxiliary Buttons */}
                <div className="auxiliary-buttons-container">
                    <div className="auxiliary-buttons-grid">
                        <div className="auxiliary-button" title="Steer Left">
                            <FontAwesomeIcon icon={faUndo} />
                        </div>
                        <div className="auxiliary-button" title="Steer Right">
                            <FontAwesomeIcon icon={faRedo} />
                        </div>
                        <div className="auxiliary-button" title="Descend">
                            <FontAwesomeIcon icon={faArrowsDownToLine} />
                        </div>
                        <div className="auxiliary-button" title="Ascend">
                            <FontAwesomeIcon icon={faArrowsUpToLine} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Test;
