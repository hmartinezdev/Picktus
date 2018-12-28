import Button from '@components/Button';
import colors from '@constants/colors';
import React, { Component } from 'react';
import { IToolBarProps } from './ToolBar.type';

class ToolBar extends Component<IToolBarProps> {
  public render(): React.ReactElement<ToolBar> {
    const { signout } = this.props;

    return (
      <div className="toolbar">
        <Button text="disconnect" onClick={signout} />
        <style jsx>{`
          .toolbar {
            display: flex;
            justify-content: center;
            height: 100%;
            width: 100%;
            background-color: ${colors.primary};
          }
        `}</style>
      </div>
    );
  }
}

export default ToolBar;
