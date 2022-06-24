import FormComponent from "./Components/Form";
import FormTable from "./Components/Table";
import { fetchData } from "./utils";

import { useState, useEffect } from "react";

import "./App.css";
import "antd/dist/antd.css";
function App() {
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [selectedVehicleType, setSelectedVehicleType] = useState("");
  const [vehicleMakes, setVehicleMakes] = useState([]);
  const [selectedVehicleMake, setSelectedVehicleMake] = useState("");
  const [useYear, setUseYear] = useState(false);
  const [modelYear, setModelYear] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filterdResults, setFilteredResults] = useState([]);

  useEffect(() => {
    const fetchVehicle = async () => {
      const response = await fetchData(
        "https://vpic.nhtsa.dot.gov/api/vehicles/getvehiclevariablevalueslist/vehicle%20type?format=json"
      );
      let newArray = [];
      response.Results.map((elem) => {
        newArray.push(elem.Name);
      });
      setVehicleTypes(newArray);
    };
    fetchVehicle("");
  }, []);

  useEffect(() => {
    const fetchVehicleMake = async () => {
      const response = await fetchData(
        "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
      );
      let filteredVehicleMake = response.Results.filter((elem) => {
        return elem.VehicleTypeName === selectedVehicleType;
      });
      setVehicleMakes(filteredVehicleMake);
    };
    fetchVehicleMake();
  }, [selectedVehicleType]);

  useEffect(() => {}, []);

  const handleSearch = async () => {
    let arr = [];
    selectedVehicleMake.forEach(async (element) => {
      let result = await fetchData(
        `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${element}/modelyear/${modelYear}/vehicleType/${selectedVehicleType}?format=json`
      );
      arr.push(result.Results);
      console.log(result.Results);
    });
    console.log(arr);
  };

  //vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/474/modelyear/2015/vehicleType/truck?format=json
  return (
    <div className="App">
      <header className="App-header">
        <h4>Car Search</h4>
        <FormComponent
          vehicleTypes={vehicleTypes}
          setSelectedVehicleType={setSelectedVehicleType}
          vehicleMakes={vehicleMakes}
          setSelectedVehicleMake={setSelectedVehicleMake}
          setUseYear={setUseYear}
          useYear={useYear}
          setModelYear={setModelYear}
          submitButtonDisabled={submitButtonDisabled}
          setFilteredResults={setFilteredResults}
          handleSearch={handleSearch}
        />
        <FormTable />
      </header>
    </div>
  );
}

export default App;
