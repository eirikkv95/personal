import sanityClient from "@sanity/client";
import { variables } from "../varialbes";

const client = sanityClient({
  projectId:`${variables.projectId}`,
  dataset:"production",
  apiVersion:"2022-04-22",
  useCdn:false
})


export default client