import { useState } from "react";
import "./style.css";
import OTPForm from "./OTPForm";

export default function OTP() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [isOtpScreen, setIsOtpScreen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    if (!data.mobileNumber.trim()) return;
    console.log(data); // Object {mobileNumber: "12344"}
    setIsOtpScreen(true);
  };

  const handleMobileChange = (e) => {
    if (isNaN(e.target.value)) return;
    setMobileNumber(e.target.value);
  };
  return (
    <div className="otp">
      <h1>OT Field </h1>
      {!isOtpScreen ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={handleMobileChange}
            name="mobileNumber"
            value={mobileNumber}
          />
          <button type="submit" disabled={!mobileNumber}>
            Submit
          </button>
        </form>
      ) : (
        <OTPForm otpDigit={4} />
      )}
    </div>
  );
}
