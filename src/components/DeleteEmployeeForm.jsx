import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setDetails } from "./store";

const DeleteEmployeeForm = () => {
  const [empid, setEmpId] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    deleteEmployee(empid);
    setEmpId("");
  };

  const fetch = () => {
    axios
      .get("http://localhost:5000/db")
      .then((response) => {
        dispatch(setDetails(response.data));
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  };

  const deleteEmployee = (empid) => {
    axios
      .post("http://localhost:5000/delete", { empid: empid })
      .then((response) => {
        console.log("Employee deleted successfully:", response.data);
        fetch();
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
      });
  };

  return (
    <>
      <h1 className="text-3xl font-bold">Delete Student</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Student ID"
          value={empid}
          onChange={(e) => setEmpId(e.target.value)}
        />
        <button className="border border-black font-semibold" type="submit">
          Delete Student
        </button>
      </form>
    </>
  );
};

export default DeleteEmployeeForm;
