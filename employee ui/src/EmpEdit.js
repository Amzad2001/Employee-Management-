import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EmpEdit = () => {
    const { empid } = useParams();

    const [id, idChange] = useState("");
    const [name, nameChange] = useState("");
    const [email, emailChange] = useState("");
    const [phone, phoneChange] = useState("");
    const [active, activeChange] = useState(true);
    const [validation, valChange] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8080/api/employees/details/${empid}`).then((res) => {
            return res.json();
        }).then((resp) => {
            idChange(resp.id);
            nameChange(resp.name);
            emailChange(resp.email);
            phoneChange(resp.phone);
            activeChange(resp.isactive);
        }).catch((err) => {
            console.log(err.message);
        });
    }, [empid]);

    const validateName = (name) => /^[a-zA-Z\s]*$/.test(name);
    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePhone = (phone) => /^\d+$/.test(phone);

    const handleSubmit = (e) => {
        e.preventDefault();
        valChange(true);

        if (!validateName(name) || !validateEmail(email) || !validatePhone(phone)) {
            console.log("Validation failed");
            return; 
        }

        const empData = { name, email, phone, active };

        fetch(`http://localhost:8080/api/employees/edit/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(empData),
        }).then((res) => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            alert('Saved successfully.');
            navigate('/');
        }).catch((err) => {
            console.log('Fetch error: ', err.message);
        });
        
    }

    return (
        <div>
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handleSubmit}>
                        <div className="card" style={{ textAlign: "left" }}>
                            <div className="card-title">
                                <h2>Employee Edit</h2>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    {/* <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>ID</label>
                                            <input value={id} disabled className="form-control" />
                                        </div>
                                    </div> */}
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input
                                                required
                                                value={name}
                                                onMouseDown={() => valChange(true)}
                                                onChange={(e) => nameChange(e.target.value)}
                                                className="form-control"
                                            />
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
                                            />
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
                                            />
                                            {validation && !validatePhone(phone) && (
                                                <span className="text-danger">Enter a valid phone number (digits only).</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <button className="btn btn-success" type="submit">Save</button>
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
}

export default EmpEdit;