import React, { useState } from "react";

const schemaOption = [
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Gender", value: "gender" },
  { label: "Age", value: "age" },
  { label: "Account Name", value: "account_name" },
  { label: "City", value: "city" },
  { label: "State", value: "state" },
];

const PopUp = (props) => {
  const [segmentName, setSegmentName] = useState("");
  const [availableOption, setAvailableOption] = useState(schemaOption);
  const [currentSelecction, setCurrentSelection] = useState("");
  const [selectedSchemas, setSelectedSchemas] = useState([]);

  const handleAddSchema = () => {
    if (currentSelecction) {
      const selectedOption = availableOption.find(
        (option) => option.value === currentSelecction
      );
      setSelectedSchemas([...selectedSchemas, selectedOption]);
      setAvailableOption(
        availableOption.filter((option) => option.value !== currentSelecction)
      );
      setCurrentSelection("");
    }
  };

  const handleSubmit = async () => {
    const data = {
      segment_name: segmentName,
      schema: selectedSchemas.map((schema) => ({
        [schema.value]: schema.label,
      })),
    };

    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Success:", await response.text());
        alert("Segment saved successfully!");
      } else {
        console.error("Error: ", await response.text());
        alert("Failed to save the segment.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save the segment.");
    }
  };

  return (
    <>
      <div className="popup">
        <div className="popup-inner">
          <div className="pop-header">
            <h2>Saving Segment</h2>
          </div>
          <div className="pop-content">
            <h5>Enter the name of the segment</h5>
            <input
              className="pop-input"
              type="text"
              placeholder="Name of the Segment"
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
            />
            <div>
              <h5>
                To Save your segment, you need to add the schemas to build the
                query
              </h5>

              <div>
                {selectedSchemas.map((schema) => (
                  <select key={schema.label} className="pop-selected-schemas">
                    <option value={schema.value}>{schema.label}</option>
                  </select>
                ))}
              </div>

              <select
                className="pop-select"
                value={currentSelecction}
                onChange={(e) => setCurrentSelection(e.target.value)}
              >
                <option value="">Add schema to segment</option>
                {availableOption.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <br />
            <a style={{ cursor: "pointer" }} onClick={handleAddSchema}>
              +Add new schema
            </a>
          </div>
          <div className="pop-footer">
            <button className="btn1" onClick={handleSubmit}>
              Save the Segement
            </button>
            <button className="btn2" onClick={() => props.setShowPopup(false)}>
              close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopUp;
