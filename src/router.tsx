import { createBrowserRouter } from "react-router-dom";
import App from "@/App.tsx";
import Index from "@/pages";
import LoginPage from "@/pages/login.tsx";
import SignupPage from "@/pages/signup.tsx";
import MyPage from "@/pages/my";
import PlayPage from "@/pages/play.tsx";
import QuizDetailPage from "@/pages/quiz";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Index />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      { path: "/my", element: <MyPage /> },
      { path: "/play", element: <PlayPage /> },
      { path: "/quiz", element: <QuizDetailPage /> },
    ],
  },
]);
