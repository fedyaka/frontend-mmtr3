//вывод всех функций в flsFunctions
import * as flsFunctions from "./modules/functions.js";
//проверка на поддержку Webp изображений и метка классов "webp" или "no-webp"
flsFunctions.isWebp();

import React from "react";
import * as ReactDOM from "react-dom/client";

import App from "./components/App.jsx";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App/>);