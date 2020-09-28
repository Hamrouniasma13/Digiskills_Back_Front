import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import PropTypes from 'prop-types'
import isEmpty from '../../validation/is-empty'
import { connect } from "react-redux";

import aa from "../../assets/img/sidebar-4.jpg"

class ManagersItems extends Component {

   
    render() {
        const { manager } = this.props;
        const useStyles = () => ({
            root: {
                maxWidth: 100,
            },
            media: {
                height: 140,
            },
        });
        const classes = useStyles();

        return (
            <div>
                <Card className={classes.root}>
                    <CardActionArea>
                        {/* <CardMedia
                            className={classes.media}
                            image="D:\DIGISKILLS\digiskills\client\src\assets\img\sidebar-4.jpg"
                            title="Contemplative Reptile"
                        /> */}
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {user.firstName}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {user.lastName}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>


                        <Button variant="outlined" color="primary">

                            Plus ...
              </Button>
                    </CardActions>
                </Card>

            </div>
        )
    }
}
ManagersItems.propTypes = {
    manager: PropTypes.object.isRequired,
};
export default connect(null,)(ManagersItems); 