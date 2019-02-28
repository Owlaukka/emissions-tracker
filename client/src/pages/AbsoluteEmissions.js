import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot';

import axios from 'axios';
import EmissionsTable from '../components/EmissionsTable';

const styles = theme => ({
    root: {
        textAlign: 'center',
        paddingTop: theme.spacing.unit * 20,
    },
});

class AbsoluteEmissions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emissions: [],
        };

        this.setEmissions = this.setEmissions.bind(this);
    }

    componentDidMount() {
        axios.get("/api/emissions/countries/all/absolute")
            .then(res => {
                const data = res.data;

                const formattedData = data
                    .map((entry) => {
                        entry.value = Number.parseInt(entry.value);
                        return entry;
                    });
                this.setEmissions(formattedData);
            });
    }

    setEmissions(newEmissions) {
        this.setState({
            emissions: newEmissions,
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Grid container justify="center">
                    <Grid item xs={12}>
                        <Typography variant="h4" gutterBottom>
                            Emissions Tracker
                        </Typography>
                    </Grid>

                    <EmissionsTable
                        type="absolute"
                        title="Total Emissions"
                        unit="kilotons"
                        shortUnit="kt"
                        emissions={this.state.emissions}
                    />
                </Grid>
            </div>
        );
    }
}

AbsoluteEmissions.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(AbsoluteEmissions));