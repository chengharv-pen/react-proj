import { useQuery } from "@tanstack/react-query";
import fetchBreedList from "../queries/fetchBreedList";

export default function useBreedList(animal) {
  // First parameter: query key
  // Second parameter: function that fetches the data (in this case, breed), based on animal
  const results = useQuery(["breeds", animal], fetchBreedList);

  // Here, optional chaining is used to safely access results.data.breeds
  // If results.data or results.data.breeds is undefined, it defaults to an empty array []
  // results.status: This is the status of the query (e.g., 'loading', 'error', 'success').
  return [results?.data?.breeds ?? [], results.status];
}

// const localCache = {};

// What used to be in the export default
//
//   const [breedList, setBreedList] = useState([]);
//   const [status, setStatus] = useState("unloaded");

//   useEffect(() => {
//     if (!animal) {
//       setBreedList([]);
//     } else if (localCache[animal]) {
//       setBreedList(localCache[animal]);
//     } else {
//       requestBreedList();
//     }

//     async function requestBreedList() {
//       setBreedList([]);
//       setStatus("loading");

//       const res = await fetch(
//         `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
//       );

//       const json = await res.json();

//       localCache[animal] = json.breeds || [];
//       setBreedList(localCache[animal]);
//       setStatus("loaded");
//     }
//   }, [animal]);

//   return [breedList, status];
