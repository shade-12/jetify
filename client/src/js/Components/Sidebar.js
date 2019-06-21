import React from 'react';

function SideBar(props){
  return (
    <div className="sidebar">
      <h2>Get your playlist now!</h2>
      {/*<img src="%PUBLIC_URL%/Spotify_Logo_White.png"/>*/}
      <button type="button" className="btn btn-dark">Login</button>
    </div>
  );
}

export default SideBar;