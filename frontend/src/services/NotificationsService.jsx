import api from "./api"

const NotificationsService = {

    getAllNotifications() {
        
        return api().get("/notifications");
    },

    updateNotificationStatus(id) {
        return api().put(`notifications/${id}`);
     
    }
    
};

export default NotificationsService;