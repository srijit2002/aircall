import "./App.css";
import { QueryClientProvider } from "react-query";
import router from "./router/main.jsx";
import { RouterProvider } from "react-router-dom";
import queryClient from "@/lib/reactQuery";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
