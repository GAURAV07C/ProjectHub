"use client";

import React, { Suspense, useCallback, useEffect, useState } from "react";
import CardWrapper from "@/components/auth/card-wrapper";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/actions/new-verification";
import { BeatLoader } from "react-spinners";
import FormError from "@/components/form-error";
import FormSucess from "@/components/form-sucess";




const NewVerificationForm = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewVerificationFormContent />
    </Suspense>
  );
};

const NewVerificationFormContent = () => {
  const [error, setError] = useState<string | undefined>("");
  const [sucess, setSucess] = useState<string | undefined>("");

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const OnSubmit = useCallback(() => {
    if (!token) {
      setError("Missing token");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSucess(data.sucess);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong");
      });
  }, [token]);

  useEffect(() => {
    OnSubmit();
  }, [OnSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center justify-center w-full">
        {!sucess && !error && <BeatLoader />}

        <FormSucess message={sucess} />
        <FormError message={error} />
      </div>
    </CardWrapper>
  );
};

export default NewVerificationForm;
