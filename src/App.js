import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
import Map from './components/Map';
import AddGarden from './components/AddGarden';
import ForumList from './components/ForumList';
import ForumDetail from './components/ForumDetail';
import PrivateRoute from './components/PrivateRoute';
import GuideList from './components/GuideList';
import InnovationList from './components/InnovationList';
import EventList from './components/EventList';
import AddForum from './components/AddForum';
import AddGuide from './components/AddGuide';
import AddInnovation from './components/AddInnovation';
import AddEvent from './components/AddEvent';
import AddResource from './components/AddResource';
import ResourceList from './components/ResourceList';
import Home from './components/Home';
import Test from './components/Test';
import ResourceDetail from './components/ResourceDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<SignIn />} />
        <Route path="/map" 
          element={
          <PrivateRoute>
            <Map />
          </PrivateRoute>
        } />
        <Route 
          path="/guides" 
          element={
            <PrivateRoute>
              <GuideList />
            </PrivateRoute>
          } 
        />
        <Route path="/add-garden" 
          element={
          <PrivateRoute>
            <AddGarden />
          </PrivateRoute>
          
          } />
        <Route path="/innovations" 
          element={
          <PrivateRoute>
            <InnovationList />
          </PrivateRoute>
          
          } />
        <Route path="/events" 
          element={
          <PrivateRoute>
            <EventList />
          </PrivateRoute>
          
          } />
        <Route path="/forums" 
          element={
          <PrivateRoute>
            <ForumList />
          </PrivateRoute>
          
          } />
        <Route path="/forum/:id" 
          element={
          <PrivateRoute>
            <ForumDetail />
          </PrivateRoute>
          
          } />
        <Route path="/resource/:id" 
          element={
          <PrivateRoute>
            <ResourceDetail />
          </PrivateRoute>
          
          } />
        <Route path="/add-forum" 
          element={
          <PrivateRoute>
            <AddForum />
          </PrivateRoute>
          
          } />
        <Route path="/add-guide" 
          element={
          <PrivateRoute>
            <AddGuide />
          </PrivateRoute>
          
          } />
        <Route path="/add-innovation" 
          element={
          <PrivateRoute>
            <AddInnovation />
          </PrivateRoute>
          
          } />
        <Route path="/add-event" 
          element={
          <PrivateRoute>
            <AddEvent />
          </PrivateRoute>
          
          } />
        <Route path="/add-resource" 
          element={
          <PrivateRoute>
            <AddResource />
          </PrivateRoute>
          
          } />
        <Route path="/resource" 
          element={
          <PrivateRoute>
            <ResourceList />
          </PrivateRoute>
          
          } />
        <Route path="/home" 
          element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
          
          } />
        <Route path="/test" 
          element={
          <PrivateRoute>
            <Test />
          </PrivateRoute>
          
          } />
      </Routes>
    </Router>
  );
}

export default App;
