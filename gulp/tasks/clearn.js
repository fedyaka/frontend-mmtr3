import {deleteAsync} from "del"
export const clearn = () =>{
    return deleteAsync(app.path.clean)
}