import React from "react";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { ProdctTable } from "../../components/product/ProductTable";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Product = () => {
  return (
    <AdminLayout>
      <div className="page-title mt-4">Product</div>
      <hr />

      <div className="text-end mb-3">
        <Link to="/product/new">
          <Button variant="primary">＋ Add new product</Button>
        </Link>
      </div>
      <ProdctTable />
    </AdminLayout>
  );
};

export default Product;
