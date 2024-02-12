import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from 'react-redux'
import { setDetails } from "./store";
const UpdateEmployeeForm = () => {

  const dispatch = useDispatch()

  const [empid, setEmpId] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [doj, setDoj] = useState("");
  const [sect, setSect] = useState("");
  const [role, setRole] = useState("");
  const [income, setIncome] = useState("");
  const [address, setAddress] = useState("");

  const fetch = () => {
    axios
      .get("http://localhost:5000/db")
      .then((response) => {
        console.log(response.data);
        dispatch(setDetails(response.data));
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  };


const updateEmployee = (employeeData) => {
  axios
    .post("http://localhost:5000/update", employeeData)
    .then((response) => {
      console.log("Employee updated successfully:", response.data);
      fetch()
    })
    .catch((error) => {
      console.error("Error updating employee:", error);
    });
};


  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedEmployee = {
      empid,
      name,
      dob,
      gender,
      doj,
      sect,
      role,
      income,
      address,
    };

    updateEmployee(updatedEmployee);

    // onUpdateEmployee(updatedEmployee);
    // Reset form fields after submission
    setEmpId("");
    setName("");
    setDob("");
    setGender("");
    setDoj("");
    setSect("");
    setRole("");
    setIncome("");
    setAddress("");
  };

  return (
    <>
      <h1 className="text-3xl font-bold">Update Student</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Student ID"
          value={empid}
          onChange={(e) => setEmpId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Date of Birth"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
        <input
          type="text"
          placeholder="Gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
        <input
          type="text"
          placeholder="Date of Joining"
          value={doj}
          onChange={(e) => setDoj(e.target.value)}
        />
        <input
          type="text"
          placeholder="Dept"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <input
          type="number"
          placeholder="CGPA"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button className="border border-black font-semibold" type="submit">
          Update Student
        </button>
      </form>
    </>
  );
};

export default UpdateEmployeeForm;
