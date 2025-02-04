import { useTranslate } from "@/app/Translations";
import Form from "./Form";

export default function Register() {
  const translations = {
    firstname: useTranslate("register.form.firstname"),
    lastname: useTranslate("register.form.lastname"),
    email: useTranslate("register.form.email"),
    password: useTranslate("register.form.password"),
    formTitle: useTranslate("register.form.formTitle"),
    formSubtitle: useTranslate("register.form.formSubtitle"),
    linkToSignInLabel: useTranslate("register.form.linkToSignInLabel"),
    loginPage: useTranslate("register.form.loginPage"),
    action: useTranslate("register.form.action"),
    firstnameValidationMessage: useTranslate(
      "register.validationSchema.firstnameValidationMessage"
    ),
    lastnameValidationMessage: useTranslate(
      "register.validationSchema.lastnameValidationMessage"
    ),
    emailValidationMessage: useTranslate(
      "register.validationSchema.emailValidationMessage"
    ),
    passwordValidationMessage: useTranslate(
      "register.validationSchema.passwordValidationMessage"
    ),
    unexpectedError: useTranslate("register.form.unexpectedError"),
  };

  return <Form translations={translations} />;
}
