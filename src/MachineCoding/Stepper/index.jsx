import StepperSteps from "./stepperSteps";
import { useState } from "react";
import "./style.css";
const Stepper = () => {
  const [selectedTab, setSelectedTab] = useState(1);

  const data = [
    {
      id: 1,
      title: "Sign Up",
      content: <div>This is Signup</div>,
    },
    {
      id: 2,
      title: "Personal Details",
      content: <div>This is personal details</div>,
    },
    {
      id: 3,
      title: "Address",
      content: <div>This is Address </div>,
    },
    {
      id: 4,
      title: "Checkout",
      content: <div>This is Checkout</div>,
    },
  ];

  const handleSelectedTab = (action) => {
    if (action === "next")
      setSelectedTab((prev) => {
        return prev <= data?.length && prev + 1;
      });
    else setSelectedTab((prev) => prev > 0 && prev - 1);
  };

  return (
    <div>
      <StepperSteps steps={data} selectedTab={selectedTab} />
      <button
        onClick={() => handleSelectedTab("prev")}
        disabled={selectedTab <= 0}
      >
        Prev
      </button>
      <button
        onClick={() => handleSelectedTab("next")}
        // disabled={selectedTab == data?.length}
      >
        Next
      </button>
    </div>
  );
};

export default Stepper;
