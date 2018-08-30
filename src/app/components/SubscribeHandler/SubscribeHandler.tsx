import Input from '@components/Input';
import colors from '@constants/colors';
import React, { Component } from 'react';

class SubscribeHandler extends Component {
  public render(): React.ReactElement<SubscribeHandler> {
    return (
      <div className="container">
        <button className="trigger">You don't have an account?</button>
        <div className="form">
          <Input placeholder="Mail" />
          <Input placeholder="Password" type="password" />
          <Input placeholder="Confirm password" type="password" />
        </div>
        <style jsx>{`
          .trigger {
            font-size: 1.2rem;
            line-height: 2.8rem;
            background-color: ${colors.secondary}89;
            padding: 0 0.8rem;
            height: 2.8rem;
            font-family: 'Josefin Sans', sans-serif;
            color: ${colors.primary};
            border-radius: 3px;
            margin-bottom: 1.3rem;
            transition: background-color ease-in 200ms;
            border: none;
            width: 100%;
            outline: none;
            cursor: pointer;
          }

          .trigger:hover {
            background-color: ${colors.secondary}cd;
          }

          .form {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: absolute;
            top: 4.1rem;
            left: 0;
            border-radius: 3px;
            width: 100%;
            height: calc(100% - 4.1rem);
            background-color: ${colors.primary};
            z-index: 2;
          }
        `}</style>
      </div>
    );
  }
}

export default SubscribeHandler;
