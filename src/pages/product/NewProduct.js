import React, { useEffect, useState } from "react";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { ProdctTable } from "../../components/product/ProductTable";
import { Form, Button, ProgressBar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { CustomInput } from "../../components/customInpute/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesAction } from "../category/categoryAction";
import { addNewProduct } from "./productAction";
import slugify from "slugify";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../config/firebase-config";

const initialState = { status: "inactive", price: 0, name: "" };
const NewProduct = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialState);
  const [images, setImages] = useState();
  const [progress, setProgress] = useState(0);

  const { category } = useSelector((state) => state.cat);

  useEffect(() => {
    !category.length && dispatch(getCategoriesAction());
  }, [dispatch]);

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

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const slug = slugify(form.name, {
      trim: true,
      lower: true,
    });
    /// first we need to upload the image to the firebase get the linke, add that linke in the product table.

    // uplodad photo and get url
    //product tbale update with image
    console.log(images);

    //METHOD #1 single image upload to storage and get the sing url linke and add with the product
    // if (images) {
    //   //crate the file upload path
    //   const storegeRef = ref(
    //     storage,
    //     `/product/images/${Date.now()}-${images.name}`
    //   );

    //   //upload image to firebase
    //   const uploadImg = uploadBytesResumable(storegeRef, images);

    //   uploadImg.on(
    //     "state_changed",
    //     (snapshot) => {
    //       console.log(snapshot);
    //       const percentage =
    //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

    //       setProgress(percentage);
    //     },
    //     (error) => {
    //       console.log(error);
    //     },
    //     () => {
    //       getDownloadURL(uploadImg.snapshot.ref).then((url) => {
    //         console.log(url);
    //         dispatch(addNewProduct({ ...form, slug, thumbnail: url }));
    //       });
    //       console.log("uploaded");
    //     }
    //   );
    // }

    //METHOD #2 uploading multipl images and adding into the product

    // loop through the images and exc uplode code with in Promise and return the url in promis array

    if (images.length) {
      const img = images.map((image) => {
        return new Promise((resolve, reject) => {
          // format the image name and path to upload
          const storegeRef = ref(
            storage,
            `/product/images/${Date.now()}-${image.name}`
          );

          //upload the image
          const uploadImg = uploadBytesResumable(storegeRef, image);

          uploadImg.on(
            "state_changed",
            (snapshot) => {
              const percentage =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

              setProgress(percentage);
            },
            (error) => {
              console.log(error);
            },
            async () => {
              await getDownloadURL(uploadImg.snapshot.ref).then((url) => {
                resolve(url);
              });
            }
          );
        });
      });

      const imgUrlList = await Promise.all(img);
      dispatch(
        addNewProduct({ ...form, slug, imgUrlList, thumbnail: imgUrlList[0] })
      );
    }

    // resolve the array to get the actual ulrs
    // exc add product function
  };

  const handleOnImageChange = (e) => {
    const { files } = e.target;

    console.log(files);

    console.log([...files]);
    setImages([...files]);
  };

  const inputFields = [
    {
      label: "Product Name",
      name: "name",
      type: "text",
      placeholder: "Laptop",
      required: true,
      value: form.value,
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

  return (
    <AdminLayout>
      <div className="page-title mt-4">Add New Product</div>
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
                <option key={item.slug} value={`${item.slug}`}>
                  {item.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          {inputFields.map((item, i) => (
            <CustomInput key={i} {...item} onChange={handleOnChanage} />
          ))}

          <Form.Group className="mt-5">
            <Form.Control
              type="file"
              name="image"
              multiple
              onChange={handleOnImageChange}
            />
          </Form.Group>
          <ProgressBar striped variant="success" now={progress} />

          <div className="d-grid py-3">
            <Button type="submit" variant="primary">
              Sumit New Product
            </Button>
          </div>
        </div>
      </Form>
    </AdminLayout>
  );
};

export default NewProduct;
