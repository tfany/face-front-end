import {v4 as uuidv4} from "uuid";

export function getUserId(){
  return uuidv4().replace(/-/g,'')
}
