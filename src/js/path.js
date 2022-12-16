const protocol = "http://";
const hostName = "localhost:";
const port = "8080";
const originPath = protocol + hostName + port;

const path = {
    originPath: originPath,
    dictionary: originPath + "/dictionary",
    word: originPath + "/dictionary" + "/word",
    translation: originPath + "/dictionary" + "/word" + "/translation",
    search: originPath + "/dictionary" + "/search"
};

export default path;