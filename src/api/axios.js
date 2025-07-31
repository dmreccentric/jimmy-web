import axios from "axios";

export default axios.create({
  baseURL: "https://improved-danell-gentlebot-a7291aca.koyeb.app/api/v1",
  withCredentials: true,
});
