import { useState } from "react";

const ErrorMessage = ({ message }) =>
  message ? <div style={{ color: "red" }}>{message}</div> : null;

const FormProvider = ({ formConfig = [] }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = (name) => {
    const { label, type } = formConfig.find((f) => f.name === name);
    const value = formData[name];
    let error = "";

    if (type === "checkbox" ? !value : !value?.toString().trim()) {
      error = `${label} is required.`;
    } else if (name === "name" && value.length < 10) {
      error = "Name must be at least 10 characters.";
    } else if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = "Invalid email.";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return error;
  };

  const handleBlur = (e) => validate(e.target.name);

  const handleSubmit = (e) => {
    e.preventDefault();
    const hasError = formConfig.some((f) => validate(f.name));
    if (!hasError) {
      console.log("✅ Submitted:", formData);
    }
  };

  const handleReset = () => {
    setFormData({});
    setErrors({});
  };

  const renderField = ({ type, name, label, options, ...rest }) => {
    const commonProps = {
      name,
      onChange: handleChange,
      onBlur: handleBlur,
    };

    const value = formData[name] ?? (type === "checkbox" ? false : "");
    const error = errors[name];

    const renderInput = () => {
      switch (type) {
        case "text":
        case "email":
          return <input type={type} value={value} {...commonProps} {...rest} />;
        case "textarea":
          return <textarea value={value} {...commonProps} {...rest} />;
        case "select":
          return (
            <select value={value} {...commonProps}>
              <option value="">Select</option>
              {options?.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          );
        case "radio":
          return options?.map((opt) => (
            <label key={opt}>
              <input
                type="radio"
                value={opt}
                checked={value === opt}
                {...commonProps}
              />{" "}
              {opt}
            </label>
          ));
        case "checkbox":
          return (
            <label>
              <input type="checkbox" checked={value} {...commonProps} />
              {label}
            </label>
          );
        default:
          return null;
      }
    };

    return (
      <div>
        {type !== "checkbox" && <label>{label}</label>}
        {renderInput()}
        <ErrorMessage message={error} />
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      {formConfig.map((field) => (
        <div key={field.name}>{renderField(field)}</div>
      ))}
      <button type="reset">Reset</button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormProvider;
