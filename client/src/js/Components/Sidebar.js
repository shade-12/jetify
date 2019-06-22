import React from 'react';


function SideBar(props){
  return (
    <div className="sidebar">
      <h2>Get your playlist now!</h2>
      {/* // <img src={"./src/styles/Spotify_Icon_CMYK_Black.png"}/> */}
      <button type="button" className="btn btn-dark">Login</button>
    </div>
  );
}

export default SideBar;