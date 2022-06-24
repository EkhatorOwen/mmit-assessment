import FormComponent from "./Components/Form";
import Table from "./Components/Table";
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
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

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
        />
        <Table />
      </header>
    </div>
  );
}

export default App;
