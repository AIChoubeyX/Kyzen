import { useEffect } from "react";
import getCurrentUser from "./features/getCurrentUser";

import Home from "./pages/Home";

function App() {
  useEffect(() => {
    const getUser = async () => {
      await getCurrentUser();
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
