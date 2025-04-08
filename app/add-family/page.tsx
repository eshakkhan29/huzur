"use client";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";

function AddFamilyPage() {
  const [loading, setLoading] = useState(false);
  // get user data
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(
        "https://explore-prisma-express-app.onrender.com/users"
      );
      setData(data);
    };
    getData();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      age: "",
      gender: "",
      fatherId: null,
      mother: "",
      siblingsIds: [],
    },
    onSubmit: async (values) => {
      const finalValue = {
        ...values,
        fatherId: parseInt(values.fatherId),
        siblingsIds: values?.siblingsIds?.map((id) => parseInt(id)),
      };
      console.log("values", finalValue);
      try {
        setLoading(true);
        const { data } = await axios.post(
          "https://explore-prisma-express-app.onrender.com/users",
          finalValue
        );
        console.log(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    },
  });
  return (
    <div className="p-20">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-4 px-40"
      >
        <input
          type="text"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
          placeholder="Name"
        />
        <input
          type="text"
          name="phone"
          onChange={formik.handleChange}
          value={formik.values.phone}
          placeholder="Mobile number"
        />
        <input
          type="number"
          name="age"
          onChange={formik.handleChange}
          value={formik.values.age}
          placeholder="Age"
        />
        <select
          name="gender"
          id=""
          onChange={formik.handleChange}
          value={formik.values.gender}
        >
          <option value="">Select gender</option>
          <option value="MALE">MALE</option>
          <option value="FEMALE">FEMALE</option>
        </select>

        <select
          name="fatherId"
          id=""
          onChange={formik.handleChange}
          value={formik.values.fatherId}
        >
          <option value="">Select Father of this person</option>
          {data?.map((item: any, i: number) => (
            <option key={i} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="mother"
          onChange={formik.handleChange}
          value={formik.values.mother}
          placeholder="Mother name"
        />

        {/* select with multiple */}
        <select
          multiple
          name="siblingsIds"
          onChange={formik.handleChange}
          value={formik.values.siblingsIds}
          className="w-full"
        >
          <option value="">Select Siblings for this person</option>
          {data?.map((item: any, i: number) => (
            <option key={i} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 px-3 py-2 rounded-lg text-white font-semibold text-lg"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default AddFamilyPage;
