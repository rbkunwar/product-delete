import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { EditCatForm } from "./EditCatForm";
import { useState } from "react";
import { CustomModal } from "../modal/CustomModal";
import { setShowModal } from "../../system-state/systemSlice";

export const CatTable = () => {
  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.cat);
  const [selectedCat, setSelectedCat] = useState({});

  const handleOnEdit = (item) => {
    setSelectedCat(item);
    dispatch(setShowModal(true));
  };

  return (
    <>
      {selectedCat.slug && (
        <CustomModal heading="Update Category">
          <EditCatForm editCat={selectedCat} />
        </CustomModal>
      )}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Category Name</th>
            <th>Status</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {category.map((item, i) => (
            <tr key={item.slug}>
              <td>{i + 1}</td>
              <td>{item.status}</td>
              <td>{item.name}</td>
              <td>
                <Button variant="warning" onClick={() => handleOnEdit(item)}>
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
