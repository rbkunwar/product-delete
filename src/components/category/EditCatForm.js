import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addNewCategory } from "../../pages/category/categoryAction";
import { CustomInput } from "../customInpute/CustomInput";
import { fetchProductsByCategoryAction } from "../../pages/product/productAction";

export const EditCatForm = ({ editCat }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({});

  useEffect(() => {
    //   dispatch(getCategoriesAction());
    setForm(editCat);
  }, [dispatch, editCat]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    dispatch(addNewCategory(form));
  };

  const handleOnDelete = () => {
    //
    //check if there are products in this category
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(fetchProductsByCategoryAction(form.slug));
    }
  };
  return (
    <div>
      <Form
        className="border p-5 rounded m-3 shadow-lg"
        onSubmit={handleOnSubmit}
      >
        <Row>
          <Col>
            <Form.Group>
              <label htmlFor="">Status</label>
              <Form.Select name="status" required onChange={handleOnChange}>
                <option value="">-- select --</option>
                <option value="active" selected={form.status === "active"}>
                  Active
                </option>
                <option value="inactive" selected={form.status === "inactive"}>
                  Inactive
                </option>
              </Form.Select>
            </Form.Group>

            <CustomInput
              name="slug"
              required={true}
              value={form.slug}
              onChange={handleOnChange}
              disabled={true}
            />
            <CustomInput
              name="name"
              required={true}
              value={form.name}
              onChange={handleOnChange}
            />

            <div className="d-grid mt-4">
              <label htmlFor=""></label>
              <Button variant="primary" type="submit">
                Update Category!
              </Button>
            </div>

            <div className="d-grid mt-4">
              <Button variant="danger" onClick={handleOnDelete}>
                Delete Category
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
