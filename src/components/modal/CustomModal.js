import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setShowModal } from "../../system-state/systemSlice";

export const CustomModal = ({ heading, children }) => {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(true);
  const { showModal } = useSelector((state) => state.system);

  return (
    <>
      <Modal
        show={showModal}
        onHide={() => dispatch(setShowModal(false))}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {heading}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};
