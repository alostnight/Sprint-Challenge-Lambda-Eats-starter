import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

const formInfo = yup.object().shape({
  name: yup.string().required().min(2, "Name is too short"),
  size: yup.string(),
  special: yup.string(),
  toppings: yup.boolean().oneOf([true]),
  pepperoni: yup.boolean(),
  sausage: yup.boolean(),
  pineapple: yup.boolean(),
  chicken: yup.boolean(),
});

const Form = () => {
    const [formState, setFormState] = useState({
      name: "",
      size: "",
      special: "",
      toppings: "",
    });

    const [buttonDisabled, setButtonDisabled] = useState(true);

    useEffect(() => {
    formInfo.isValid(formState).then(valid => {
      setButtonDisabled(!valid);
    });
  }, [formState]);

  const [errorState, setErrorState] = useState({
    name: "",
    size: "",
    special: "",
    toppings: "",
  });

  const validateChange = (e) => {
    yup
      .reach(formInfo, e.target.name)
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

  const inputChange = e => {
    e.persist();
    validateChange(e);
    let value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormState({ ...formState, [e.target.name]: value });
  };

  const [post, setPost] = useState([]);

  const formSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://reqres.in/api/users", formState)
      .then((res) => {
        setPost(res.data);
        console.log(post);
        setFormState({
          name: "",
          size: "",
          special: "",
          toppings: "",
        });
      })
      .catch((err) => console.log(err.response));
  };

  return (
    <form onSubmit={formSubmit}>
      <label htmlFor="name">
        Name
        <input
          type="text"
          name="name"
          value={formState.name}
          onChange={inputChange}
        />
      </label>
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
      Would You Like To Add Toppings?

      <label htmlFor="toppings">
        <input
          type="checkbox"
          id="toppings"
          name="toppings"
          checked={formState.toppings}
          onChange={inputChange}
        />
        {errorState.toppings.length > 0 ? (
          <p className="error">{errorState.toppings}</p>
        ) : null}
        </label>

        Pepperoni
      <label htmlFor="pepperoni">
        <input
          type="checkbox"
          id="pepperoni"
          name="pepperoni"
          checked={formState.pepperni}
          onChange={inputChange}
        />
        </label>

        Sausage
    <label htmlFor="sausage">
        <input
          type="checkbox"
          id="sausage"
          name="sausage"
          checked={formState.sausage}
          onChange={inputChange}
        />

        </label>

        Chicken
    <label htmlFor="chicken">
        <input
          type="checkbox"
          id="chicken"
          name="chicken"
          checked={formState.chicken}
          onChange={inputChange}
        />

        </label>

        Pineapple
    <label htmlFor="pineapple">
        <input
          type="checkbox"
          id="pineapple"
          name="pineapple"
          checked={formState.pineapple}
          onChange={inputChange}
        />

        </label>

      <label htmlFor="special">
        Would you like to add special instructions?
        <textarea
          name="special"
          value={formState.special}
          onChange={inputChange}
          data-cy="textarea"
        />
        {errorState.special.length > 0 ? (
          <p className="error">{errorState.special}</p>
        ) : null}
      </label>
      
      <button disabled={buttonDisabled}>Submit</button>
    </form>
  );
};

export default Form;