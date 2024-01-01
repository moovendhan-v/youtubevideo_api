// const fetchConfig = async () => {
//     try {
//       const response = await fetch('../../../../project/config.json');
//       const config = await response.json();
  
//       // Assuming your API response contains a property named 'baseUri'
//       const baseUri = config.baseUrl;
  
//       // Set the base URI to global variables or wherever needed
//       window.BASE_URI = baseUri;
//       console.log("Base URI set:", window.BASE_URI);
//     } catch (error) {
//       console.error("Error fetching configuration:", error);
//     }
//   };

// fetchConfig();

const BASE_URI = "http://localhost/htdocs/";