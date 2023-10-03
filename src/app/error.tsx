"use client";
//error page should be in a component
import ErrorPage from "@/components/Error/ErrorPage";
import React from "react";
import { Button } from "react-bootstrap";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}
const ErrorsPage = ({ error, reset }: ErrorPageProps) => {
  console.log(reset, error);

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <ErrorPage error={error} reset={reset} />
    </div>
  );
};

export default ErrorsPage;
