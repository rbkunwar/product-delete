import { useEffect } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProductsAction } from "../../pages/product/productAction";

export const ProdctTable = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.prod);

  useEffect(() => {
    dispatch(fetchProductsAction());
  }, []);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Thumbnail</th>
          <th>Status</th>
          <th>Name</th>
          <th>Price</th>
          <th>QTY</th>
          <th>Sale Price</th>
          <th>Sale Start Date</th>
          <th>Sale End Date</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        {products.map((item, i) => (
          <tr>
            <td>{i + 1}</td>
            <td>
              <img src={item.thumbnail} alt="" width={"100px"} />
            </td>
            <td>{item.status}</td>
            <td>{item.name}</td>
            <td>{item.price}</td>
            <td>{item.qty}</td>
            <td>{item.salesPrice}</td>
            <td>{item.salesStart}</td>
            <td>{item.salesEnd}</td>
            <td>
              <Link to={`/product/${item.id}`}>
                <Button variant="warning">Edit</Button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
