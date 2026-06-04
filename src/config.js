export const API_URL = window.location.hostname === "localhost" 
  ? "http://localhost:8181" 
  : "https://8181-" + window.location.hostname.replace("3000-", ""); // Example format for cloud lab platforms

console.log("API_URL :", API_URL);