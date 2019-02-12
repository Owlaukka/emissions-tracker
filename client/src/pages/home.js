import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot';

import EmissionTable from '../components/EmissionTable';

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
});

class Home extends Component {
  render() {
    const { classes } = this.props;

    return (
        <div className={classes.root}>
            <Grid container justify="center">
                <Grid item xs={12}>
                    <Typography variant="h4" gutterBottom>
                    Material-UI
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom>
                    example project
                    </Typography>
                </Grid>
                <EmissionTable />
            </Grid>
        </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Home));