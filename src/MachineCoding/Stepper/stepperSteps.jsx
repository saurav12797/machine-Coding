import "./style.css";
const StepperSteps = ({ steps, selectedTab }) => {
  return (
    <div className="stepper-steps">
      <div className="steps">
        {steps?.map((data, index) => {
          return (
            <>
              <div className="stepper-wrapper">
                <div className="stepper-title">
                  <span>{index + 1}</span> {data?.title}{" "}
                </div>
                {index !== steps?.length - 1 && <div className="line" />}
              </div>
            </>
          );
        })}
      </div>
      <div>{steps[selectedTab - 1]?.content}</div>
    </div>
  );
};
export default StepperSteps;
