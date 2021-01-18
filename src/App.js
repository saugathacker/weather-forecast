import "./index.css";
import React from "react";
import CurrentWeather from "./views/CurrentWeather";
import { Route, Switch } from "react-router";
import City from "./views/City";
import { NavLink } from "react-router-dom";

function App() {
  return (
    <div class='bg-gradient-to-br from-yellow-500 via-pink-400 to-purple-500 h-screen w-screen text-white font-mono max-h-screen'>
      <nav class='object-top w-screen flex flex-row bg-pink-500 h-12 items-center justify-center lg:px-64'>
        <div class='w-1/2 flex flex-row justify-center items-center'>
          <NavLink to='/' class='hover:text-yellow-500'>
            Current Weather
          </NavLink>
        </div>
        <div class='w-1/2 flex flex-row justify-center items-center'>
          <NavLink to='/city' class='hover:text-yellow-500'>
            Select a City
          </NavLink>
        </div>
      </nav>
      <div class='flex flex-col items-center justify-start mx-auto p-10 h-auto'>
        <Switch>
          <Route path='/' exact component={CurrentWeather} />
          <Route path='/city' exact component={City} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
