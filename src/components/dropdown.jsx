import { useState, useEffect } from 'react';
import './dropdown.css';

function Dropdown({ options, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

 

  const clickDropdown = () => setIsOpen(!isOpen);

  const onClickSelect = (option) => {
    setSelectedDepartment(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className='dropdown'>
      <div className='dropdown-head' onClick={clickDropdown}>
        {selectedDepartment ? selectedDepartment.displayName : 'Select a Department'} 
        <div className='arrow'>
        ▼
        </div>
      </div>
      {isOpen && (
        <div className='dropdown-selections'>
          {options.map((option) => (
            <div key={option.departmentId} className='dropdown-selection' onClick={() => onClickSelect(option)}>
              {option.displayName} 
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;