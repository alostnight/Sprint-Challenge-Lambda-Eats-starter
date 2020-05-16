import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

const pizzaInfo = yup.object().shape({
  name: yup.string().required("Enter Name"),
  size: yup.string().required("Please select size of pizza"),
  special: yup.string("Are there anything request."),
  pepperni: yup.boolean.oneOf([true]),
  sausage: yup.boolean.oneOf([true]),
  pineapple: yup.boolean.oneOf([true]),
  chicken: yup.boolean.oneOf([true]),
  quanity: yup.string(),
});

const Pizza = () => {
  const [formState, setFormState] = useState({
    name: "",
    size: "",
    special: "",
    pepperni: false,
    sausage: false,
    pineapple: false,
    chicken: false,
    quantiy: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    pizzaInfo.isValid(formState).then((vaild) => {
      setButtonDisabled(!vaild);
    });
  }, [formState]);

  const [errorState, setErrorState] = useState({
    name: "",
    size: "",
    special: "",
    pepperni: false,
    sausage: false,
    pineapple: false,
    chicken: false,
    quantiy: "",
  });

  const validate = (e) => {
    yup
      .reach(pizzaInfo, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setErrorState({
          ...errorState,
          [e.target.name]: "",
        });
      })
      .catch((err) => {
        setErrorState({
          ...errorState,
          [e.target.name]: err.errors[0],
        });
      });
  };

  const inputChange = (e) => {
    e.persist();
    validate(e);
    let value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormState({ ...formState, [e.target.name]: value });
  };

  const formSubmit = (e) => {
    e.preventDfault();
    axios
      .post("https://reqres.in/api/user", formState)
      .then((Response) => console.log(Response))
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={formSubmit}>
      <label htmlFor="size">
        Choice of Size(required)
        <select
          value={formState.size}
          name="size"
          id="sizes"
          onChange={inputChange}
        >
          <option value="personal">Personal</option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
        {errorState.size.length > 0 ? (
          <p className="error">{errorState.size}</p>
        ) : null}
      </label>
      <label htmlFor="gluten">
        Choice of Substitute(Choose up to 1)
        <input
          type="checkbox"
          id="gluten"
          name="glutens"
          checked={formState.gluten}
          onChange={inputChange}
        >
        </input>
        {errorState.terms.length > 0 ? (
          <p className="error">{errorState.gluten}</p>
        ) : null}
      </label>
      <button disabled={buttonDisabled}>Submit</button>
    </form>
  );
};

export default Pizza;
