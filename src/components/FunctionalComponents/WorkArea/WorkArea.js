import React, {Component} from 'react';
import { connect } from "react-redux";

import HiringManagerHome from "../HiringManagerHome/HiringManagerHome";

const mapStateToProps = state => {
    return {
        tabName: state.tabName,
        role: state.role
    };
};  

class WorkArea extends Component {
    
    render() {
        // #TODO: Add VendorManagerHome
        return this.props.role ? <HiringManagerHome/> : <HiringManagerHome/>;
        // return (<h1>abcd</h1>)
    }
}

export default connect(mapStateToProps)(WorkArea);