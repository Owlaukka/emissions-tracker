import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MaterialTable from 'material-table';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import withRoot from '../withRoot';
import YearSlider from '../components/YearSlider';



const styles = theme => ({});

const filterEmissionsByYear = (emissions, year) => {
    const newEmissions = emissions
        .filter((entry) => entry.year == year);

    return newEmissions;
}

class EmissionsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emissions: [],
            year: 2014,
        };

        this.handleSliderChange = this.handleSliderChange.bind(this);
        this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.emissions !== this.props.emissions) {
            this.handleSliderChange(undefined, this.state.year);
        }

    }

    handleSliderChange(event, newYear) {
        const newEmissions = filterEmissionsByYear(this.props.emissions, newYear);

        this.setState({
            emissions: newEmissions,
            year: newYear,
        });
    }

    handleTextFieldChange(event) {
        if (isNaN(Number.parseInt(event.target.value))) return;
        const newEmissions = filterEmissionsByYear(this.props.emissions, Number.parseInt(event.target.value));

        this.setState({
            emissions: newEmissions,
            year: Number.parseInt(event.target.value)
        });
    }

    render() {
        const { year } = this.state;
        const { type, title, unit, shortUnit } = this.props;

        return (
            <Grid item xs={6}>
                <TextField
                    label="Year"
                    value={this.state.year}
                    onChange={this.handleTextFieldChange}
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                    variant="outlined"
                />
                <YearSlider year={year} setYear={this.handleSliderChange} />
                <Route render={({ history }) => (
                    <MaterialTable
                        title={`${title} (${unit})`}
                        columns={[
                            { title: 'Country', field: 'country' },
                            { title: 'Year', field: 'year', type: 'numeric', filtering: false, sorting: false },
                            {
                                title: `${title} (${shortUnit})`,
                                field: 'value',
                                type: 'numeric',
                                filtering: false,
                                defaultSort: 'desc'
                            },
                        ]}
                        data={this.state.emissions}
                        onRowClick={function (event, row) {
                            history.push('/country/' + row.countrycode + (type === 'per_capita' ? '/per_capita' : '/absolute'));
                        }}
                        options={{
                            filtering: true,
                            pageSize: 20,
                            pageSizeOptions: [20, 50, 100],
                            search: false,
                        }}
                    />
                )} />

            </Grid>
        );
    }
}

EmissionsTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(EmissionsTable));