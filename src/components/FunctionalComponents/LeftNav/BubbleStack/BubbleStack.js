import React, { Component } from "react";
import StackGrid, { transitions } from "react-stack-grid";
import Avatar from '@material-ui/core/Avatar';
import peoplePhotos from "./utility/image-loader";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import "./BubbleStack.css";

const { scaleDown } = transitions;

class BubbleStack extends Component {
    constructor(props){
        super(props);
        this.state = {
            expandAvatars: false,
            searchVal: ""
        };
        this.reportees = [];
    }

    componentDidUpdate = () => {
        this.setReportees();
    }
    componentWillMount = () => {
        this.setReportees();
    }

    setReportees = () => {
        this.reportees = peoplePhotos.filter((person)=>{
            return person.name && person.name.toUpperCase().includes(this.state.searchVal.toUpperCase());
        });
    }

    toggleAvatarPanel(e){
        e.preventDefault();
        e.stopPropagation();
        this.setState(state => {
            return {
                expandAvatars: !state.expandAvatars
            };
        });
    }
    openAvatarPanel = () => {
        this.setState(state => {
            return {
                expandAvatars: true
            };
        });
    }
    filterReportees = (event) => {
        event.preventDefault();
        let searchVal = event.target.value;
        this.setState((state) => {
            return {
                searchVal: searchVal
            }
        });
    }
    render() {
        return (
            <div className="drawer-avatars">
                <div className="search-bar">
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <SearchIcon />
                        </Grid>
                        <Grid item>
                            <TextField
                                label="Filter your reportees"
                                className="search-input"
                                value={this.state.searchVal}
                                onChange={this.filterReportees.bind(this)}
                                onFocus={this.openAvatarPanel}/>
                        </Grid>
                    </Grid>
                </div>
                <StackGrid
                    className={"avatar-container " + (!this.state.expandAvatars ? "close" : "")}
                    appear={scaleDown.appear}
                    appeared={scaleDown.appeared}
                    enter={scaleDown.enter}
                    entered={scaleDown.entered}
                    leaved={scaleDown.leaved}
                    columnWidth={60}
                    >
                    {
                        this.reportees.map((person, index) => {
                            return (
                                <Avatar key={index+1} alt={"Person "+(index+1)} src={person.photo}
                                    className={Math.floor((Math.random() * 10) + 1) % 2 === 0 ? "small-icon" : "small-icon"}
                                />
                            );
                        })
                    }

                </StackGrid>

                <div
                    className={"toggle-panel-icon " + (this.state.expandAvatars ? "hide" : "")}
                    onClick={this.toggleAvatarPanel.bind(this)}
                >
                    <ExpandMoreIcon />
                </div>
                <div
                    className={"toggle-panel-icon " + (this.state.expandAvatars ? "" : "hide")}
                    onClick={this.toggleAvatarPanel.bind(this)}
                >
                    <ExpandLessIcon />
                </div>
            </div>
        );
    }
}

export default BubbleStack;
