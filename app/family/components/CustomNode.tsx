// components/CustomNode.tsx
import React from "react";
import { Handle, Position } from "reactflow";
import { FaMale, FaFemale } from "react-icons/fa";

const CustomNode = ({ data }: any) => {
  const isMale = data.gender === "MALE";

  return (
    <div
      className={`rounded-xl shadow-lg p-4 text-center border-2 ${
        isMale ? "bg-blue-50 border-blue-300" : "bg-pink-50 border-pink-300"
      }`}
    >
      <div className="flex items-center justify-center gap-2 text-lg font-semibold capitalize">
        {isMale ? (
          <FaMale className="text-blue-600" />
        ) : (
          <FaFemale className="text-pink-600" />
        )}
        {data.label}
      </div>
      <p className="text-sm text-gray-500">Age: {data.age}</p>
      {data.phone && (
        <p className="text-sm text-gray-500">Phone: {data.phone}</p>
      )}

      {/* TOP: Target Handle */}
      {data?.fatherId && (
        <Handle
          type="target"
          position={Position.Top}
          style={{
            background: isMale ? "#1E88E5" : "#D81B60",
            border: "2px solid white",
            width: 10,
            height: 10,
            borderRadius: "50%",
            top: -6,
          }}
        />
      )}

      {/* Right: Source Handle */}
      {data?.children?.length > 0 && (
        <Handle
          type="source"
          position={Position.Right}
          style={{
            background: isMale ? "#1E88E5" : "#D81B60",
            border: "2px solid white",
            width: 10,
            height: 10,
            borderRadius: "50%",
            bottom: -6,
          }}
        />
      )}
    </div>
  );
};

export default CustomNode;
