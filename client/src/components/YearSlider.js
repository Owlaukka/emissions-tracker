import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid } from '@material-ui/core';
import Slider from '@material-ui/lab/Slider';
import { withStyles } from '@material-ui/core/styles';

import withRoot from '../withRoot';


const styles = theme => ({
    slider: {
        padding: '18px 0px',
    },
});

class YearSlider extends Component {


    render() {
        const { year, setYear, classes } = this.props;

        return (
            <Grid container justify="center">
            <Grid item xs={8}>
                <Typography id="slider-icon">Select Year</Typography><br />
                <Slider
                    classes={{ container: classes.slider }}
                    value={year}
                    aria-labelledby="slider-icon"
                    min={1950}
                    max={new Date().getFullYear()}
                    step={1}
                    onChange={setYear}
                />
            </Grid>
            </Grid>

        );
    }
}

YearSlider.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(YearSlider));