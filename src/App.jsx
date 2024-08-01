import { useState } from "react";
import "./App.css";
import PopUp from "./PopUp";
import React from "react";

function App() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <div className="App">
        <button onClick={() => setShowPopup(true)}>Save Segment</button>

        {showPopup && <PopUp setShowPopup={setShowPopup} />}
      </div>
    </>
  );
}

export default App;
