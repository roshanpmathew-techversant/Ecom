import { Magnet } from "lucide-react";
import React, { useState, useRef } from "react";

const ImageMagnifier = ({ src, width = 400, height = 400, zoom = 2 }) => {
  const [backgroundPos, setBackgroundPos] = useState("50% 50%");
  const [showZoom, setShowZoom] = useState(false);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setBackgroundPos(`${x}% ${y}%`);
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Main Image */}
      <div
        ref={containerRef}
        style={{ width, height }}
        className="relative border rounded-lg overflow-hidden cursor-zoom-in"
        onMouseEnter={() => setShowZoom(true)}
        onMouseLeave={() => setShowZoom(false)}
        onMouseMove={handleMouseMove}
      >
        <img
          src={src}
          alt="Product"
          className="w-full h-full object-contain transition-transform duration-300 ease-in-out"
        />

        {/* Zoom Overlay */}
        {showZoom && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: `url(${src})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: `${width * zoom}px ${height * zoom}px`,
              backgroundPosition: backgroundPos,
              pointerEvents: "none", // allow mouse events to pass through
              transition: "background-position 0.05s ease-out",
              zIndex: 20,
            }}
            className="rounded-lg border"
          />
        )}
      </div>
    </div>
  );
};

export default ImageMagnifier;
