import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { CustomInput } from "../../components/customInpute/CustomInput";
import { userRegisterInpute } from "../../assets/inputFieldsList";
import { registerAdminAction } from "./registrationAction";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AdminLayout } from "../../components/layout/AdminLayout";

const Registration = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    role: "admin",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword || form.password.length < 6) {
      return toast.error(
        "Both password must match and have at least 6 character long"
      );
    }
    const isUserCreated = await registerAdminAction(form);
    isUserCreated && navigate("/dashboard");
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <AdminLayout>
      <h2>Register new admin</h2>
      <hr />
      <Form
        onSubmit={handleSubmit}
        className="border p-3 rounded m-3 shadow-lg"
      >
        {userRegisterInpute.map((item, i) => (
          <CustomInput key={i} {...item} onChange={handleOnChange} />
        ))}

        <div className="d-grid mt-3">
          <Button variant="primary" type="submit">
            Register Now!
          </Button>
        </div>
      </Form>
    </AdminLayout>
  );
};

export default Registration;
