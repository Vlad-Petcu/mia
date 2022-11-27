import { Route, Routes } from "react-router-dom";
import "./App.css";
import AACEDDefinition from "./pages/aaced-definition";
import AllDefinitions from "./pages/all-definitions";
import EGSIRDDefinition from "./pages/egsird-definition";
import Home from "./pages/home";
import IDFGCDDefinition from "./pages/idfgcd-definition";
import IDRSDefinition from "./pages/idrs-definition";
import LAPDefinition from "./pages/lap-definition";
import LogIn from "./pages/log-in";
import MyMedicalRecord from "./pages/my-medical-record";
import MyPatients from "./pages/my-patients";
import NCEPATPIIIDefinition from "./pages/ncep-atp-III-definition";
import SDMSDefinition from "./pages/sdms-definition";
import SignIn from "./pages/sign-in";
import WHODefinition from "./pages/who-definition";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="all-definitions" element={<AllDefinitions />} />
      <Route path="aaced-definition" element={<AACEDDefinition />} />
      <Route path="egsird-definition" element={<EGSIRDDefinition />} />
      <Route path="idfgcd-definition" element={<IDFGCDDefinition />} />
      <Route path="idrs-definition" element={<IDRSDefinition />} />
      <Route path="lap-definition" element={<LAPDefinition />} />
      <Route
        path="ncep-atp-III-definition"
        element={<NCEPATPIIIDefinition />}
      />
      <Route path="sdms-definition" element={<SDMSDefinition />} />
      <Route path="who-definition" element={<WHODefinition />} />
      <Route path="my-medical-record" element={<MyMedicalRecord />} />
      <Route path="who-patients" element={<MyPatients />} />
      <Route path="log-in" element={<LogIn />} />
      <Route path="sign-in" element={<SignIn />} />
    </Routes>
  );
};

export default App;
