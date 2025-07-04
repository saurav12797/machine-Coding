import { configForm } from "./constant";
import FormProvider from "./formProvider";

const ConfigDrivenForm = () => {
  return (
    <div className="config-driven-form">
      <h1> Form</h1>
      <div className="form">
        <FormProvider formConfig={configForm} />
      </div>
    </div>
  );
};

export default ConfigDrivenForm;
