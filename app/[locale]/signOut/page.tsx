import React from "react";
import SignOut from "./SignOut";
import { useTranslate } from "@/app/Translations";

const SignOutPage = () => {
  const translations = {
    action: useTranslate("signOut.action"),
    confirmation: useTranslate("signOut.confirmation"),
  };
  return (
    <>
      <SignOut translations={translations} />
    </>
  );
};

export default SignOutPage;
