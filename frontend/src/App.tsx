import { ToastContainer } from "react-toastify";
import AppRouter from "./Router";
import GlobalStyles from "./shared/GlobalStyles";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <AppRouter />
      <GlobalStyles />
      <ToastContainer style={{ width: "350px" }} />
    </>
  );
}

export default App;
