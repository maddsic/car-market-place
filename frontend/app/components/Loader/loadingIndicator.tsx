import React from "react";
import Loader from "./loader";

const LoadingIndicator = ({ isLoading }: { isLoading: Boolean }) => {
  return isLoading ? <Loader /> : null;
};

export default LoadingIndicator;
