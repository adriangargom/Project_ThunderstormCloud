import ReactDOM from "react-dom/client";
import ApplicationRouter from "./router/applicationRouter";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ToastContainer } from "react-toastify";
import "./index.css";
import 'react-toastify/dist/ReactToastify.css';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>

    <ApplicationRouter />
    <ToastContainer />

  </Provider>
);