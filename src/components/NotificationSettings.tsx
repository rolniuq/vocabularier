'use client';

import { useState, useEffect } from 'react';
import { useNotification } from '@/hooks/useNotification';

interface NotificationSettingsProps {
  onClose?: () => void;
}

export function NotificationSettings({ onClose }: NotificationSettingsProps) {
  const [reminderTime, setReminderTime] = useState('09:00');
  const [isEnabled, setIsEnabled] = useState(false);

  const { isSupported, permission, requestPermission, showDailyReminder } = useNotification({
    dailyReminderTime: reminderTime,
    enabled: isEnabled,
  });

  // Load saved settings
  useEffect(() => {
    const savedTime = localStorage.getItem('reminderTime');
    const savedEnabled = localStorage.getItem('reminderEnabled');
    
    if (savedTime) setReminderTime(savedTime);
    if (savedEnabled) setIsEnabled(savedEnabled === 'true');
  }, []);

  // Save settings
  useEffect(() => {
    localStorage.setItem('reminderTime', reminderTime);
    localStorage.setItem('reminderEnabled', String(isEnabled));
  }, [reminderTime, isEnabled]);

  const handleEnableNotifications = async () => {
    if (permission.granted) {
      setIsEnabled(true);
    } else {
      const granted = await requestPermission();
      if (granted) {
        setIsEnabled(true);
      }
    }
  };

  const handleTestNotification = () => {
    showDailyReminder();
  };

  if (!isSupported) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Daily Reminders
        </h3>
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <p className="text-yellow-700 dark:text-yellow-400 text-sm">
            Notifications are not supported in your browser. Try using Chrome, Firefox, or Edge.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Daily Reminders
        </h3>
        <span className="text-2xl">🔔</span>
      </div>

      <div className="space-y-6">
        {/* Permission status */}
        {permission.denied && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <p className="text-red-700 dark:text-red-400 text-sm">
              Notifications are blocked. Please enable them in your browser settings.
            </p>
          </div>
        )}

        {/* Enable toggle */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900 dark:text-white">
              Enable daily reminders
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Get notified when it&apos;s time to practice
            </p>
          </div>
          <button
            onClick={() => {
              if (isEnabled) {
                setIsEnabled(false);
              } else {
                handleEnableNotifications();
              }
            }}
            disabled={permission.denied}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isEnabled
                ? 'bg-blue-500'
                : 'bg-gray-200 dark:bg-gray-700'
            } ${permission.denied ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Time picker */}
        {isEnabled && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Reminder time
              </label>
              <input
                type="time"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className="px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* Test button */}
            <button
              onClick={handleTestNotification}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm transition-colors"
            >
              Test Notification
            </button>
          </div>
        )}

        {/* Info */}
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-blue-700 dark:text-blue-400 text-sm">
            💡 Tip: Keep the app open in a browser tab to receive notifications. 
            For best results, add this app to your home screen.
          </p>
        </div>
      </div>
    </div>
  );
}
