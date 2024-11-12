
import React from 'react';

const Select = ({options,defaultValue,value,onChange}) => {
  return (
    <div className="_select">
        <select value={value} onChange={e=>onChange(e.target.value)}>
        <option disabled={true}>{defaultValue}</option>
          {options.map((option) => {
            return <option key={option.value} value={option.value}>{option.name}</option>
          })}
      </select>
    </div>
  );
};
export default Select;
  