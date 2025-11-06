import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchNotifications,
  markAllNotificationsRead,
} from "../actions/notificationActions";
import { Bell } from "lucide-react";

const NotificationDropdown = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { items: notifications } = useSelector((state) => state.notifications);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const toggleDropdown = () => setOpen(!open);
  const handleMarkAllRead = () => dispatch(markAllNotificationsRead());

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="relative p-2 rounded-full hover:bg-gray-100 focus:outline-none"
      >
        <Bell className="w-6 h-6 text-gray-700" />
        {notifications.some((n) => !n.is_read) && (
          <span className="absolute top-1 right-1 block w-2 h-2 bg-red-500 rounded-full"></span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-lg border border-gray-200 z-50">
          <div className="flex justify-between items-center px-4 py-2 border-b">
            <span className="font-semibold text-gray-800">Notifications</span>
            <button
              className="text-sm text-blue-500 hover:underline"
              onClick={handleMarkAllRead}
            >
              Mark all read
            </button>
          </div>

          <div className="max-h-64 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No notifications yet
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  className={`px-4 py-2 border-b last:border-none ${
                    n.is_read ? "bg-white" : "bg-blue-50"
                  }`}
                >
                  <p className="text-sm text-gray-800">{n.content}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(n.created_at).toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
