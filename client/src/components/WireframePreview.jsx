export default function WireframePreview({ layout }) {
  const rootId = layout.rootNodes[0];

  const artboard =
    layout.nodes[rootId];

  const aspectRatio =
    artboard.height / artboard.width;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        paddingBottom: `${aspectRatio * 100}%`,
        background: "#eee",
        border: "2px solid #ccc",
        overflow: "hidden",
      }}
    >
      {artboard.children.map((id) => {
        const node = layout.nodes[id];

        return (
          <div
            key={id}
            style={{
              position: "absolute",
              left: `${node.nx * 100}%`,
              top: `${node.ny * 100}%`,
              width: `${node.nw * 100}%`,
              height: `${node.nh * 100}%`,
              background:
                getColor(node.type),
              border:
                "1px solid black",
              color: "black",
              fontSize: "10px",
              overflow: "hidden",
              padding: "2px",
            }}
          >
            {node.data?.content ||
              node.name}
          </div>
        );
      })}
    </div>
  );
}

function getColor(type) {
  if (type === "image")
    return "lightblue";

  if (type === "text")
    return "lightyellow";

  if (type === "shape")
    return "pink";

  return "#ddd";
}