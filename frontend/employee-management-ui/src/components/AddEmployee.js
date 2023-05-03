import React, { useState } from "react";
import EmployeeService from "../service/EmployeeService";
import { useNavigate } from "react-router-dom";

export default function AddEmployee() {
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setEmployee({ ...employee, [e.target.name]: value });
  };

  const saveEmployee = (e) => {
    e.preventDefault();
    EmployeeService.saveEmployee(employee)
      .then((employee) => {
        console.log(employee);
        navigate("/employees");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const clearFields = (e) => {
    e.preventDefault();
    setEmployee({
      firstName: "",
      lastName: "",
      emailId: "",
    });
  };

  return (
    <>
      <div className="container">
        <h2 className="text-center">Add Employee</h2>

        <form>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              className="form-control"
              name="firstName"
              value={employee.firstName}
              onChange={(e) => handleChange(e)}
              id="firstName"
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              className="form-control"
              name="lastName"
              value={employee.lastName}
              onChange={(e) => handleChange(e)}
              id="lastName"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              name="emailId"
              value={employee.emailId}
              onChange={(e) => handleChange(e)}
              id="emailId"
            />
          </div>

          <div className="btn-group mr-2" role="group">
            <button
              type="submit"
              onClick={saveEmployee}
              className="btn btn-success"
            >
              Save
            </button>
          </div>
          <div className="btn-group mr-2" role="group">
            <button
              type="button"
              onClick={clearFields}
              className="btn btn-warning"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
