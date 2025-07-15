import React, { useEffect } from "react";
import Home from "./components/Home";
import { Route, Routes, useNavigate } from "react-router-dom";
import Trend from "./components/new_feed/Trend";
import Populars from "./components/new_feed/Populars";
import Movie from "./components/new_feed/Movie";
import People from "./components/new_feed/People";
import Watch from "./components/new_feed/Watch";
import MovieInfo from "./components/new_feed/MovieInfo";
import { Provider } from "react-redux";
import appStore from "./components/Stores/appStore";
import Cart from "./components/new_feed/Cart";
import MovieGpt from "./components/new_feed/MovieGpt";
import Auth from "./components/new_feed/Auth";
import { useSelector, useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { addAuth, removeAuth } from "./components/Stores/authSlice";
import { auth } from "./components/utils/firebase";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if(user) {
        const {uid, email, displayName} = user;
        dispatch(addAuth({uid: uid, email: email, displayName: displayName}));
        navigate('/home');

      }
      else{
        dispatch(removeAuth());
        navigate('/')
      }
    });
  }, [])

  return (
    <div className="w-full h-screen">
      <Provider store={appStore}>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/trending" element={<Trend />} />
          <Route path="/populars" element={<Populars />} />
          <Route path="/movies" element={<Movie />} />
          <Route path="/people" element={<People />} />
          <Route path="/watch/:id" element={<Watch />} />
          <Route path="/movie-info/:id" element={<MovieInfo />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/movie-gpt" element={<MovieGpt />} />
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
