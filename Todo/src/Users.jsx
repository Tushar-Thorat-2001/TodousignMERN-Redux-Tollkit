import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser, updateUser } from "./redux/userSlice";

function Users() {
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch users when the component mounts
    axios.get("http://localhost:3001/getusers").then((res) => {
      dispatch(updateUser(res.data));
    });
  }, [dispatch]);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/deleteuser/${id}`)
      .then((res) => {
        dispatch(deleteUser({ id }));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex vh-100 vw-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <Link to="/create" className="btn btn-success btn-sm">
          Add +
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>
                  <Link
                    to={`/edit/${user.id}`}
                    className="btn btn-sm btn-success me-2"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
