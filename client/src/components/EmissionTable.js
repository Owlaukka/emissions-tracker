import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot';
import axios from 'axios';
import { connect } from 'react-redux';

const styles = theme => ({
    paper: {
        textAlign: 'center',
        display: 'inline-block',
    },
    tableOverflow: {
        overflowX: 'auto',
    },
});

class EmissionTable extends Component {
    componentDidMount() {
        axios.get('http://localhost:4000/api/co2')
            .then(res => {
                const data = res.data;
                this.props.dispatch({
                    type: 'ADD_EMISSIONS',
                    data
                });
            });
    }

    render() {
        const { classes } = this.props;

        return (
            <Grid className={classes.tableOverflow} item xs={8}>
                <Paper className={classes.paper}>
                    <Table>
                        <TableHead>
                        <TableRow>
                            <TableCell>Country</TableCell>
                            <TableCell align="right">Emissions (CO2)</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.props.rows.map(row => {
                            return (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                {row.country}
                                </TableCell>
                                <TableCell align="right">{row.co}</TableCell>
                            </TableRow>
                            );
                        })}
                        </TableBody>
                    </Table>
                </Paper>
            </Grid>
        );
    }
}

EmissionTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect((store) => {
    return {
        rows: store.cotwo.emissions,
    }
})(withRoot(withStyles(styles)(EmissionTable)));