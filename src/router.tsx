import { createBrowserRouter } from "react-router-dom";
import App from "@/App.tsx";
import Index from "@/pages";
import LoginPage from "@/pages/login.tsx";
import SignupPage from "@/pages/signup.tsx";
import MyPage from "@/pages/my";
import QuizDetailPage from "@/pages/quiz";
import QuizListPage from "@/pages/quiz-list";
import ParticipationPage from "@/pages/participation";
import PlayPage from "@/pages/play/index.tsx";
import ResultPage from "@/pages/result";

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
      { path: "/quiz-list", element: <QuizListPage /> },
      { path: "/quiz", element: <QuizDetailPage /> },
      { path: "/participation", element: <ParticipationPage /> },
      { path: "/play", element: <PlayPage /> },
      { path: "/result", element: <ResultPage /> },
    ],
  },
]);
