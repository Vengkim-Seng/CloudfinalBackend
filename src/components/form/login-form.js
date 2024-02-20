import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";
import bcrypt from "bcryptjs";
import FormButton from "./form-button";
import FormInput from "./form-input";
import useAuthentication from "../../useAuthentication";
import { showToast } from "../toast-alert";
import { useTranslation } from "react-i18next";

const LoginForm = () => {
  const { t } = useTranslation();
  const { setLoggedIn } = useAuthentication();
  const navigation = useNavigate();
  const navigate = (route) => navigation(route);
  const toast = useToast();
  const email = useRef();
  const password = useRef();

  function Login(e) {
    e.preventDefault();

    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/login`, {
        email: email.current.value,
      })
      .then((response) => {
        const { id, name, email } = response.data.data;

        console.log(response.data.data);
        const verifyPassword = bcrypt.compareSync(
          password.current.value,
          response.data.pass
        );
        if (verifyPassword) {
          showToast(
            toast,
            "You've logged in successfully.",
            "success",
            "Success"
          );

          localStorage.setItem("id", id);
          localStorage.setItem("name", name);
          localStorage.setItem("email", email);
          setLoggedIn(true);
          navigate("/dashboard");
        } else if (!verifyPassword) {
          showToast(toast, "Wrong password try again.");
        }
      })
      .catch((e) => {
        console.log(`>>>>>>>>>>>>>>${e}`);
        showToast(toast, e.response);
      });
  }

  return (
    <div className="col-md-6 col-lg-6 p-md-5 px-4 py-5">
      <form onSubmit={Login}>
        <FormInput name={t("form.email")} type="email" refe={email} />
        <FormInput name={t("form.password")} type="password" refe={password} />
        <FormButton bgColor="btn-primary" btnText={t("form.signIn")} />
      </form>
    </div>
  );
};

export default LoginForm;
