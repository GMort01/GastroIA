import React, { createContext, useContext, useMemo, useState } from 'react';
import { lightTheme, darkTheme } from '../theme/colors';

export const SettingsContext = createContext({
  darkMode: false,
  notificationsEnabled: true,
  setDarkMode: () => {},
  setNotificationsEnabled: () => {},
  theme: lightTheme,
});

export function SettingsProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const theme = useMemo(() => (darkMode ? darkTheme : lightTheme), [darkMode]);

  return (
    <SettingsContext.Provider
      value={{
        darkMode,
        notificationsEnabled,
        setDarkMode,
        setNotificationsEnabled,
        theme,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
