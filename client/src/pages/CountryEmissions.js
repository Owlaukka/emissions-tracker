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
        paddingTop: theme.spacing.unit * 20,
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
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Grid container justify="center">
                    <Grid item xs={12}>
                        <Typography variant="h4" gutterBottom>
                            Emissions Tracker
                        </Typography>
                    </Grid>

                    <CountryEmissionsTable
                        emissions={this.state.emissions}
                        countrycode={this.props.match.params.countrycode}
                        type={this.props.match.params.type}
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