import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import axios from 'axios';
import withRoot from '../withRoot';

import CountryEmissionsTable from '../components/CountryEmissionsTable';

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

const fetchData = (countrycode, type, callback) => {
    axios.get(`/api/emissions/countries/${countrycode}/${type}/range/1900-3000`)
        .then(res => {
            let filteredData = res.data;
            if (type === "per_capita") {
                filteredData = filteredData.map((entry) => {
                    entry.value = Number.parseFloat((entry.value * 1000).toFixed(2));
                    return entry;
                });
            }

            callback(filteredData);
        });
}

class CountryEmissions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emissions: [],
        };
    }
    componentDidMount() {
        fetchData(this.props.match.params.countrycode, this.props.match.params.type, (data) => this.setEmissions(data));
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.type !== this.props.match.params.type) {
            fetchData(this.props.match.params.countrycode, this.props.match.params.type, (data) => this.setEmissions(data));
        }
    }

    setEmissions(newEmissions) {
        this.setState({
            emissions: newEmissions,
        });
    }

    render() {
        const { emissions } = this.state;
        const { classes } = this.props;
        const { type, countrycode } = this.props.match.params;

        return (
            <div className={classes.root}>
                <Grid container justify="center">
                    <Grid item xs={12}>
                        <Typography variant="h4" gutterBottom>
                            Emissions Tracker
                        </Typography>
                    </Grid>

                    <CountryEmissionsTable
                        emissions={emissions}
                        countrycode={countrycode}
                        type={type}
                        title={type === "per_capita" ? "Emissions Per Capita" : "Total Emissions"}
                        unit={type === "per_capita" ? "tons of CO2 per capita" : "kilotons of CO2"}
                        shortUnit={type === "per_capita" ? "t / person" : "kt"}
                    />
                </Grid>
            </div>
        );
    }
}

CountryEmissions.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(CountryEmissions));