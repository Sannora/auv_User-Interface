import { useRef, useState, useEffect, useCallback } from "react";
import "./AngleControl.css";

function AngleControl() {
  const totalHeight = 200;
  const trackRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [angle, setAngle] = useState(45);

  const marks = [
    { value: 0, label: "0°" },
    { value: 11.25 },
    { value: 22.5 },
    { value: 33.75 },
    { value: 45, label: "45°", isMajor: true },
    { value: 56.25 },
    { value: 67.5 },
    { value: 78.75 },
    { value: 90, label: "90°" },
  ];

  const updateAngle = useCallback((e) => {
    const bounds = trackRef.current.getBoundingClientRect();
    let y = e.clientY - bounds.top;
    y = Math.max(0, Math.min(totalHeight, y));
    const newAngle = Math.round((1 - y / totalHeight) * 90 * 10) / 10;
    setAngle(newAngle);
  }, [totalHeight]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    updateAngle(e);
  };

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging) return;
      updateAngle(e);
    },
    [isDragging, updateAngle]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const indicatorY = (1 - angle / 90) * totalHeight;

  return (
    <div className="vertical-slider-container">
      <div
        className="vertical-slider-track"
        ref={trackRef}
        onMouseDown={handleMouseDown}
      >
        {marks.map((mark, i) => {
          const y = (1 - mark.value / 90) * totalHeight;
          return (
            <div
              key={i}
              className={`tick ${mark.isMajor ? "major" : "minor"}`}
              style={{ top: `${y}px` }}
            >
              {mark.label && <span className="label">{mark.label}</span>}
            </div>
          );
        })}

        <div
          className="angle-indicator"
          style={{ top: `${indicatorY}px` }}
        >
          {angle.toFixed(1)}°
        </div>
      </div>
    </div>
  );
}

export default AngleControl;
