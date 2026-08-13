import { useEffect } from "react";
import getCurrentUser from "./features/getCurrentUser";
import { useDispatch } from "react-redux";
import { setUserdata } from "./redux/userSlice";


import Home from "./pages/Home";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const getUser = async () => {
      const data = await getCurrentUser();
      dispatch(setUserdata(data ? { ...data, _id: data.userId ?? data._id } : null));
    };
    getUser();
  }, []);

  return (
    <>
      <Home />
    </>
  );
}

export default App;
