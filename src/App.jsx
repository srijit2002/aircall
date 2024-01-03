import "./App.css";
import { QueryClientProvider } from "react-query";
import router from "./router/main.jsx";
import { RouterProvider } from "react-router-dom";
import queryClient from "@/lib/reactQuery";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
