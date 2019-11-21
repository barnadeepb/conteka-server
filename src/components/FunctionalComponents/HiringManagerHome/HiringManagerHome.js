import React, {Component} from 'react';
import { connect } from "react-redux";
import Paper from '@material-ui/core/Paper';
import DataTable from "../../UtilityComponents/DataTable/DataTable";
import { setRequests } from "../../../js/actions/index";
import WorkableTabs from "../../UtilityComponents/WorkableTabs/WorkableTabs";
import API_HOST from "../../../config";
// import Typography from '@material-ui/core/Typography';
// import Fab from "@material-ui/core/Fab";
// import AddIcon from "@material-ui/icons/Add";

import { TAB_TYPES } from "../../../js/constants/tab-types";
import "./HiringManagerHome.css";

import AllRequests from "../Requests/View-All/AllRequests";
import RequestEditor from "../Requests/Editor/RequestEditor";
import AllVendors from "../Vendors/View-All/AllVendors";
import VendorEditor from "../Vendors/Editor/VendorEditor";

const mapStateToProps = state => {
    return {
        tabName: state.tabName,
        role: state.role
    };
};  

function mapDispatchToProps(dispatch) {
    return {
      setRequests: req => dispatch(setRequests(req))
    };
}

class HiringManagerHome extends Component {
    constructor(props){
        super(props);
        this.selectedTabIndex = -1;
        this.tabList = [];
    }

    createTab = () => {
        let tab = {
            tabKey: new Date().getTime(),
            type: this.props.tabName,
            title: null,
            content: null
        };
        // This is a hardcoded 
        if(this.props.tabName === TAB_TYPES.REQUESTS.ALL ) {
            tab.title = "All Requests";
            tab.content = <AllRequests/>;
        } else if(this.props.tabName === TAB_TYPES.REQUESTS.NEW ) {
            tab.title = "Create a new request";
            tab.content = <RequestEditor/>;
        } else if(this.props.tabName === TAB_TYPES.VENDORS.ALL ) {
            tab.title = "All vendors";
            tab.content = <AllVendors/>;
        } else if(this.props.tabName === TAB_TYPES.VENDORS.NEW ) {
            tab.title = "Onboard a new vendor";
            tab.content = <VendorEditor/>;
        } else {
            tab.title = "Generic tab.";
            tab.content = (<div>Yet to hook up this component.</div>);
        }
        return tab;
    }

    setTablist = () => {
        let tabExists = false;
        this.tabList.forEach( (tab, tabIndex) => {
            if (tab.type === this.props.tabName) {
                tabExists = true;
                this.selectedTabIndex = tabIndex;
            }
        } );
        if (!tabExists) {
            this.tabList.push(this.createTab());
            this.selectedTabIndex = this.tabList.length - 1;
        }
    }

    render() {
        this.setTablist();
        return (
            <div className="vertical-box">
                {this.props.tabName}
                <Paper className="table-container">
                    <WorkableTabs tabList={this.tabList} selectedTabIndex={this.selectedTabIndex}/>
                </Paper>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HiringManagerHome);