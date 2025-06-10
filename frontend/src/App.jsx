import Login from '../src/components/auth/Login';
import Signup from '../src/components/auth/Signup';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import Jobs from './components/Jobs';
import Browse from './components/Browse';
import Profile from './components/Profile';
import JobDescription from './components/JobDescription';
import Companies from './components/admin/Companies';
import CompanyCreate from './components/admin/CompanyCreate';
import CompanySetup from './components/admin/CompanySetup';
import AdminJobs from './components/admin/AdminJobs';
import PostJob from './components/admin/PostJob';
import Applicants from './components/admin/Applicants';
import ProtectedRoute from './components/admin/ProtectedRoute';
import ApplicantsTable from './components/admin/ApplicantsTable';

function App() {
  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/Signup',
      element: <Signup />,
    },
    {
      path: '/Jobs',
      element: <Jobs />,
    },
    {
      path: '/Browse',
      element: <Browse />,
    },
    {
      path: '/profile',
      element: <Profile />,
    },
    {
      path: '/description/:id',
      element: <JobDescription />,
    },
    // admin start here
    {
      path: '/admin/companies',
      element: <Companies />,
    },
    {
      path: '/admin/companies/create',
      element: <CompanyCreate />,
    },
    {
      path: '/admin/companies/:id',
      element: <CompanySetup />,
    },
    {
      path: '/admin/jobs',
      element: <AdminJobs />,
    },
    {
      path: '/admin/job/create',
      element: <PostJob />,
    },
    {
      path: '/admin/job/:id/applicants',
      element: <Applicants />,
    },
  ]);
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
