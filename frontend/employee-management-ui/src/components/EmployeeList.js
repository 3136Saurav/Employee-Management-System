import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeService from "../service/EmployeeService";
import Employee from "./Employee";

const EmployeeList = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await EmployeeService.getEmployees();
        setEmployees(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const deleteEmployee = (e, id) => {
    e.preventDefault();
    EmployeeService.deleteEmployee(id).then((res) => {
      if (employees) {
        setEmployees((prevEmployeeList) => {
          return prevEmployeeList.filter((employee) => employee.id !== id);
        });
      }
    });
  };

  return (
    <>
      <div className="container">
        <button
          onClick={() => navigate("/addEmployee")}
          className="m-5 btn btn-primary"
        >
          Add Employee
        </button>

        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          {!loading && (
            <tbody>
              {employees.map((employee) => (
                <Employee
                  employee={employee}
                  key={employee.id}
                  deleteEmployee={deleteEmployee}
                ></Employee>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </>
  );
};

export default EmployeeList;
