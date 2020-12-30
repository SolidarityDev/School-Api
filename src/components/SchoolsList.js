import React, {useState} from 'react'
import MapView from '../components/MapView';
import CardView from "../components/CardView";
import FavoritesListView from "../components/FavoritesListView";
import PropTypes from 'prop-types'
import {getSchoolsList} from "../reducers/Schools";
import {useSelector} from "react-redux";
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import RoomIcon from "@material-ui/icons/Room";
import ListAltIcon from '@material-ui/icons/ListAlt';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Badge from '@material-ui/core/Badge';


function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography component="div">{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const SchoolsList = () => {
    let schools = useSelector(getSchoolsList)
    const [value, setValue] = React.useState(0);

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return <div>
        <Paper className='paper'>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <Tab icon={<ListAltIcon/>} label="List view" {...a11yProps(0)}  />
                <Tab icon={<RoomIcon/>} label="On map" {...a11yProps(1)} />
                <Tab icon={<Badge badgeContent={0} anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }} color="primary"><FavoriteBorderIcon/></Badge>} label="favorites" {...a11yProps(2)} />
            </Tabs>
        </Paper>

        <TabPanel value={value} index={0}>
            {(schools !== undefined) && <CardView schools={schools}/>}
        </TabPanel>
        <TabPanel value={value} index={1}>
            {(schools !== undefined) && <MapView schools={schools}/>}
        </TabPanel>
        {/*<TabPanel value={value} index={2}>
            {(schools !== undefined) && <FavoritesListView schools={schools}/>}
        </TabPanel>*/}

    </div>
}
export default SchoolsList