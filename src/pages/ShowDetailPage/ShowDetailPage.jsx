// import { useState, useEffect } from "react";
// import { useParams } from "react-router";

// export default function ShowDatailPage() {
//     const [Movies, setMovies] = useState([]);
//     const id = useParams();
//     console.log(id);

//     const fetcData = async () => {
//       try {
//         const data = await fetch(
//           "https://www.omdbapi.com/?s=india&apikey=a8da1a71"
//         );
  
//         const resultData = await data.json();
//         console.log(resultData, "Final");
//         setMovies(resultData);
//       } catch (error) {
//         console.log(error);
//       }
//     };
  
//     // const found = array1.find((data) => data.imdbID == id);
  
//     useEffect(() => {
//       fetcData();
//     }, []);
   
   
   
//     return (
//       <>
//         <h1>user detail </h1>
//       </>
//     );
//   }
  