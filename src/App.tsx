import React, { useState } from "react";
import Mission from "./pages/Mission";
import MissionOverview from "./pages/MissionOverview";
import Playground from "./pages/Playground";
import Error from "./pages/Error";
import AssessmentContainer from "./assessment/mockAssessmentContainer";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { SideBarContextProvider } from "./NavBar/SideBarContext";
import { StoreProvider } from "./reducers/store";

function App() {
  return (
    <CssBaseline>
      <SideBarContextProvider>
        <StoreProvider>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Playground} />
              {/* <Route exact path="/mission" component={MissionOverview} />
              <Route path="/mission/:missionID/:page" component={Mission} />
              <Route path="/playground" component={Playground} />
              <Route path="/assessment" component={AssessmentContainer} /> */}
              <Route path="/*" component={Error} />
            </Switch>
          </BrowserRouter>
        </StoreProvider>
      </SideBarContextProvider>
    </CssBaseline>
  );
}

export default App;