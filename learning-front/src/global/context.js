import { createContext, useState, useContext } from 'react';

const enrollment_flag = createContext();

export const EnrollmentStateProvider = ({ children }) => {
    const [isEnrolled, setIsEnrolled] = useState(true);

    return (
        <enrollment_flag.Provider value={{ isEnrolled, setIsEnrolled }}>
            {children}
        </enrollment_flag.Provider>
    );
};

export const useEnrollmentState = () => {
    return useContext(enrollment_flag);
};