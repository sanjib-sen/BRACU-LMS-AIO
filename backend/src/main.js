const { start } = require("./session");
const { login } = require("./signin");
const { get_one } = require("./one");

var page = start();
page = login(page);
const link =
  "https://bux.bracu.ac.bd/courses/course-v1:buX+FRN101+2020_Summer/course/";

export default async function Courselist(){
    return await get_one(link, page);
}
