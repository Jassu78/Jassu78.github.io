import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Layout } from "./components/Layout";
import { ScrollToTop } from "./components/ScrollToTop";
import { HomePage } from "./pages/HomePage";

const ExperiencePage = lazy(() =>
  import("./pages/ExperiencePage").then((m) => ({ default: m.ExperiencePage })),
);
const ProjectsPage = lazy(() =>
  import("./pages/ProjectsPage").then((m) => ({ default: m.ProjectsPage })),
);
const ProjectDetailPage = lazy(() =>
  import("./pages/ProjectDetailPage").then((m) => ({ default: m.ProjectDetailPage })),
);
const AchievementsPage = lazy(() =>
  import("./pages/AchievementsPage").then((m) => ({ default: m.AchievementsPage })),
);
const AboutPage = lazy(() =>
  import("./pages/AboutPage").then((m) => ({ default: m.AboutPage })),
);
const CliPage = lazy(() =>
  import("./pages/CliPage").then((m) => ({ default: m.CliPage })),
);

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Suspense fallback={null}>
          <Routes location={location} key={location.pathname}>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="work" element={<ExperiencePage />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="projects/:slug" element={<ProjectDetailPage />} />
              <Route path="achievements" element={<AchievementsPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="cli" element={<CliPage />} />
              <Route path="experience" element={<Navigate to="/work" replace />} />
              <Route path="resume" element={<Navigate to="/work" replace />} />
              <Route path="lab" element={<Navigate to="/projects" replace />} />
              <Route path="systems" element={<Navigate to="/" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </Suspense>
      </AnimatePresence>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
