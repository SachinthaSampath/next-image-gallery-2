import React from "react";

const page = ({
  params,
}: {
  params: {
    category: string;
    id: string;
  };
}) => {
  return (
    <div>
      <h1>This is product page ({`${params.id} - ${params.category}`})</h1>
    </div>
  );
};

export default page;
