import React, { useRef, useEffect, useState } from "react";

const Overlay = ({ type, videoRef }) => {
  const overlayRef = useRef(null);
  const [drag, setDrag] = useState(false);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!drag) return;

      const x = e.clientX - offsetX;
      const y = e.clientY - offsetY;

      // Get the dimensions of the parent container
      const { offsetWidth: containerWidth, offsetHeight: containerHeight } =
        videoRef.current;

      // Get the dimensions of the overlay
      const { offsetWidth: overlayWidth, offsetHeight: overlayHeight } =
        overlayRef.current;

      // Calculate the boundaries
      const minX = 0;
      const minY = 0;
      const maxX = containerWidth - overlayWidth;
      const maxY = containerHeight - overlayHeight;

      // Restrict the coordinates to be within the boundaries
      const restrictedX = Math.min(Math.max(x, minX), maxX);
      const restrictedY = Math.min(Math.max(y, minY), maxY);

      // Update the position of the overlay
      overlayRef.current.style.left = `${restrictedX}px`;
      overlayRef.current.style.top = `${restrictedY}px`;
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [drag, offsetX, offsetY]);

  return (
    <div
      ref={overlayRef}
      onMouseDown={(e) => {
        setDrag(true);
        setOffsetX(e.clientX - overlayRef.current.offsetLeft);
        setOffsetY(e.clientY - overlayRef.current.offsetTop);
      }}
      onMouseUp={() => setDrag(false)}
      style={{
        position: "absolute",
        width: type === "text" ? "auto" : "100px",
        height: type === "text" ? "auto" : "100px",
        backgroundColor: type === "text" ? "transparent" : "rgba(0, 0, 0, 0.5)",
        color: "black",
        cursor: "move",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: type === "text" ? "" : "50%",
      }}
      className="select-none"
      onDoubleClick={(e) => (e.currentTarget.contentEditable = true)}
      onBlur={(e) => (e.currentTarget.contentEditable = false)}
    >
      {type === "text" && "Overlay Text"}
    </div>
  );
};

export default Overlay;
