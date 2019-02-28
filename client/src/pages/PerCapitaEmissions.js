import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot';

import EmissionsTable from '../components/EmissionsTable';

import axios from 'axios';

const styles = theme => ({
    root: {
        textAlign: 'center',
        [theme.breakpoints.down('lg')]: {
            paddingTop: theme.spacing.unit * 5,
        },
        [theme.breakpoints.up('lg')]: {
            paddingTop: theme.spacing.unit * 15,
        },
    },
});

class PerCapitaEmissions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emissions: [],
        };

        this.setEmissions = this.setEmissions.bind(this);
    }

    componentDidMount() {
        axios.get("/api/emissions/countries/all/per_capita")
            .then(res => {
                const data = res.data

                const formattedData = data
                    .map((entry) => {
                        entry.value = Number.parseFloat((entry.value * 1000).toFixed(2));
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
        const { emissions } = this.state;
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
                        type="per_capita"
                        title="Emissions Per Capita"
                        unit="tons of CO2 per capita"
                        shortUnit="t / person"
                        emissions={emissions}
                    />
                </Grid>
            </div>
        );
    }
}

PerCapitaEmissions.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(PerCapitaEmissions));