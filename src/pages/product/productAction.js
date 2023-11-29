import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { CATEGORYTABLE, PRODUCTTABLE } from "../../assets/constants";
import { db } from "../../config/firebase-config";
import { setProducts, setSelectedProduct } from "./productSlice";
import { getCategoriesAction } from "../category/categoryAction";
import { setShowModal } from "../../system-state/systemSlice";

export const fetchProductsAction = () => async (dispatch) => {
  try {
    const q = query(collection(db, PRODUCTTABLE));

    const productSnap = await getDocs(q);

    const products = [];

    productSnap.forEach((doc) => {
      const id = doc.id;

      products.push({ ...doc.data(), id });
    });

    dispatch(setProducts(products));
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchSelectedProductsAction = (slug) => async (dispatch) => {
  try {
    if (!slug) {
      return alert("Slug not available");
    }
    const q = doc(db, PRODUCTTABLE, slug);

    const prodRef = await getDoc(q);

    if (prodRef.exists()) {
      const prod = prodRef.data();
      // return { ...prod, id: slug };
      dispatch(setSelectedProduct({ ...prod, id: slug }));
    }

    //   dispatch data to redux
  } catch (error) {
    console.log(error.message);
  }
};

export const addNewProduct =
  ({ slug, ...rest }) =>
  async (dispatch) => {
    try {
      const pending = setDoc(doc(db, PRODUCTTABLE, slug), rest, {
        merge: true,
      });
      toast.promise(pending, {
        pending: "Please await",
        success: "product has been adde successfully",
      });
      await pending;

      dispatch(fetchProductsAction());
      //   return true;
    } catch (error) {
      toast.error(error.message);
    }
  };

export const fetchProductsByCategoryAction =
  (parentCat) => async (dispatch) => {
    try {
      //checking if the product exist
      const q = query(
        collection(db, PRODUCTTABLE),
        where("parentCat", "==", parentCat)
      );

      const productSnap = await getDocs(q);
      if (productSnap?.size > 0) {
        return toast.warning(
          `There are ${productSnap?.size}  products  assigned to this category, please re assign those product to other categories before deleting this category`
        );
      }
      //delte cat
      await deleteDoc(doc(db, CATEGORYTABLE, parentCat));
      toast.success("Category has been deleted");

      dispatch(getCategoriesAction());
      dispatch(setShowModal(false));
    } catch (error) {
      console.log(error.message);
    }
  };
