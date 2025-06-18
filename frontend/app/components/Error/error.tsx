import React from "react";

const Error = ({ error }: { error: string }) => {
  return <p className="pt-2 text-xs font-bold text-red-500">{error}</p>;
};

export default Error;
