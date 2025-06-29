import { useEffect, useRef, useState } from "react";
import "../style.css";

export default function OTPForm({ otpDigit }) {
  const [otpValue, setOtpValue] = useState([]);

  const otpRef = useRef([]);

  useEffect(() => {
    setOtpValue(Array(otpDigit).fill(""));
  }, [otpDigit]);

  const handleOtpChange = (e, index) => {
    const value = e.target.value.trim();
    if (isNaN(value)) return;

    setOtpValue((prev) =>
      [...prev].map((item, i) => {
        if (index === i) return value.slice(-1);
        return item;
      }),
    );
    value && otpRef.current[index + 1]?.focus();
  };

  const handleOtpSubmit = () => {
    console.log(otpValue.join(""));
  };

  const handleKeyDown = (e, index) => {
    if (e.code == "Backspace") {
      !otpValue[index] && otpRef.current[index - 1]?.focus();
    }
  };

  return (
    <div>
      {otpValue?.map((_, index) => (
        <input
          className="otp-inputs"
          type="text"
          name="otp"
          key={index}
          value={otpValue[index] || ""}
          ref={(e) => (otpRef.current[index] = e)}
          onChange={(e) => handleOtpChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          maxLength={1}
        />
      ))}
      <button onClick={handleOtpSubmit}>Submit OTP</button>
    </div>
  );
}
