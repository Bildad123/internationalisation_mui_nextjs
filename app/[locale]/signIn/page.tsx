import { useTranslate } from "@/app/Translations";
import Form from "./Form";

export default function SignIn() {
  const translations = {
    email: useTranslate("signIn.form.email"),
    password: useTranslate("signIn.form.password"),
    formTitle: useTranslate("signIn.form.formTitle"),
    formSubtitle: useTranslate("signIn.form.formSubtitle"),
    linkToRegisterLabel: useTranslate("signIn.form.linkToRegisterLabel"),
    registerPage: useTranslate("signIn.form.registerPage"),
    action: useTranslate("signIn.form.action"),
    unexpectedError: useTranslate("signIn.form.unexpectedError"),
    emailValidationMessage: useTranslate(
      "signIn.validationSchema.emailValidationMessage"
    ),
    passwordValidationMessage: useTranslate(
      "signIn.validationSchema.passwordValidationMessage"
    ),
  };

  return <Form translations={translations} />;
}
