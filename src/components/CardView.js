import React from 'react';
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SchoolPic from '../images/gschool.jpg'
import StarRatings from 'react-star-ratings';
import Graduate from "../images/graduate-logo.svg"


const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  });
  



const CardView = (props) => {

    const classes = useStyles();
      
    const renderSchools = props.schools.map(school =>
        <Card key={school.schoolid}>
        <CardActionArea>
        <CardMedia
          className={classes.media}
          image={SchoolPic}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
                {school.schoolName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="div">
              <p className="address">
                  <span>Address:</span> {school.address.street},
                  {school.address.city},
                  {school.address.state},
                  {school.address.stateFull},
                  {school.address.zip}
              </p>
              <p className="students">
                  <span>Students:</span>  {school.schoolYearlyDetails[0].numberOfStudents}
              </p>
          </Typography>
          {school.rankHistory !== null && school.rankHistory.length > 0 && <StarRatings
            rating={school.rankHistory[0].rankStars}
            starRatedColor="purple"
            numberOfStars={6}
            name='rating'
            starDimension="30px"
        />}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary"/* onClick={() => toggleFavAction(school)}*/>
          Add To Favorites
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>

 </Card>
        )
        return (
          <div>
            <div className="cards">
                {renderSchools}
            </div>
              <div>
              <img className="graduate-logo" src={Graduate} alt="logo-website"/>
              <p className="sentence">MAKE OUR SCHOOLS GREAT AGAIN</p>
          </div> 
          </div>
            
        )
        
};

CardView.propTypes = {
    schools: PropTypes.arrayOf(PropTypes.shape({
        schoolid: PropTypes.string.isRequired,
        schoolName: PropTypes.string.isRequired,
        address: PropTypes.shape({
            city: PropTypes.string.isRequired,
            stateFull: PropTypes.string.isRequired,
            zip: PropTypes.string.isRequired,
            latLong: PropTypes.shape({
                latitude: PropTypes.number.isRequired,
                longitude: PropTypes.number.isRequired
            }).isRequired
        }).isRequired,
        numberOfStudents: PropTypes.number,
        rankHistory: PropTypes.arrayOf(PropTypes.shape({
            rank: PropTypes.number.isRequired,
            rankLevel: PropTypes.string.isRequired,
            rankStars: PropTypes.number.isRequired,
        })),
    }).isRequired).isRequired,
}
export default CardView;