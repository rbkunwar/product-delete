import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../config/firebase-config";
import { doc, setDoc } from "firebase/firestore";
import { USERSTABLE } from "../../assets/constants";

export const registerAdminAction = async ({ password, ...rest }) => {
  try {
    // create auth user
    const promiseUser = createUserWithEmailAndPassword(
      auth,
      rest.email,
      password
    );

    toast.promise(promiseUser, {
      pending: "Please wait ...",
      success: "User has been created successfull, Please login now",
    });

    const { user } = await promiseUser;

    if (user?.uid) {
      // create user data and store in the datatabse
      setNewAdminUserAction({ uid: user.uid, ...rest });
      return Promise.resolve(true);
    }
  } catch (error) {
    toast.error(error.message);
  }
};

const setNewAdminUserAction = async ({ uid, confirmPassword, ...rest }) => {
  try {
    await setDoc(doc(db, USERSTABLE, uid), rest);
  } catch (error) {
    toast.error(error.message);
  }
};
