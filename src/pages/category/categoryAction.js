import { toast } from "react-toastify";
import { CATEGORYTABLE } from "../../assets/constants";
import { setDoc, doc, getDocs, query, collection } from "firebase/firestore";
import { db } from "../../config/firebase-config";
import { setCat } from "./categorySlice";
import { setShowModal } from "../../system-state/systemSlice";

export const getCategoriesAction = () => async (dispatch) => {
  const q = query(collection(db, CATEGORYTABLE));
  const catSnap = await getDocs(q);

  const catList = [];

  catSnap.forEach((doc) => {
    const catDt = {
      ...doc.data(),
      slug: doc.id,
    };

    catList.push(catDt);
  });

  dispatch(setCat(catList));
};

export const addNewCategory =
  ({ slug, ...rest }) =>
  async (dispatch) => {
    try {
      const promise = setDoc(doc(db, CATEGORYTABLE, slug), rest, {
        merge: true,
      });

      toast.promise(promise, {
        pending: "Please wait...",
        success: "Category has been updated",
      });
      dispatch(getCategoriesAction());
      dispatch(setShowModal(false));
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
