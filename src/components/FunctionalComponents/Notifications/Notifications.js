import React, { Component } from 'react';
import './Notifications.css';
import { getData } from "../../../js/mocks/GetData";
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';

class Notifications extends Component {
    constructor(props){
        super(props);
        this.state = {
            notifications: getData('notifications') || []
        };
    }

    addNotifications() {
        this.state.notifications.forEach((notification, index) => {
            store.addNotification({
                title: `Notification ${index+1}`,
                message: notification.name,
                type: notification.status === "completed" ? "success" : (notification.status === "new" ? "info" : "warning"),
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                  duration: 0,
                  onScreen: true
                }
            });
        });
    }

    componentDidMount(){
        setTimeout(() => {
            this.addNotifications();
        }, 3000);
        
    }

    render(){
        return (
            <ReactNotification />
        )
    }

}

export default Notifications;
