'use client';

import { useEffect, useState, useCallback } from 'react';

interface NotificationPermission {
  granted: boolean;
  denied: boolean;
  default: boolean;
}

interface UseNotificationOptions {
  dailyReminderTime?: string; // Format: "HH:MM" (e.g., "09:00")
  enabled?: boolean;
}

export function useNotification(options: UseNotificationOptions = {}) {
  const { dailyReminderTime = '09:00', enabled = true } = options;
  const [permission, setPermission] = useState<NotificationPermission>({
    granted: false,
    denied: false,
    default: true,
  });
  const [isSupported, setIsSupported] = useState(false);

  // Check if notifications are supported
  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setIsSupported(true);
      updatePermissionState();
    }
  }, []);

  const updatePermissionState = () => {
    if (typeof window === 'undefined' || !('Notification' in window)) return;
    
    const perm = Notification.permission;
    setPermission({
      granted: perm === 'granted',
      denied: perm === 'denied',
      default: perm === 'default',
    });
  };

  const requestPermission = useCallback(async () => {
    if (!isSupported) return false;

    try {
      const result = await Notification.requestPermission();
      updatePermissionState();
      return result === 'granted';
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  }, [isSupported]);

  const showNotification = useCallback(
    (title: string, options?: NotificationOptions) => {
      if (!isSupported || !permission.granted) return null;

      try {
        const notification = new Notification(title, {
          icon: '/favicon.ico',
          badge: '/favicon.ico',
          ...options,
        });

        notification.onclick = () => {
          window.focus();
          notification.close();
        };

        return notification;
      } catch (error) {
        console.error('Error showing notification:', error);
        return null;
      }
    },
    [isSupported, permission.granted]
  );

  const showDailyReminder = useCallback(() => {
    return showNotification('Time to learn! 📚', {
      body: 'Your daily vocabulary practice is waiting. Keep your streak going!',
      tag: 'daily-reminder',
      requireInteraction: false,
    });
  }, [showNotification]);

  // Schedule daily reminder
  useEffect(() => {
    if (!enabled || !permission.granted || !isSupported) return;

    const checkAndNotify = () => {
      const now = new Date();
      const [targetHour, targetMinute] = dailyReminderTime.split(':').map(Number);
      
      // Check if it's the right time (within 1 minute window)
      if (now.getHours() === targetHour && now.getMinutes() === targetMinute) {
        // Check if we already showed a notification today
        const lastNotification = localStorage.getItem('lastDailyNotification');
        const today = now.toDateString();
        
        if (lastNotification !== today) {
          showDailyReminder();
          localStorage.setItem('lastDailyNotification', today);
        }
      }
    };

    // Check every minute
    const interval = setInterval(checkAndNotify, 60000);
    
    // Also check immediately
    checkAndNotify();

    return () => clearInterval(interval);
  }, [enabled, permission.granted, isSupported, dailyReminderTime, showDailyReminder]);

  return {
    isSupported,
    permission,
    requestPermission,
    showNotification,
    showDailyReminder,
  };
}
