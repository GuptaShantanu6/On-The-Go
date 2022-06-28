import React from "react";
import loading from "./loading.gif";

const Spinner = () => {
  return (
    <div className="text-center my-10">
      <img
        className="mx-3 my-3"
        src={loading}
        alt="loading"
        height="40px"
        width="40px"
      />
    </div>
  );
};

export default Spinner;
