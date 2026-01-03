import { Stage, Layer, Image, Circle, Line, Text } from "react-konva";
import { useState, useEffect, useRef } from "react";

const XMargin = 100;
const YMargin = 200;

const Map = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth - XMargin,
    height: window.innerHeight - YMargin,
  });
  const [targetArray, setTargetArray] = useState<
    Array<{ x: number; y: number; name: string }>
  >([]);
  const targetMap = useRef(
    {} as Map<string, { x: number; y: number; name: string }>
  );
  const [floorImage, setFloorImage] = useState<HTMLImageElement | undefined>();
  const [floorImageWidth, setFloorImageWidth] = useState(0);
  const [floorImageHeight, setFloorImageHeight] = useState(0);
  const floorImageWidthRefer = useRef(0);
  const floorImageHeightRefer = useRef(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [imagePath, setImagePath] = useState("public/1st.png");
  const [floorImageScale, setFloorImageScale] = useState(1.0);
  useEffect(() => {
    const img = new window.Image();
    img.src = imagePath;
    img.onload = () => {
      setFloorImage(img);
      floorImageWidthRefer.current = img.width;
      floorImageHeightRefer.current = img.height;
      const newTargetArray: Array<{ x: number; y: number; name: string }> = [];
      for (let i = 1; i <= 5; i++) {
        const x = Math.random() * 500;
        const y = Math.random() * 500;
        const name = `ターレ${i}号機`;
        targetMap.current[name] = { x, y, name };
        newTargetArray.push({ x, y, name });
      }
      setTargetArray(newTargetArray);
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
  const onClick = () => {
    // setImagePath("public/2nd.png");
    const newTargetArray: Array<{ x: number; y: number; name: string }> = [];
    for (let i = 1; i <= 5; i++) {
      const x = Math.random() * 500;
      const y = Math.random() * 500;
      const name = `ターレ${i}号機`;
      targetMap.current[name] = { x, y, name };
      newTargetArray.push({ x, y, name });
    }
    setTargetArray(newTargetArray);
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
        {targetArray.map(({ x, y, name }) => (
          <>
            <Line
              points={[x, 0, x, floorImageHeight]}
              stroke="red"
              alpha={0.5}
              thickness={1}
              opacity={0.2}
            />
            <Line
              points={[0, y, floorImageWidth, y]}
              stroke="red"
              opacity={0.2}
            />
            <Circle x={x} y={y} radius={5} fill="blue" />
            <Text
              x={x}
              y={y}
              text={name}
              fontFamily="Calibri"
              fontSize={12}
              padding={5}
              textFill="red"
              fill="black"
              alpha={0.75}
              sceneFunc={(context, shape) => {
                context.fillStyle = "rgb(255,255,204)";
                context.fillRect(
                  0 + 5,
                  0 + 5,
                  shape.width() - 5,
                  shape.height() - 5
                );
                (shape as Konva.Text)._sceneFunc(context);
              }}
            />
          </>
        ))}
      </Layer>
    </Stage>
  );
};

export default Map;
