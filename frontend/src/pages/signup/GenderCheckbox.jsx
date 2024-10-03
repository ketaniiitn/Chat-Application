import React, { useState } from 'react';
const GenderCheckbox = ({onCheckboxChange,selectedGender}) => {
  const handleRadioChange = (event) => {
    onCheckboxChange(event.target.value);
  };
  return (
    <div className='flex flex-col mt-2'>
      <label className='label cursor-pointer ${selectedGender === "male" ? "selected":""}'>
        <span className='label-text text-black text-sm'>Select Your Gender</span>
      </label>
      <div className='flex items-center space-x-4'>
        <div className='flex items-center'>
          <input
            type='radio'
            name='gender'
            value='Male'
            checked={selectedGender === 'Male'}
            onChange={handleRadioChange}
            className='mr-1'
          />
          <span className='text-sm'>Male</span>
        </div>
        <div className='flex items-center'>
          <label className='label cursor-pointer ${selectedGender === "Male" ? "selected":""}'>
          <input
            type='radio'
            name='gender'
            value='Female'
            checked={selectedGender === 'Female'}
            onChange={handleRadioChange}
            className='mr-1'
          />
          <span className='text-sm'>Female</span>
          </label>
        </div>
      </div>
    </div>
  );
};
export default GenderCheckbox;