import React, { useEffect, useState } from "react";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { newCategory } from "../../assets/inputFieldsList";

import { CustomInput } from "../../components/customInpute/CustomInput";
import { Button, Col, Form, Row } from "react-bootstrap";

import slugify from "slugify";
import { useDispatch } from "react-redux";
import { addNewCategory, getCategoriesAction } from "./categoryAction";
import { CatTable } from "../../components/category/CatTable";

const Category = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({});

  useEffect(() => {
    dispatch(getCategoriesAction());
  }, [dispatch]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const slug = slugify(form.name, {
      trim: true,
      lower: true,
    });
    dispatch(addNewCategory({ ...form, slug }));
  };
  return (
    <AdminLayout>
      <div className="page-title mt-4">Category</div>
      <hr />
      {/* form   */}
      <div>
        <Form
          className="border p-5 rounded m-3 shadow-lg"
          onSubmit={handleOnSubmit}
        >
          <h2>Admin login only</h2>
          <hr />
          <Row>
            <Col>
              {" "}
              <Form.Group>
                <label htmlFor="">Status</label>
                <Form.Select name="status" required onChange={handleOnChange}>
                  <option value="">-- select --</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              {newCategory.map((item, i) => (
                <CustomInput key={i} {...item} onChange={handleOnChange} />
              ))}
            </Col>
            <Col>
              <div className="d-grid mt-4">
                <label htmlFor=""></label>
                <Button variant="primary" type="submit">
                  Add Category!
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </div>

      {/* table */}

      <div>
        <CatTable />
      </div>
    </AdminLayout>
  );
};

export default Category;
