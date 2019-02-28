import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot';

const styles = theme => ({
});

class Navbar extends Component {
    state = {
        value: 0,
    };
    
    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { value } = this.state;

        return (
            <div>
                <AppBar position="static">
                <Tabs variant="fullWidth" value={value} onChange={this.handleChange}>
                    <Tab component={Link} to="/" label="Absolute Emissions" />
                    <Tab component={Link} to="/per_capita" label="Per Capita Emissions" />
                </Tabs>
                </AppBar>
            </div>
        );
    }
}

export default withRoot(withStyles(styles)(Navbar));