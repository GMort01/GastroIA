import React, { createContext, useMemo, useState } from 'react';

export const ProfileContext = createContext({
  dietType: 'carnivoro',
  allergyInput: '',
  allergies: [],
  setDietType: () => {},
  setAllergyInput: () => {},
});

export function ProfileProvider({ children }) {
  const [dietType, setDietType] = useState('carnivoro');
  const [allergyInput, setAllergyInput] = useState('');

  const allergies = useMemo(
    () =>
      allergyInput
        .split(',')
        .map((allergy) => allergy.trim().toLowerCase())
        .filter(Boolean),
    [allergyInput]
  );

  return (
    <ProfileContext.Provider
      value={{
        dietType,
        allergyInput,
        allergies,
        setDietType,
        setAllergyInput,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}
