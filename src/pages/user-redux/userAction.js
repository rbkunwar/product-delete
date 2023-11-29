import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { auth, db } from "../../config/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { setUser } from "./userSlice";
import { USERSTABLE } from "../../assets/constants";

export const getUserAction = (uid) => async (dispatch) => {
  if (!uid) {
    return alert("user id missing");
  }

  //get suer from database and send to the redux

  const userRef = doc(db, USERSTABLE, uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const user = userSnap.data();

    if (user?.role !== "admin") return alert("You don not have permission");
  }

  //   dispatch data to redux
  const user = userSnap.data();
  dispatch(setUser({ ...user, uid }));
};

export const loginAdminAction =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const userPormise = signInWithEmailAndPassword(auth, email, password);

      toast.promise(userPormise, {
        pending: "Please wait...",
      });

      const { user } = await userPormise;

      user?.uid && dispatch(getUserAction(user.uid));
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };
