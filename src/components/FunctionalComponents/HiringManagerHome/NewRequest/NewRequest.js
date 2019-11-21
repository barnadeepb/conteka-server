import React, {useState, useEffect} from 'react';
import { connect } from "react-redux";
import Paper from '@material-ui/core/Paper';
import { setRequests } from "../../../../js/actions/index";
import API_HOST from "../../../../config";
import axios from 'axios';
import {
    Divider,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Grid,
    Fade,
    Backdrop,
    Modal,
    Typography
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

import "./NewRequest.css";

const mapStateToProps = state => {
    return { role: state.role };
};

function mapDispatchToProps(dispatch) {
    return {
      setRequests: req => dispatch(setRequests(req))
    };
}

const NewRequest = ({shouldOpen, role}) => {
    const [open, setOpen] = React.useState(false);
    // // TaskID
    // // LastModifiedDate
    // Submitter
    // // ActualEndDate
    // DueDate
    // // ActualStartDate
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [assignees, setAssignees] = useState([]);
    let [request, setRequestState] = useState({
        "project": "",
        "assignee": "",
        "description": "",
        "primarySkill": "",
        "secondarySkill": "",
        "status": "new",
        "submitter": role,
        "dueDate": null
    });

    useEffect(() => {
        [
            {"field": "projects-details", "setter": setProjects},
            {"field": "skills", "setter": setSkills},
            {"field": "employees", "setter": setAssignees},
        ].map((dataObj) => {
            axios.post(`${API_HOST}get-data?collection=${dataObj.field}`, {})
            .then(res => {
                if (res.data.length) {
                    dataObj.setter(res.data);
                }
            });
        });
    }, []);

    useEffect(() => {
        if (shouldOpen) {
            handleOpen();
        }
    }), [shouldOpen];

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const updateRequest = (type, event) => {
        setRequestState( (req) => {
            return {
                ...req,
                [type]: type === "dueDate" ? event.getTime() : event.target.value
            }
        } );
    };

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className="req-modal"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Paper className="req-form">
                        <Grid container spacing={0}>
                            <Grid item xs={12} md={12} lg={12} className="vertical-box form-header">
                                <Typography className="caps-header" variant="h5">
                                    Create a new request
                                </Typography>
                                <Divider />
                            </Grid>
                            <Grid container spacing={1} item xs={12} md={12} lg={12} className="vertical-box">
                                <form className="" noValidate autoComplete="off">
                                    <Grid item xs={12} md={6} lg={4}>
                                        <FormControl className="req-form-control">
                                            <InputLabel id="project-label">Project</InputLabel>
                                            <Select
                                            labelId="project-label"
                                            value={request.project}
                                            onChange={updateRequest.bind(this, "project")}
                                            >
                                                {
                                                    projects.map((project, index) => {
                                                        return (
                                                        <MenuItem key={index} value={project.name}>{project.name}</MenuItem>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={4}>
                                        <FormControl className="req-form-control">
                                            <InputLabel id="assignee-label">Assign To</InputLabel>
                                            <Select
                                            labelId="assignee-label"
                                            value={request.assignee}
                                            onChange={updateRequest.bind(this, "assignee")}
                                            >
                                                {
                                                    assignees.map((person, index) => {
                                                        return (
                                                        <MenuItem key={index} value={person.name}>{person.name}</MenuItem>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={4}>
                                        <FormControl className="req-form-control">
                                            {/* <InputLabel id="duedate-label">Due date</InputLabel> */}
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <KeyboardDatePicker
                                                    disableToolbar
                                                    variant="inline"
                                                    format="MM/dd/yyyy"
                                                    margin="normal"
                                                    label="Due date"
                                                    value={request.dueDate}
                                                    onChange={updateRequest.bind(this, "dueDate")}
                                                    />
                                            </MuiPickersUtilsProvider>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={4}>
                                        <FormControl className="req-form-control">
                                            <InputLabel id="project-label">Project</InputLabel>
                                            <Select
                                            labelId="project-label"
                                            value={request.project}
                                            onChange={updateRequest.bind(this, "project")}
                                            >
                                                {
                                                    projects.map((project, index) => {
                                                        return (
                                                        <MenuItem key={index} value={project.name}>{project.name}</MenuItem>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </form>
                            </Grid>
                        </Grid>
                    </Paper>
                </Fade>
            </Modal>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(NewRequest);