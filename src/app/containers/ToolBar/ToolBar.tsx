import Button from '@components/Button';
import colors from '@constants/colors';
import Authentication from '@services/authentication';
import React, { Component } from 'react';

class ToolBar extends Component {
  public render(): React.ReactElement<ToolBar> {
    return (
      <div className="toolbar">
        <Button text="disconnect" onClick={Authentication.disconnect} />
        <style jsx>{`
          .toolbar {
            height: 100vh;
            width: 4rem;
            background-color: ${colors.primary};
          }
        `}</style>
      </div>
    );
  }
}

export default ToolBar;
