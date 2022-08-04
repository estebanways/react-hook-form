import React from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";

import "./styles.css";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };
  const intialValues = {
    firstName: "bill",
    lastName: "luo",
    email: "bluebill1049@hotmail.com",
    age: -1
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="firstName">First Name</label>
      <input
        defaultValue={intialValues.firstName}
        placeholder="bill"
        {...register("firstName", {
          validate: (value) => value !== "bill"
        })}
      />
      {errors.firstName && <p>Your name is not bill</p>}

      <label htmlFor="lastName">Last Name</label>
      <input
        defaultValue={intialValues.lastName}
        placeholder="luo"
        {...register("lastName", {
          validate: (value) => value.length > 3
        })}
      />
      {errors.lastName && <p>Your last name is less than 3 characters</p>}

      <label htmlFor="email">Email</label>
      <input
        defaultValue={intialValues.email}
        placeholder="bluebill1049@hotmail.com"
        type="email"
        {...register("email")}
      />
      <label htmlFor="age">Age</label>
      <input
        defaultValue={intialValues.age}
        placeholder="0"
        type="text"
        {...register("age", {
          validate: {
            positiveNumber: (value) => parseFloat(value) > 0,
            lessThanHundred: (value) => parseFloat(value) < 200
          }
        })}
      />
      {errors.age && errors.age.type === "positiveNumber" && (
        <p>Your age is invalid</p>
      )}
      {errors.age && errors.age.type === "lessThanHundred" && (
        <p>Your age should be greater than 200</p>
      )}

      <input type="submit" />
    </form>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
