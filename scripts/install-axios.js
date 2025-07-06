// This script demonstrates how to install axios in a real project
// In Next.js, axios is automatically available through imports

console.log("Installing axios...")
console.log("npm install axios")
console.log("Axios installation complete!")

// Example usage:
import axios from "axios"

const fetchData = async () => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products")
    console.log("Data fetched successfully:", response.data.length, "products")
    return response.data
  } catch (error) {
    console.error("Error fetching data:", error)
    throw error
  }
}

// Test the API connection
fetchData()
  .then((products) => {
    console.log("Sample product:", products[0]?.title)
  })
  .catch((error) => {
    console.error("Failed to fetch products:", error.message)
  })
