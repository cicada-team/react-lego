/* eslint-disable react/prop-types */
import React from 'react';

export const onFirstNameChange = ({ props }, e) => ({
  ...props,
  firstName: e.target.value,
});

export const onLastNameChange = ({ props }, e) => ({
  ...props,
  lastName: e.target.value,
});

export const render = props => (
  <div>
    <span>firstName</span>
    <input value={props.firstName} onChange={props.onFirstNameChange} />
    <span>lastName</span>
    <input value={props.lastName} onChange={props.onLastNameChange} />
  </div>
);

export const propTypes = {
  firstName: React.PropTypes.string,
  lastName: React.PropTypes.string,
  onFirstNameChange: React.PropTypes.func,
  onLastNameChange: React.PropTypes.func,
};

export const defaultProps = {
  firstName: '',
  lastName: '',
};

