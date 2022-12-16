import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from "../pages/Main.jsx";
import Header from "./Header.jsx";
import Show from "../pages/Show.jsx";
import AddWord from "../pages/AddWord.jsx";
import Error from "../pages/Error.jsx";
import ErrorBoundary from "./ErrorBoundary.jsx";



class App extends React.Component {

    render() {
        return (
            <>
                <Router>
                    <Header></Header>

                    <main>
                        <div className="content-box">
                        <ErrorBoundary>
                            <Routes>
                                <Route path="/" element={<Main />} />
                                <Route path="/show/:wordId" element={<Show />} />
                                <Route path="/add/:dictionaryId" element={<AddWord />} />
                                <Route path="*" element={<Error/>} />
                            </Routes>
                        </ErrorBoundary>
                        </div>
                    </main>
                    <footer className="footer">

                    </footer>
                </Router>
            </>
        )
    }


}

export default App;