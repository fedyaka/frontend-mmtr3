import React from "react";
// import { Route, Router, Routes } from "react-router-dom";
import Main from "../pages/Main.jsx";
// import Header from "./Header.jsx";
// import Show from "../pages/Show.jsx";
// import Add from "../pages/Add.jsx";
// import Patch from "../pages/Patch.jsx";
// import Error from "../pages/Error.jsx";
import ErrorBoundary from "./ErrorBoundary.jsx";



class App extends React.Component{

    render() {
        return (
            <>
                <ErrorBoundary>
                    <Main></Main>
                </ErrorBoundary>
                {/* <Router>
                    <Routes>
                        <Route exact path="/" element={<Main/>}/>
                        <Route path="/show:id" element={<Show/>}/>
                        <Route path="/add" element={<Add/>}/>
                        <Route path="/patch:id" element={<Patch/>}/>
                        <Route element={<Error/>}/>
                    </Routes>
                </Router> */}
            </>
        )    
    }

    
}

export default App;