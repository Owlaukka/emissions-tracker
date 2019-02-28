import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import MaterialTable from 'material-table';
import withRoot from '../withRoot';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link } from 'react-router-dom';


const styles = theme => ({});

class CountryEmissionsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: props.type === 'per_capita' ? 1 : 0,
        };

        this.handleTabChange = this.handleTabChange.bind(this);
    }


    handleTabChange = (event, tab) => {
        return this.setState({ tab });
    };

    render() {
        const { tab } = this.state;
        const { title, unit, shortUnit, emissions } = this.props;

        return (
            <Grid item xs={11} md={8} lg={6}>
                <Grid container justify="center">
                    <Tabs
                        value={tab}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={this.handleTabChange}
                    >
                        <Tab component={Link} to={`/country/${this.props.countrycode}/absolute`} label="Total Emissions" />
                        <Tab component={Link} to={`/country/${this.props.countrycode}/per_capita`} label="Emissions Per Capita" />
                    </Tabs>
                </Grid>
                <Grid container justify="center">
                    <MaterialTable
                        columns={[
                            { title: 'Country', field: 'country', filtering: false, },
                            { title: 'Year', field: 'year', type: 'numeric', defaultSort: 'desc', },
                            { title: `${title} (${shortUnit})`, field: 'value', type: 'numeric', filtering: false, }
                        ]}
                        data={emissions}
                        title={`${title} (${unit})`}
                        options={{
                            filtering: true,
                            pageSize: 20,
                            pageSizeOptions: [20, 50, 100],
                            search: false,
                        }}
                    />
                </Grid>
            </Grid>
        );
    }
}

CountryEmissionsTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(CountryEmissionsTable));