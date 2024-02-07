import { BBAnchor, Html } from "@react-three/drei";

interface IHtmlAnnotationProps {
  anchor: THREE.Vector3Tuple;
  text: string;
}

export function HtmlAnnotation({ anchor, text }: IHtmlAnnotationProps) {
  return (
    <BBAnchor position={[0, 0, 0]} anchor={anchor}>
      <Html
        distanceFactor={5}
        zIndexRange={[10, 0]}
        unselectable="off"
        center
        style={{
          pointerEvents: "none",
        }}
      >
        <div
          className="content"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              background: "white",
              width: "max-content",
              height: "max-content",
              fontSize: "100px",
              border: "3px solid gray",
              lineHeight: 1,
              borderRadius: "10px",
              padding: "0 10px",
            }}
          >
            {text}
          </div>
        </div>
      </Html>
    </BBAnchor>
  );
}
