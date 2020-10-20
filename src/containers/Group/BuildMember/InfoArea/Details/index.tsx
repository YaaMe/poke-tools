import React from 'react';
import { Form } from 'react-bootstrap';
import './details.scoped.css';

const Details = ({detail}) => {

  const test_detail = [{
    title: 'level',
    value: 50
  }, {
    title: 'gender',
    value: 0
  }, {
    title: 'shiny',
    value: 0
  }, {
    title: 'gmax',
    value: 0
  }];
  const [level, gender, shiny, gmax] = test_detail;
  return (
    <div>
      <div className="details">
        <label>Level: </label>
        <div className="level">
          <Form.Control type="number" value={level.value}/>
        </div>
      </div>
      <div className="details">
        <label>Gender: </label>
        <div className="radio">
          <Form.Check
            type="radio"
            id="gender"
            label="Male"
            checked={gender.value === 0}
            onChange={e => {} }
          />
        </div>
        <div className="radio">
          <Form.Check
            type="radio"
            id="gender"
            label="Female"
            checked={gender.value === 1}
          />
        </div>
      </div>
      <div className="details">
        <label>Shiny: </label>
        <div className="radio">
          <Form.Check
            type="radio"
            id="shiny"
            label="Yes"
            checked={shiny.value === 1}
          />
        </div>
        <div className="radio">
          <Form.Check
            type="radio"
            id="shiny"
            label="No"
            checked={shiny.value === 0}
          />
        </div>
      </div>
      <div className="details">
        <label>Gmax: </label>
        <div className="radio">
          <Form.Check
            type="radio"
            id="gmax"
            label="Yes"
            checked={gmax.value === 1}
          />
        </div>
        <div className="radio">
          <Form.Check
            type="radio"
            id="gmax"
            label="No"
            checked={gmax.value === 0}
          />
        </div>
      </div>
    </div>
  );
};

export default Details;
