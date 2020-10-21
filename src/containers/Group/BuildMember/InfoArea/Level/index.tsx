import React from 'react';
import { Form } from 'react-bootstrap';
import './level.scoped.css';

const Details = ({member, onUpdateMember}) => {
  console.log(member);
  let { detail } = member;
  let { level = 50, gender = 0, shiny = 0, gmax = 0 } = detail;
  const updateDetail = (id, value) => onUpdateMember({
    dex: member.dex,
    detail: {
      [id]: value
    }
  });

  return (
    <div>
      <div className="details">
        <label>Level: </label>
        <div className="level">
          <Form.Control type="number" value={level}
                        onChange={e => updateDetail('level', e.target.value)}/>
        </div>
      </div>
      <div className="details">
        <label>Gender: </label>
        <div className="radio">
          <Form.Check
            type="radio"
            id="gender"
            label="Male"
            checked={gender === 0}
            onChange={e => updateDetail('gender', 0)}
          />
        </div>
        <div className="radio">
          <Form.Check
            type="radio"
            id="gender"
            label="Female"
            checked={gender === 1}
            onChange={e => updateDetail('gender', 1)}
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
            checked={shiny === 1}
            onChange={e => updateDetail('shiny', 1)}
          />
        </div>
        <div className="radio">
          <Form.Check
            type="radio"
            id="shiny"
            label="No"
            checked={shiny === 0}
            onChange={e => updateDetail('shiny', 0)}
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
            checked={gmax === 1}
            onChange={e => updateDetail('gmax', 1)}
          />
        </div>
        <div className="radio">
          <Form.Check
            type="radio"
            id="gmax"
            label="No"
            checked={gmax === 0}
            onChange={e => updateDetail('gmax', 0)}
          />
        </div>
      </div>
    </div>
  );
};

export default Details;
