import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';
import Dropdown from './components/dropdown.jsx';


function App() {
const BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1/';
const [departments, setDepartments] = useState([]);
const [selectedDepartment, setSelectedDepartment] = useState(null);
const [searchInput, setSearchInput] = useState('');
const [searchOption, setSearchOption] = useState('title')
const [artResults, setArtResults] = useState([]);
const [searchSubmitted, setSearchSubmitted] = useState(false);


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

const handleSearchInput = (event) => {
  setSearchInput(event.target.value)
}

const handleSearchOptionChange = (event) => {
  setSearchOption(event.target.value);
  if (event.target.value !== 'department')
    setSelectedDepartment(null);
}

const handleSearchSubmit = async (event) => {
  event.preventDefault();
  setSearchSubmitted(true);
  try {
    if (searchOption === 'objectId') {
      const artResult = await apiService.get(`/objects/${searchInput}`);
      setArtResults([artResult.data]);
    } else {
      let query = `/search?q=${encodeURIComponent(searchInput)}`;
    if (searchOption === 'department' && selectedDepartment) {
        query += `&departmentId=${selectedDepartment.departmentId}`;
      }
      const result = await apiService.get(query);
      const objectIDs = result.data.objectIDs || [];
    if (objectIDs.length > 0) {
      const artDetails = await Promise.all(
        objectIDs.slice(0, 10).map(async (id) => {
      const artResult = await apiService.get(`/objects/${id}`);
    return artResult.data;
      })
      );
          setArtResults(artDetails);
      } else {
          setArtResults([]);
      }
    }
  } catch (error) {
    console.error('Error fetching art:', error);
  }
};

useEffect(() => {
  getDepartments();
  
}, []);

  return (
    <div className='main-container'>
      <h1>The Metropolitian</h1>
      <h1>Museum of Art</h1>
        <div className='search-bar'>
          <form className='form-format' onSubmit={handleSearchSubmit}>
            <div className='radio-buttons'>
              <label>
                <input type="radio" value="title" checked={searchOption === 'title'} onChange={handleSearchOptionChange}/>
                  Search by Title
              </label>
              <label>
                <input type="radio" value="objectId" checked={searchOption === 'objectId'} onChange={handleSearchOptionChange}/>
                    Search by Object ID
              </label>
              <label>
                <input type="radio" value="department" checked={searchOption === 'department'} onChange={handleSearchOptionChange}/>
                    Search by Department
              </label>
            </div>
              {searchOption === 'department' && departments.length > 0 && (<Dropdown options={departments} onSelect={handleDepartmentChange} />)}
              <input className='search-input' type="text" placeholder="Enter search term..." value={searchInput} onChange={handleSearchInput}/>
              <button className='search-button' type="submit">Search</button>
          </form>
        </div>
        <div className='results'>
        {searchSubmitted && artResults.length === 0 ? (
    <p>No results found. Please try again...</p>
  ) : (
          <div className='art-card-container'>
            {artResults.map((art) => (
              
              <div className='art-card' key={art.objectID}>
                  
                <h3> {art.title}</h3>
                {art.primaryImageSmall && 
                    (<img src={art.primaryImageSmall} alt={art.title} />
                  )}
                  {art.artistDisplayName && <p>By: {art.artistDisplayName}</p>}
                  {!art.artistDisplayName && <p>By: Unkown</p>}
                  <link></link>
                  <a href={art.objectURL} target="_blank" rel="noopener noreferrer">
                    View More
                  </a>
                
              </div>
            ))}
          </div>
        )}
        </div>
    </div>
  );
}

export default App
