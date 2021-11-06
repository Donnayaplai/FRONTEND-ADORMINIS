import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

const DynamicSelect = (props) => {
  return (
    <>
      <Form.Select onChange={props.handleSelectChange}>
        {props.option.map((data, i) => {
          return (
            <option value={data} key={data}>
              {data}
            </option>
          );
        })}
      </Form.Select>
    </>
  );
};

export default DynamicSelect;
