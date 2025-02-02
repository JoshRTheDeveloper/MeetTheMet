import { useState, useEffect } from 'react'
import './app.css'
import axios from 'axios';


function App() {
const BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1/';
const [departments, setDepartments] = useState([]);
const [selectedDepartment, setSelectedDepartment] = useState(null);




const apiService = axios.create({
  baseURL: BASE_URL
});

const getDepartments = async () => {
  try {
    const result = await apiService.get('/departments');
    setDepartments(result.data.departments);
    setSelectedDepartment(result.data.departments[0])
  } catch (error) {
    console.error('Error fetching data:', error)
  }
  };

const handleDepartmentChange = (event) => {
  const selectedDepartmentId = event.target.value;
  const selected = departments.find(department => department.id === parseInt(selectedDepartmentId))
  setSelectedDepartment(selected);
}


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
          
         <label htmlFor='department-select'> Select a Department:</label>
         <select id="department-select" onChange={handleDepartmentChange}>
          {departments.map((department) => (
<option key={department.departmentId} value={department.departmentID}>
  
  {department.displayName}

</option>
          ))}
         </select>
         
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
