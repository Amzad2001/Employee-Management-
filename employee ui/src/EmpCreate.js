import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const EmpCreate = () => {
    const [id, idChange] = useState("");
    const [name, nameChange] = useState("");
    const [email, emailChange] = useState("");
    const [phone, phoneChange] = useState("");
    const [active, activeChange] = useState(true);
    const [validation, valChange] = useState(false);

    const navigate = useNavigate();


    const validateName = (name) => /^[a-zA-Z\s]*$/.test(name);
    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePhone = (phone) => /^\d+$/.test(phone);

    const handleSubmit = (e) => {
        e.preventDefault();
        valChange(true);

        if (!validateName(name) || !validateEmail(email) || !validatePhone(phone)) {
            return ; 
        }
        const empData = { name, email, phone, active };

        fetch("http://localhost:8080/api/employees/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(empData),
        })
            .then((res) => {
                alert('Saved successfully.');
                navigate('/');
            })
            .catch((err) => {
                console.log(err.message);
            });
    };



    return (
        <div>
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handleSubmit}>
                        <div className="card" style={{ textAlign: "left" }}>
                            <div className="card-title">
                                <h2>Employee Create</h2>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    {/* <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>ID</label>
                                            <input value={id} disabled className="form-control"></input>
                                        </div>
                                    </div> */}
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input
                                                required
                                                value={name}
                                                onMouseDown={(e) => valChange(true)}
                                                onChange={(e) => nameChange(e.target.value)}
                                                className="form-control"
                                            ></input>
                                            {validation && !validateName(name) && (
                                                <span className="text-danger">Enter a valid name (letters and spaces only).</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input
                                                required
                                                value={email}
                                                onChange={(e) => emailChange(e.target.value)}
                                                className="form-control"
                                            ></input>
                                            {validation && !validateEmail(email) && (
                                                <span className="text-danger">Enter a valid email.</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Phone</label>
                                            <input
                                                required
                                                value={phone}
                                                onChange={(e) => phoneChange(e.target.value)}
                                                className="form-control"
                                            ></input>
                                            {validation && !validatePhone(phone) && (
                                                <span className="text-danger">Enter a valid phone number (digits only).</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <button className="btn btn-success" type="submit" >Save</button>
                                            <Link to="/" className="btn btn-danger">Back</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EmpCreate;
