import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/common/Navbar';
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';
import VerifyEmail from './pages/VerifyEmail';
import OpenRoute from './components/core/Auth/OpenRoute';
import About from './pages/About';
import MyProfile from './components/core/Dashboard/MyProfile';
import PrivateRoute from './components/core/Auth/PrivateRoute';
import Dashboard from './pages/Dashboard';
import ContactUs from './pages/ContactUs';
import EnrolledCourses from './components/core/Dashboard/EnrolledCourses';
import Cart from './components/core/Dashboard/Cart';
import { useSelector } from 'react-redux';
import { ACCOUNT_TYPE } from './utils/constants';
import AddCourse from './components/core/Dashboard/AddCourse';
import Settings from './components/core/Dashboard/Settings'
import MyCourse from './components/core/Dashboard/MyCourse';
import EditCourse from './components/core/Dashboard/EditCourse';
import Catalog from './pages/Catalog';
import CourseDetails from './pages/CourseDetails';
import Error from './pages/Error';
import ViewCourse from './pages/ViewCourse';
import VideoDetails from './components/core/ViewCourse/VideoDetails';
import Instructor from './components/core/Dashboard/InstructorDashboard/Instructor';

function App() {

  const {user} = useSelector( (state) => state.profile);

  return (
    <div className='w-screen min-h-screen bg-richblack-900 flex flex-col font-inter relative z-0'>
      
      <Navbar/>
      
      <Routes>
        <Route path='/' element= {<Home/>}/>
        <Route path='catalog/:catalogName' element= {<Catalog/>}/>
        <Route path='courses/:courseId' element= {<CourseDetails/>}/>

        <Route 
          path='login'
          element = {
            <OpenRoute>
              <Login/>
            </OpenRoute>
          }
        />
         <Route 
          path='signup'
          element = {
            <OpenRoute>
              <Signup/>
            </OpenRoute>
          }
        />
        <Route 
          path='forgot-password'      
          element = {
            <OpenRoute>
              <ForgotPassword/>
            </OpenRoute>
          }
        />
        <Route 
          path='update-password/:id'      
          element = {
            <OpenRoute>
              <UpdatePassword/>
            </OpenRoute>            
          }
        />
        <Route 
          path='verify-email'      
          element = {
            <OpenRoute>
              <VerifyEmail/>
            </OpenRoute>              
          }
        />
        <Route 
          path='about'      
          element = {
              <About/>              
          }
        />
        <Route 
          path='contact'      
          element = {<ContactUs/>}
        />

        <Route
              element={ 
                <PrivateRoute>
                  <Dashboard/>
                </PrivateRoute>
              } 
        >
          <Route path='dashboard/my-profile' element={<MyProfile/>}/>
          <Route path='dashboard/settings' element={<Settings/>}/>
          

          
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path='dashboard/enrolled-courses' element={<EnrolledCourses/>}/>
                <Route path='dashboard/cart' element={<Cart/>}/>
              </>
            )
          }

          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path='dashboard/add-course' element={<AddCourse/>}/>
                <Route path='dashboard/my-courses' element={<MyCourse/>}/>
                <Route path='dashboard/edit-course/:courseId' element={<EditCourse/>}/>
                <Route path='dashboard/instructor' element={<Instructor/>}/>
              </>
            )
          }


        </Route>

        <Route element={
          <PrivateRoute>
            <ViewCourse/>
          </PrivateRoute>
        }>

          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && 
            <>
              <Route
                path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails/>}
              />
            </>
          }

        </Route>

        <Route path='*' element={<Error/>}/>



      </Routes>
    </div>
  );
}

export default App;
