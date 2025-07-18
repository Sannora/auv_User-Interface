import { useState, useRef } from "react";

function EngineUnit({ index }) {
    const containerRef = useRef(null);
    const [value, setValue] = useState(0);

    const handleDrag = (e) => {
        const container = containerRef.current;
        const rect = container.getBoundingClientRect();
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        const offsetY = clientY - rect.top;
        const height = rect.height;

        let percentage = 1 - offsetY / height;
        let newValue = Math.round((percentage * 60) - 30); // -30 to +30

        if (newValue < -30) newValue = -30;
        if (newValue > 30) newValue = 30;

        setValue(newValue);
    };

    const handleMouseDown = (e) => {
        e.preventDefault();
        handleDrag(e);
        window.addEventListener("mousemove", handleDrag);
        window.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseUp = () => {
        window.removeEventListener("mousemove", handleDrag);
        window.removeEventListener("mouseup", handleMouseUp);
    };

    const progressUp = value > 0 ? `${(value / 30) * 50}%` : "0%";
    const progressDown = value < 0 ? `${(-value / 30) * 50}%` : "0%";

    return (
        <div className="engine-unit">
            <div
                className="engine-progress-container"
                ref={containerRef}
                onMouseDown={handleMouseDown}
                onTouchStart={handleDrag}
                onTouchMove={handleDrag}
            >
                <div className="engine-progress-up" style={{ height: progressUp }} />
                <div className="engine-progress-down" style={{ height: progressDown }} />
                <div
                    className="engine-thumb"
                    style={{
                        bottom: `calc(${50 + (value / 60) * 100}% - 8px)`
                    }}
                />
            </div>
            <p className="engine-name">{index}</p>
        </div>
    );
}

export default EngineUnit;
