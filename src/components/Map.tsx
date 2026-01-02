import { Stage, Layer, Image, Circle, Line } from "react-konva";
import { useState, useEffect, useRef } from "react";

const XMargin = 100;
const YMargin = 200;

const Map = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth - XMargin,
    height: window.innerHeight - YMargin,
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [floorImage, setFloorImage] = useState();
  // setFloorImage(useImage("public/1st.png"));
  const [floorImageWidth, setFloorImageWidth] = useState(0);
  const [floorImageHeight, setFloorImageHeight] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const floorImageWidthRefer = useRef(0);
  const floorImageHeightRefer = useRef(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [imagePath, setImagePath] = useState("public/1st.png");
  // const [floorImage, setFloorImage] = useState(useImage("public/1st.png"));
  const [floorImageScale, setFloorImageScale] = useState(1.0);
  // const calcScale = () => {
  //   const ratioWidth = windowSize.width / floorImageWidth.current;
  //   const ratioHeight = windowSize.height / floorImageHeight.current;
  //   const scale = Math.min(ratioWidth, ratioHeight);
  //   setFloorImageScale(scale);
  // };
  const [position, setPosition] = useState({ x: 200, y: 200 });
  useEffect(() => {
    const img = new window.Image();
    img.src = imagePath;
    img.onload = () => {
      setFloorImage(img);
      // setFloorImageWidth(img.width);
      // setFloorImageHeight(img.height);
      floorImageWidthRefer.current = img.width;
      floorImageHeightRefer.current = img.height;
      console.log(`Image loaded: ${img.width}x${img.height}`);
      const ratioWidth = windowSize.width / img.width;
      const ratioHeight = windowSize.height / img.height;
      const scale = Math.min(ratioWidth, ratioHeight);
      setFloorImageWidth(img.width * scale);
      setFloorImageHeight(img.height * scale);
      setFloorImageScale(scale);
    };
  }, [imagePath, windowSize]);
  useState(() => {
    const handleResize = () => {
      // Force re-render on window resize
      setWindowSize({
        width: window.innerWidth - XMargin,
        height: window.innerHeight - YMargin,
      });
      // setFloorImageScale(calcScale());
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onClick = (e: unknown) => {
    setImagePath("public/2nd.png");
    setPosition({ x: 100, y: 100 });
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
          points={[position.x, 0, position.x, floorImageHeight]}
          stroke="red"
        />
        <Line
          points={[0, position.y, floorImageWidth, position.y]}
          stroke="red"
        />
        <Circle x={position.x} y={position.y} radius={10} fill="blue" />
      </Layer>
    </Stage>
  );
};

export default Map;
