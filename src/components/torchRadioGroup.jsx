import React from 'react';
import Capitalize from '../components/capitalize';

export function TorchRadioGroup({selectedValue, onChange, name, options}) {
  return <div className="torch-radio-group">
    <div>
      {options.map(option => {
        const id = `${name}-${option}`;

        return <label className="torch-radio" key={id} htmlFor={id}>
          <input
            id={id}
            name={name}
            type="radio"
            value={option}
            checked={selectedValue === option}
            onChange={() => onChange(option)}
          />
          <i className="torch-radio-icon" />
          <div className="torch-radio-label">
            <Capitalize text={option} />
          </div>
        </label>;
      })}
    </div>
  </div>;
}
