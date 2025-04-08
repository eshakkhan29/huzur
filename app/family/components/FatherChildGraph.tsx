import React from "react";
import ReactFlow from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "./CustomNode";

const generateGraphFromNested = (
  data: any,
  startY = 0,
  spacingX = 200,
  spacingY = 120
) => {
  const nodes = [];
  const edges = [];
  let currentY = startY;

  const traverse = (person, parentId = null, level = 0) => {
    const nodeId = String(person.id);
    // Determine the x-position based on gender
    const x = level * spacingX + spacingX;
    const y = currentY;
    currentY += spacingY;

    nodes.push({
      id: nodeId,
      type: "custom",
      data: {
        label: person.name,
        age: person.age,
        phone: person.phone,
        gender: person.gender,
        children: person.children,
        fatherId: person.fatherId,
      },
      position: { x, y },
    });

    if (parentId) {
      edges.push({
        id: `e${parentId}-${nodeId}`,
        source: String(parentId),
        target: nodeId,
        type: "smoothstep",
        style: {
          stroke: person.gender === "MALE" ? "#1E88E5" : "#D81B60",
          strokeWidth: 1.5,
        },
      });
    }

    person.children.forEach((child) => {
      traverse(child, person.id, level + 1);
    });
  };

  data.forEach((rootPerson) => {
    traverse(rootPerson);
  });

  return { nodes, edges };
};

const nodeTypes = {
  custom: CustomNode,
};

const FatherChildGraph = ({ data }: any) => {
  const { nodes, edges } = generateGraphFromNested(data);

  return (
    <div
      style={{ width: "100%", height: "100vh" }}
      className="bg-gradient-to-br from-[#e0f7fa] to-[#e8f5e9]"
    >
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes}></ReactFlow>
    </div>
  );
};

export default FatherChildGraph;
