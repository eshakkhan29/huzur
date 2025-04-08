"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import FatherChildGraph from "./components/FatherChildGraph";
import buildNestedChildren from "@/utils/buildNestedChildren";

function FamilyPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const { data } = await axios.get(
        "https://explore-prisma-express-app.onrender.com/users-tree"
      );
      const formattedData = buildNestedChildren(data);
      setData(formattedData);
      setLoading(false);
    };
    getData();
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {data && !loading && <FatherChildGraph data={data} />}
    </div>
  );
}

export default FamilyPage;
