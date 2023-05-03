import React from "react";
import { useNavigate } from "react-router-dom";

const Employee = ({ employee, deleteEmployee }) => {
  const navigate = useNavigate();

  const editEmployee = (event, id) => {
    event.preventDefault();
    navigate(`/editEmployee/${id}`);
  };

  return (
    <tr key={employee.id}>
      <td>{employee.id}</td>
      <td>{employee.firstName}</td>
      <td>{employee.lastName}</td>
      <td>{employee.emailId}</td>
      <td>
        <div className="btn-group mr-2" role="group">
          <button
            type="button"
            onClick={(event) => editEmployee(event, employee.id)}
            className="btn btn-info"
          >
            Update
          </button>
        </div>
        <div className="btn-group mr-2" role="group">
          <button
            type="button"
            onClick={(event) => deleteEmployee(event, employee.id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default Employee;
