import React, { useState } from "react";
import { useEffect } from "react";
import EmployeeService from "../service/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    id: id,
    firstName: "",
    lastName: "",
    emailId: "",
  });

  const updateEmployee = (e) => {
    e.preventDefault();
    EmployeeService.updateEmployee(employee, id)
      .then((res) => navigate("/employees"))
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setEmployee({ ...employee, [e.target.name]: value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await EmployeeService.getEmployeeById(id);
        setEmployee(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="container">
        <h2 className="text-center">Update Employee</h2>

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
              onClick={updateEmployee}
              className="btn btn-success"
            >
              Update
            </button>
          </div>
          <div className="btn-group mr-2" role="group">
            <button
              type="button"
              onClick={() => navigate("/employees")}
              className="btn btn-warning"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
