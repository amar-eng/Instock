import "./Error.scss";
import error from "../../assets/Icons/error-24px.svg";

const Error = () => {
  return (
    <p className="add-error ">
      <img src={error} alt="error" />
      <span className="add-error__text">This field is required</span>
    </p>
  );
};

export default Error;
