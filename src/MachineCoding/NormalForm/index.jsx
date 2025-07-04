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

  const required = ["name", "email", "country", "gender", "terms"];

  const validateField = (name, value) => {
    if (required.includes(name)) {
      const empty = typeof value === "boolean" ? !value : !value.trim?.();
      if (empty) return `${name} is required`;
    }

    if (name === "name" && value.length < 10)
      return "Name must be at least 10 characters";

    if (name === "email" && !/^\S+@\S+\.\S+$/.test(value))
      return "Invalid email";

    return "";
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    const msg = validateField(name, data[name]);
    setErr((prev) => ({ ...prev, [name]: msg }));
  };

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    const val = type === "checkbox" ? checked : value;
    setData((prev) => ({ ...prev, [name]: val }));
    setErr((prev) => ({ ...prev, [name]: "" })); // clear error while typing
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErr = {};
    Object.entries(data).forEach(([key, val]) => {
      const msg = validateField(key, val);
      if (msg) newErr[key] = msg;
    });
    setErr(newErr);
    if (!Object.keys(newErr).length) {
      console.log("✅ Submitted:", data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input
          name="name"
          value={data.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Error msg={err.name} />
      </div>

      <div>
        <label>Email</label>
        <input
          name="email"
          value={data.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Error msg={err.email} />
      </div>

      <div>
        <label>Country</label>
        <select
          name="country"
          value={data.country}
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <option value="">Select</option>
          <option>India</option>
          <option>USA</option>
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
            checked={data.gender === "Male"}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="Female"
            checked={data.gender === "Female"}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          Female
        </label>
        <Error msg={err.gender} />
      </div>

      <div>
        <label>Bio</label>
        <textarea
          name="bio"
          value={data.bio}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="terms"
            checked={data.terms}
            onChange={handleChange}
            onBlur={handleBlur}
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
