import { useState } from "react";

const Error = ({ msg }) => msg && <div style={{ color: "red" }}>{msg}</div>;

const SimpleForm = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    country: "",
    gender: "",
    bio: "",
    terms: false,
  });

  const [err, setErr] = useState({});

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErr((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErr = {};
    const requiredFields = ["name", "email", "country", "gender", "terms"];

    requiredFields.forEach((field) => {
      const val = data[field];
      const isEmpty = typeof val === "boolean" ? !val : !val.toString().trim();
      if (isEmpty) {
        newErr[field] =
          `${field[0].toUpperCase() + field.slice(1)} is required`;
      }
    });

    // custom validations
    if (!newErr.name && data.name.length < 10)
      newErr.name = "Name must be at least 10 characters";

    if (!newErr.email && !/^\S+@\S+\.\S+$/.test(data.email))
      newErr.email = "Invalid email";

    setErr(newErr);
    return Object.keys(newErr).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) console.log("✅ Data:", data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input name="name" value={data.name} onChange={handleChange} />
        <Error msg={err.name} />
      </div>

      <div>
        <label>Email</label>
        <input name="email" value={data.email} onChange={handleChange} />
        <Error msg={err.email} />
      </div>

      <div>
        <label>Country</label>
        <select name="country" value={data.country} onChange={handleChange}>
          <option value="">Select</option>
          <option>India</option>
          <option>USA</option>
          <option>Other</option>
        </select>
        <Error msg={err.country} />
      </div>

      <div>
        <label>Gender</label>
        <label>
          <input
            type="radio"
            name="gender"
            value="Male"
            onChange={handleChange}
          />{" "}
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="Female"
            onChange={handleChange}
          />{" "}
          Female
        </label>
        <Error msg={err.gender} />
      </div>

      <div>
        <label>Bio</label>
        <textarea name="bio" value={data.bio} onChange={handleChange} />
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="terms"
            checked={data.terms}
            onChange={handleChange}
          />
          Accept Terms
        </label>
        <Error msg={err.terms} />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default SimpleForm;
