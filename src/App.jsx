import { useState, useEffect } from 'react'
import './app.css'
import axios from 'axios';
import Dropdown from './components/dropdown.jsx';


function App() {
const BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1/';
const [departments, setDepartments] = useState([]);
const [selectedDepartment, setSelectedDepartment] = useState(null);
const [searchInput, setSearchInput] = useState('');



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




const handleDepartmentChange = (department) => {
  setSelectedDepartment(department);
};

const handleSearchChange = (event) => {
  setSearchInput(event.target.value)
}

const handleSearchSubmit = async (event) => {
  event.preventDefault();
  try {
    const query ='/search?q+${encodeURIComponent(searchInput)}' +
    (selectedDepartment ? '&')
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
<h1>Museum of Art</h1>
<div className='search-bar'>

{departments.length > 0 ? (
        <Dropdown dropdown options={departments} onSelect={handleDepartmentChange}/>
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
