import React, { useState } from 'react';

const GenderCheckbox = () => {
  const [selectedGender, setSelectedGender] = useState('');

  const handleRadioChange = (event) => {
    setSelectedGender(event.target.value);
  };

  return (
    <div className='flex flex-col mt-2'>
      <label className='label'>
        <span className='label-text text-black text-sm'>Select Your Gender</span>
      </label>
      <div className='flex items-center space-x-4'>
        <div className='flex items-center'>
          <input
            type='radio'
            name='gender'
            value='male'
            checked={selectedGender === 'male'}
            onChange={handleRadioChange}
            className='mr-1'
          />
          <span className='text-sm'>Male</span>
        </div>
        <div className='flex items-center'>
          <input
            type='radio'
            name='gender'
            value='female'
            checked={selectedGender === 'female'}
            onChange={handleRadioChange}
            className='mr-1'
          />
          <span className='text-sm'>Female</span>
        </div>
      </div>
    </div>
  );
};

export default GenderCheckbox;
