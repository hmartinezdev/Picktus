import React, { Component } from 'react';

class Input extends Component {
  public render(): React.ReactElement<Input> {
    return (
      <div className="container">
        <input className="input" type="text" placeholder="Placeholder Text" />
        <span className="focus-border">
          <i />
        </span>
        <style jsx>{`
          .container {
            position: relative;
          }

          .input {
            font: 15px/24px 'Lato', Arial, sans-serif;
            color: #333;
            width: 100%;
            box-sizing: border-box;
            letter-spacing: 1px;
            border: 1px solid #ccc;
            padding: 7px 14px 9px;
            transition: 0.4s;
            outline: none;
          }

          .input ~ .focus-border:before,
          .input ~ .focus-border:after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 0;
            height: 2px;
            background-color: #3399ff;
            transition: 0.3s;
          }
          .input ~ .focus-border:after {
            top: auto;
            bottom: 0;
            left: auto;
            right: 0;
          }
          .input ~ .focus-border i:before,
          .input ~ .focus-border i:after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 2px;
            height: 0;
            background-color: #3399ff;
            transition: 0.4s;
          }
          .input ~ .focus-border i:after {
            left: auto;
            right: 0;
            top: auto;
            bottom: 0;
          }
          .input:focus ~ .focus-border:before,
          .input:focus ~ .focus-border:after {
            width: 100%;
            transition: 0.3s;
          }
          .input:focus ~ .focus-border i:before,
          .input:focus ~ .focus-border i:after {
            height: 100%;
            transition: 0.4s;
          }
        `}</style>
      </div>
    );
  }
}

export default Input;
