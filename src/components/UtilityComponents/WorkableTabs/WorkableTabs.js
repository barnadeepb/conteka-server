import React, { Component } from "react";
import {
    withStyles,
    Tabs,
    Tab,
    Grid
} from "@material-ui/core";
import Close from "@material-ui/icons/Close";
import Box from '@material-ui/core/Box';

import "./WorkableTabs.css";

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop:"60px",
        width: "100%",
        backgroundColor: theme.palette.background.paper
    },
    appBar:{
        color:"inherit",
        backgroundColor: theme.palette.background.paper
    }
});

class WorkableTabs extends Component {
    constructor(...props){
        super(...props);
        this.selectedTabIndex = 0;
        this.useLocalIndex = false;
    }

    deleteTab = (e, tabID, tabIDIndex) => {
        if(e)
            e.stopPropagation();
        this.props.deleteTab();
    }

    setTabIndex = (selectedTabIndex) => {
        this.selectedTabIndex = selectedTabIndex > -1 ? selectedTabIndex : 0;
        this.useLocalIndex = true;
    }

    handleTabChange = (selectedTabIndex) => {
        this.setTabIndex(selectedTabIndex);
        this.forceUpdate();
    }

    render() {
        // Set the index only when the prop value has changed
        if(!this.useLocalIndex){
            this.setTabIndex(this.props.selectedTabIndex);
        }
        this.useLocalIndex = false;
        return (
            <div>
                <Grid
                    className="workable-area-header"
                    container
                    alignItems="center"
                    justify="center"
                >
                    {/* This first grid item is for tab header */}
                    <Grid
                        item
                        xl={12}
                        lg={12}
                        md={12}
                        sm={12}
                        xs={12}
                    >
                        <Tabs
                            value={this.selectedTabIndex}
                            variant="scrollable"
                            scrollButtons="auto"
                        >
                            {
                                Array.isArray(this.props.tabList) && this.props.tabList.map((tab, tabIDIndex) => (
                                    <Tab
                                        onClick={this.handleTabChange.bind(this,tabIDIndex)}
                                        component="div"
                                        key={tab.tabKey}
                                        value={tab.tabIDIndex}
                                        label={
                                            <div>
                                            {tab.title}
                                                <Close onClick={this.deleteTab.bind(this)}>
                                                </Close>
                                            </div>
                                            }
                                        className="mytab"
                                    />
                                ))
                            }
                        </Tabs>
                    </Grid>
                </Grid>

                <div className="">
                    {
                        Array.isArray(this.props.tabList) && this.props.tabList.map((tab, tabIDIndex) => (
                            <Box p={3} hidden={this.selectedTabIndex !== tabIDIndex} key={tab.tabKey}>
                                {tab.content}
                            </Box>
                        ))
                    }
                </div>
                
            </div>
        );
    }
}

export default withStyles(styles)(WorkableTabs);