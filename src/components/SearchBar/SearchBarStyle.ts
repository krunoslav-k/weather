import type { StylesConfig } from "react-select";

type OptionType = {
  value: string;
  label: string;
};

export const customStyles: StylesConfig<OptionType, false> = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: "15px",
    border: "2px solid rgba(255, 255, 255, 0.4)",
    "&:hover": {
      border: "2px solid rgba(255, 255, 255, 0.7)",
      boxShadow: "0 0 8px rgba(255, 255, 255, 0.4)",
    },
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    boxShadow: state.isFocused
      ? "0 0 10px rgba(255, 255, 255, 0.2)"
      : "0 4px 30px rgba(0, 0, 0, 0.1)",
    color: "#fff",
    padding: "0.25rem 0.5rem",
    minHeight: "40px",
    width: "clamp(320px, 40vw, 600px)",
    transition: "all 0.3s ease",
    cursor: "pointer",
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "15px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    marginTop: "0.5rem",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused
      ? "rgba(255, 255, 255, 0.15)"
      : "rgba(255, 255, 255, 0.05)",
    color: "#fff",
    cursor: "pointer",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    transition: "background-color 0.2s ease",
    ":last-child": {
      borderBottom: "none",
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#fff",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "rgba(255, 255, 255, 0.6)",
  }),
  input: (provided) => ({
    ...provided,
    color: "#fff",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "#fff",
    ":hover": { color: "#fff" },
  }),
  clearIndicator: (provided) => ({
    ...provided,
    color: "#fff",
    ":hover": { color: "#fff" },
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
  }),
  loadingIndicator: (provided) => ({
    ...provided,
    color: "#fff",
  }),
  noOptionsMessage: (provided) => ({
    ...provided,
    color: "#fff",
  }),
  loadingMessage: (provided) => ({
    ...provided,
    color: "#fff",
  }),
};
