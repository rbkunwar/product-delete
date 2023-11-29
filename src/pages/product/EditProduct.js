import React, { useEffect, useState } from "react";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { ProdctTable } from "../../components/product/ProductTable";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { CustomInput } from "../../components/customInpute/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesAction } from "../category/categoryAction";
import { addNewProduct, fetchSelectedProductsAction } from "./productAction";
import slugify from "slugify";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase-config";
import { PRODUCTTABLE } from "../../assets/constants";
import { toast } from "react-toastify";

const initialState = { status: "inactive", price: 0, name: "" };

const EditProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [form, setForm] = useState(initialState);
  const [image, setImage] = useState();
  const [imageToDelete, setImageToDelete] = useState([]);

  const { category } = useSelector((state) => state.cat);
  const { selectedProduct } = useSelector((state) => state.prod);

  useEffect(() => {
    !category.length && dispatch(getCategoriesAction());

    form.id !== id && dispatch(fetchSelectedProductsAction(id));
    selectedProduct.id !== form.id && setForm(selectedProduct);
  }, [dispatch, id, selectedProduct, form.id]);

  const handleOnChanage = (e) => {
    let { name, value, checked } = e.target;

    if (name === "status") {
      value = checked ? "active" : "inactive";
    }

    console.log(name, value, checked);

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const { id, imgUrlList, ...rest } = form;

    const updateImgList =
      imgUrlList?.filter((img) => !imageToDelete.includes(img)) || [];
    dispatch(addNewProduct({ slug: id, ...rest, imgUrlList: updateImgList }));
  };

  const inputFields = [
    {
      label: "Product Name",
      name: "name",
      type: "text",
      placeholder: "Laptop",
      required: true,
      value: form.name,
    },
    {
      label: "Price",
      name: "price",
      type: "number",
      placeholder: "333",
      required: true,
      value: form.price,
    },
    {
      label: "QTY",
      name: "qty",
      type: "number",
      placeholder: "44",
      required: true,
      value: form.qty,
    },
    {
      label: "Sales Price",
      name: "salesPrice",
      type: "number",
      placeholder: "33",

      value: form.salesPrice,
    },
    {
      label: "Sales Starts",
      name: "salesStart",
      type: "date",

      value: form.salesStart,
    },
    {
      label: "Sales Ends",
      name: "salesEnd",
      type: "date",

      value: form.salesEnd,
    },
    {
      label: "Description",
      name: "description",
      type: "text",
      as: "textarea",
      rows: "10",
      placeholder: "Details about the product",
      required: true,
      value: form.description,
    },
  ];

  const handleOnImageChange = (e) => {
    const { name, files } = e.target;

    console.log(e, files, "lkjhgcghjk");
  };

  const handOnImageDeleteSelect = (e) => {
    const { checked, value } = e.target;

    if (checked) {
      setImageToDelete([...imageToDelete, value]);
    } else {
      const imgLs = imageToDelete.filter((img) => img !== value);
      console.log(imgLs, value);
      setImageToDelete(imgLs);
    }
  };

  const handleOnDelete = async () => {
    if (window.confirm("Are you sure you wnat to delete this product")) {
      try {
        await deleteDoc(doc(db, PRODUCTTABLE, id));

        toast.success("The product has been deleted");
        navigate("/product");
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <AdminLayout>
      <div className="page-title mt-4">Update Product</div>
      <hr />
      <div className="  mb-3">
        <Link to="/product">
          <Button variant="secondary">
            <IoIosArrowBack />
          </Button>
        </Link>
      </div>

      <Form onSubmit={handleOnSubmit}>
        <div className="product-form mt-5">
          <Form.Group className="mt-5">
            <Form.Check // prettier-ignore
              type="switch"
              id="custom-switch"
              label="Status"
              name="status"
              onChange={handleOnChanage}
              checked={form.status === "active"}
            />
          </Form.Group>
          <Form.Group className="mb-3 mt-3">
            <Form.Label>Select Category</Form.Label>

            <Form.Select
              name="parentCat"
              required={true}
              onChange={handleOnChanage}
            >
              <option value=""> -- select one --</option>

              {category.map((item) => (
                <option
                  key={item.slug}
                  value={`${item.slug}`}
                  selected={item.slug === form.parentCat}
                >
                  {item.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          {inputFields.map((item, i) => (
            <CustomInput key={i} {...item} onChange={handleOnChanage} />
          ))}

          <div className="py-3 d-flex flex-wrap gap-2">
            {selectedProduct?.imgUrlList?.map((img) => (
              <div key={img} className="img-thumbnail">
                <div>
                  <Form.Check
                    type="radio"
                    name="thumbnail"
                    checked={img === form.thumbnail}
                    onChange={handleOnChanage}
                    value={img}
                  />{" "}
                  <label> Thumbnail</label>
                </div>

                <img src={img} alt="" width="100px" />
                <div className="mt-2">
                  <Form.Check
                    name="delete"
                    label="Delete"
                    value={img}
                    onChange={handOnImageDeleteSelect}
                  />
                </div>
              </div>
            ))}
          </div>

          <Form.Group className="mt-5">
            <Form.Control
              type="file"
              name="image"
              multiple
              onChange={handleOnImageChange}
            />
          </Form.Group>

          <div className="d-grid py-3">
            <Button type="submit" variant="primary">
              Update Product
            </Button>
          </div>
        </div>
      </Form>

      <div className="py-2 d-grid">
        <Button variant="danger" onClick={handleOnDelete}>
          Delete this product
        </Button>
      </div>
    </AdminLayout>
  );
};

export default EditProduct;
