import React, { useEffect, useState } from "react";
const Forms = () => {
  const [Item, setItem] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [formerror, setFormerror] = useState({});
  const [flager, setFlager] = useState(false);

  function changed(e) {
    const { name, value } = e.target;
    setItem((prev) => ({ ...prev, [name]: value }));
  }

  function submit(e) {
    e.preventDefault();
    setFormerror(validate(Item));
    setFlager(true);
    if (Object.keys(formerror).length === 0 && flager) {
      setItem({
        name: "",
        email: "",
        password: "",
      });
    }
  }

  useEffect(() => {
    if (Object.keys(formerror).length === 0 && flager) {
      setItem({
        name: "",
        email: "",
        password: "",
      });
    }
  }, [formerror]);

  const validate = (values) => {
    const errors = {};
    const regux = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const reguxexp = /[A-Z]/;
    const reguxno = /\d/;
    if (!values.name) {
      errors.name = "! enter the name corectly";
    }
    if (!values.email) {
      errors.email = "! Enter the email correctly ";
    } else if (!regux.test(values.email)) {
      errors.email = "Enter an valid email!";
    }
    if (!values.password) {
      errors.password = "! Enter the password";
    } else if (values.password.length > 8) {
      errors.password = "enter the password with lenght 8";
    } else if (!reguxexp.test(values.password)) {
      errors.password = "Must contain one capital letter";
    } else if (!reguxno.test(values.password)) {
      errors.password = "Must contain one number";
    }
    return errors;
  };
  return (
    <div className="form">
      {Object.keys(formerror).length === 0 && flager ? (
        <div className="succ">Succesfully logged in</div>
      ) : (
        ""
      )}
      <h2 className="head">Log in form</h2>
      <div className="line"></div>
      <div className="form-elem">
        <div>
          <input
            type="text"
            className="inp"
            placeholder="Name"
            onChange={changed}
            value={Item.name}
            name="name"
          />
          <p className="error">{formerror.name}</p>
        </div>
        <div>
          <input
            type="email"
            className="inp"
            placeholder="Email"
            onChange={changed}
            value={Item.email}
            name="email"
          />
          <p className="error">{formerror.email}</p>
        </div>
        <div>
          <input
            type="password"
            className="inp"
            placeholder="Password"
            onChange={changed}
            value={Item.password}
            name="password"
          />
          <h6>password should contain one capital letter and one number</h6>
          <p className="error">{formerror.password}</p>
          <p className="error">{formerror.passwordno}</p>
          <p className="error">{formerror.passwordcap}</p>
        </div>
        <div>
          <button className="btn" onClick={submit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Forms;
