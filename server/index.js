import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  const { message, layout } = req.body;

  console.log("User message:", message);

  let updatedLayout = structuredClone(layout);

  // Convert to 9:16
  if (message.toLowerCase().includes("9:16")) {
    const rootId = updatedLayout.rootNodes[0];

    const artboard =
      updatedLayout.nodes[rootId];

    artboard.width = 1080;
    artboard.height = 1920;

    artboard.children.forEach((childId) => {
      const node =
        updatedLayout.nodes[childId];

      node.x = node.nx * 1080;
      node.y = node.ny * 1920;

      node.width = node.nw * 1080;
      node.height = node.nh * 1920;
    });

    return res.json({
      explanation:
        "Converted design to 9:16",
      updatedLayout,
    });
  }

  // Move headline to top
  if (
    message.toLowerCase().includes("headline") &&
    message.toLowerCase().includes("top")
  ) {
    const headline = Object.values(
      updatedLayout.nodes
    ).find(
      (node) =>
        node.type === "text" &&
        node.data?.content?.includes("Luxury")
    );

    if (headline) {
      headline.y = 80;
      headline.ny = 80 / 1080;
    }

    return res.json({
      explanation:
        "Moved headline to top",
      updatedLayout,
    });
  }

  // Make headline smaller
  if (
    message.toLowerCase().includes("headline") &&
    message.toLowerCase().includes("smaller")
  ) {
    const headline = Object.values(
      updatedLayout.nodes
    ).find(
      (node) =>
        node.type === "text" &&
        node.data?.content?.includes("Luxury")
    );

    if (headline) {
      headline.style.visual.fontSize = 48;
    }

    return res.json({
      explanation:
        "Made headline smaller",
      updatedLayout,
    });
  }

  // Move offer badge higher
  if (
    message.toLowerCase().includes("badge") &&
    message.toLowerCase().includes("higher")
  ) {
    const badge = Object.values(
      updatedLayout.nodes
    ).find(
      (node) =>
        node.type === "shape"
    );

    const badgeText = Object.values(
      updatedLayout.nodes
    ).find(
      (node) =>
        node.type === "text" &&
        node.data?.content?.includes("20%")
    );

    if (badge) {
      badge.y -= 100;
      badge.ny = badge.y / 1080;
    }

    if (badgeText) {
      badgeText.y -= 100;
      badgeText.ny =
        badgeText.y / 1080;
    }

    return res.json({
      explanation:
        "Moved offer badge higher",
      updatedLayout,
    });
  }

  // Keep product large
  if (
    message.toLowerCase().includes("product") &&
    message.toLowerCase().includes("large")
  ) {
    const product = Object.values(
      updatedLayout.nodes
    ).find(
      (node) =>
        node.name?.includes("Product")
    );

    if (product) {
      product.width *= 1.2;
      product.height *= 1.2;

      product.nw =
        product.width / 1080;

      product.nh =
        product.height / 1080;
    }

    return res.json({
      explanation:
        "Kept product large",
      updatedLayout,
    });
  }

  // Default response
  res.json({
    explanation:
      `Instruction received: ${message}`,
    updatedLayout,
  });
});

app.listen(3001, () => {
  console.log(
    "Server running on port 3001"
  );
});