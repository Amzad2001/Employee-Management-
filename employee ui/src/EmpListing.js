import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const EmpListing = () => {
    
    const [empdata, empdatachange] = useState([]);
    const navigate = useNavigate();

    const LoadDetail = (id) => {
        navigate("/api/employees/detail/" + id);
    }

    const LoadEdit = (id) => {
        navigate(`/employees/edit/${id}`); 
    }

    const Removefunction = (id) => {
        if (window.confirm('Do you want to remove?')) {
            fetch(`http://localhost:8080/api/employees/delete/${id}`, {
                method: "DELETE"
            }).then((res) => {
                if (res.ok) {
                    alert('Removed successfully.');
                    fetchEmployees(); 
                } else {
                    alert('Failed to r1emove.');
                }
            }).catch((err) => {
                console.log(err.message);
            });
        }
    }
    

    const fetchEmployees = () => {
        fetch("http://localhost:8080/api/employees/list")
            .then((res) => res.json())
            .then((resp) => {
                empdatachange(resp);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    useEffect(() => {
        fetchEmployees();
    }, []);

    return (
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2>Employee Details</h2>
                </div>
                <div className="card-body">
                    <div className="divbtn">
                        <Link to="employee/create" className="btn btn-success">New User</Link>
                    </div>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <td>S.No</td>
                                {/* <td>ID</td> */}
                                <td>Name</td>
                                <td>Email</td>
                                <td>Phone</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {empdata &&
                                empdata.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td> 
                                        {/* <td>{item.id}</td> */}
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phone}</td>
                                        <td>
                                            <button onClick={() => LoadEdit(item.id)} className="btn btn-success">Edit</button>
                                            <button onClick={() => Removefunction(item.id)} className="btn btn-danger">Remove</button>
                                            {/* <button onClick={() => LoadDetail(item.id)} className="btn btn-primary">Details</button> */}
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default EmpListing;