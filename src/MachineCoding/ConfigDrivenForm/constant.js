export const configForm = [
  {
    name: "name",
    label: "Full Name",
    type: "text",
    placeholder: "Enter Name",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter Email",
    required: true,
  },
  {
    name: "country",
    label: "Country",
    type: "select",
    options: ["India", "USA", "Other"],
    required: true,
  },

  {
    name: "gender",
    label: "Gender",
    type: "radio",
    options: ["Male", "Female"],
    required:true
  },
  {
    name: "bio",
    label: "Bio",
    value: "",
    type: "textarea",
    placeholder: "Write about yourself",
  },
  {
    name: "terms",
    label: "Accept Terms & Conditions",
    type: "checkbox",
    value: "",
    required: true,
  },
];
