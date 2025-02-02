import { useState, useEffect } from 'react'
import './app.css'
import axios from 'axios';


function App() {
const BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1/';
const [departments, setDepartments] = useState([]);
const apiService = axios.create({
  baseURL: BASE_URL
});

const getDepartments = async () => {
  try {
    const result = await apiService.get('/departments');
    setDepartments(result.data.departments);
  } catch (error) {
    console.error('Error fetching data:', error)
  }
  };


useEffect(() => {
  getDepartments();
  
}, []);
console.log(departments)

  return (
    <>


  
     <div className='main-container'>
 
 
<h1>The Metropolitian</h1>
<h1>Mesuem of Art</h1>
<div className='search-bar'>
{departments.length > 0 ? (
        <div>
         
          <ul>
          {departments.map((department) => (
            <li key={department.departmentId}>{department.displayName}</li> 
          ))}
        </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
<input
        type="text"
        placeholder="Search..."
        
      />

    </div>
  
     </div>
    
    </>
  )
}

export default App
