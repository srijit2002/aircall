import { createBrowserRouter } from "react-router-dom";
import { CallLog} from "@/features/CallLog";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CallLog />,
  }
]);

export default router;
