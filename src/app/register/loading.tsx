import React from "react";

import { Spinner } from "@/components/bootstrap";

const loading = () => {
  return (
    <div className="">
      <Spinner animation="border" className="d-block m-auto" />
    </div>
  );
};

export default loading;
