import { Stage, Layer, Image, Circle, Line, Text } from "react-konva";
import { useState, useEffect, useRef } from "react";

const XMargin = 100;
const YMargin = 200;

const Map = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth - XMargin,
    height: window.innerHeight - YMargin,
  });
  const [floorImage, setFloorImage] = useState<HTMLImageElement | undefined>();
  const [floorImageWidth, setFloorImageWidth] = useState(0);
  const [floorImageHeight, setFloorImageHeight] = useState(0);
  const floorImageWidthRefer = useRef(0);
  const floorImageHeightRefer = useRef(0);
  const [imagePath, setImagePath] = useState("public/1st.png");
  const [floorImageScale, setFloorImageScale] = useState(1.0);
  const [position, setPosition] = useState({ x: 200, y: 200 });
  const [imagePosition, setImagePosition] = useState({ x: 200, y: 200 });
  const [tooltipText, setTooltipText] = useState("ターレ1号機");
  useEffect(() => {
    const img = new window.Image();
    img.src = imagePath;
    img.onload = () => {
      setFloorImage(img);
      floorImageWidthRefer.current = img.width;
      floorImageHeightRefer.current = img.height;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagePath]);
  useEffect(() => {
    const ratioWidth = windowSize.width / floorImageWidthRefer.current;
    const ratioHeight = windowSize.height / floorImageHeightRefer.current;
    const scale = Math.min(ratioWidth, ratioHeight);
    setFloorImageWidth(floorImageWidthRefer.current * scale);
    setFloorImageHeight(floorImageHeightRefer.current * scale);
    setFloorImageScale(scale);
  }, [windowSize, floorImage]);
  useEffect(() => {
    const handleResize = () => {
      // Force re-render on window resize
      setWindowSize({
        width: window.innerWidth - XMargin,
        height: window.innerHeight - YMargin,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    setImagePosition({
      x: position.x * 0.5 * floorImageScale,
      y: position.y * 0.5 * floorImageScale,
    });
  }, [position, floorImageScale]);
  const onClick = () => {
    setImagePath("public/2nd.png");
    setPosition({ x: 100, y: 100 });
    setTooltipText("ターレ2号機");
  };
  return (
    <Stage width={windowSize.width} height={windowSize.height}>
      <Layer>
        <Image
          image={floorImage}
          scaleX={floorImageScale}
          scaleY={floorImageScale}
          onClick={onClick}
        />
      </Layer>
      <Layer>
        <Line
          points={[imagePosition.x, 0, imagePosition.x, floorImageHeight]}
          stroke="red"
        />
        <Line
          points={[0, imagePosition.y, floorImageWidth, imagePosition.y]}
          stroke="red"
        />
        <Circle
          x={imagePosition.x}
          y={imagePosition.y}
          radius={5}
          fill="blue"
        />
        <Text
          x={imagePosition.x}
          y={imagePosition.y}
          text={tooltipText}
          fontFamily="Calibri"
          fontSize={12}
          padding={5}
          textFill="red"
          fill="black"
          // alpha={0.75}
        />
      </Layer>
    </Stage>
  );
};

export default Map;
