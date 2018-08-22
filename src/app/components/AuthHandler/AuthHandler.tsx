import colors from '@constants/colors';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import React, { Component } from 'react';

class AuthHandler extends Component {
  public render(): React.ReactElement<AuthHandler> {
    return (
      <div className="container">
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item>
            <AccountCircle />
          </Grid>
          <Grid item>
            <TextField id="input-with-icon-grid" label="With a grid" />
          </Grid>
        </Grid>
        <style jsx>{`
          .container {
            background-color: ${colors.primary};
          }
        `}</style>
      </div>
    );
  }
}
export default AuthHandler;
