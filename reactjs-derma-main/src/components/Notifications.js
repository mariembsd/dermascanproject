import React, { useState, useEffect } from 'react';
import { Badge, Button, ListGroup, Offcanvas } from 'react-bootstrap';

const Notifications = ({ userId }) => {
 const [notifications, setNotifications] = useState([]);
 const [show, setShow] = useState(false);

 const fetchNotifications = async () => {
  try {
   const res = await fetch(`http://localhost:5000/api/notifications/${userId}`);
   const data = await res.json();
   setNotifications(data);
  } catch (err) {
   console.error('Error fetching notifications:', err);
  }
 };

 // Long Polling: fetch every 5 seconds
 useEffect(() => {
  if (!userId) return;

  fetchNotifications();
  const interval = setInterval(fetchNotifications, 5000); // Poll every 5 seconds

  return () => clearInterval(interval); // Cleanup when component unmounts
 }, [userId]);

 const handleMarkAsRead = async (notificationId) => {
  try {
   await fetch(`http://localhost:5000/api/notifications/${notificationId}/read`, {
    method: 'PATCH',
   });
   fetchNotifications(); 
  } catch (err) {
   console.error('Error marking as read:', err);
  }
 };

 const unreadCount = notifications.filter(n => !n.isRead).length;

 return (
  <>
   {/* Notification Icon with Badge */}
   <Button variant="light" onClick={() => setShow(true)} className="position-relative">
    🔔
    {unreadCount > 0 && (
     <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
      {unreadCount}
     </Badge>
    )}
   </Button>

   {/* Notification Offcanvas */}
   <Offcanvas show={show} onHide={() => setShow(false)} placement="end">
    <Offcanvas.Header closeButton>
     <Offcanvas.Title>Notifications</Offcanvas.Title>
    </Offcanvas.Header>
    <Offcanvas.Body>
     {notifications.length === 0 && <p>No notifications yet.</p>}
     <ListGroup>
      {notifications.map((n) => (
       <ListGroup.Item key={n._id} className={n.isRead ? '' : 'fw-bold'}>
        {n.content}
        {!n.isRead && (
         <Button
          variant="link"
          size="sm"
          onClick={() => handleMarkAsRead(n._id)}
          style={{ float: 'right' }}
         >
          Mark as Read
         </Button>
        )}
       </ListGroup.Item>
      ))}
     </ListGroup>
    </Offcanvas.Body>
   </Offcanvas>
  </>
 );
};

export default Notifications;
