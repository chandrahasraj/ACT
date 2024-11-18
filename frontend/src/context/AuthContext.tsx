import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (username: string, role: string, token: string) => void;
    logout: () => void;
    validateToken: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [lastActivityTime, setLastActivityTime] = useState<number>(Date.now());

    // Define inactivity timeout duration (10 minutes)
    const INACTIVITY_TIMEOUT = 10 * 60 * 1000;

    useEffect(() => {
        // User activity handler
        const handleUserActivity = () => {
            setLastActivityTime(Date.now());
            updateTokenExpiration();
        };

        // Add activity listeners
        const activityEvents = ['mousemove', 'keypress', 'scroll', 'click'];
        activityEvents.forEach((event) =>
            window.addEventListener(event, handleUserActivity)
        );

        // Interval to check inactivity
        const intervalId = setInterval(() => {
            if (Date.now() - lastActivityTime > INACTIVITY_TIMEOUT) {
                console.log('User inactive, logging out');
                logout();
            }
        }, 1000);

        return () => {
            // Cleanup listeners and interval
            activityEvents.forEach((event) =>
                window.removeEventListener(event, handleUserActivity)
            );
            clearInterval(intervalId);
        };
    }, [lastActivityTime]);

    useEffect(() => {
        const validateAndSetAuth = async () => {
            const isValid = await validateToken();
            setIsAuthenticated(isValid);
        };

        validateAndSetAuth();
    }, []);

    // Update token expiration in localStorage
    const updateTokenExpiration = () => {
        const newExpirationTime = Date.now() + INACTIVITY_TIMEOUT;
        localStorage.setItem('authTokenExpiration', newExpirationTime.toString());
    };

    // Login function
    const login = (username: string, role: string, token: string) => {
        const expirationTime = Date.now() + INACTIVITY_TIMEOUT;

        localStorage.setItem('authToken', token);
        localStorage.setItem('authTokenExpiration', expirationTime.toString());
        localStorage.setItem('username', username);
        localStorage.setItem('role', role);
        setIsAuthenticated(true);
        console.log('Logged in:', { username, role });
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('authTokenExpiration');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        setIsAuthenticated(false);
        console.log('Logged out');
    };

    // Validate token function
    const validateToken = async (): Promise<boolean> => {
        const token = localStorage.getItem('authToken');
        const expirationTime = localStorage.getItem('authTokenExpiration');

        console.log('Token in localStorage:', token);
        console.log('Expiration Time in localStorage:', expirationTime);

        if (token && expirationTime) {
            const now = Date.now();
            const expiry = parseInt(expirationTime, 10);
            if (now < expiry) {
                console.log('Token is valid');
                return true;
            } else {
                console.log('Token expired, logging out');
                logout();
                return false;
            }
        } else {
            console.log('No token found, logging out');
            logout();
            return false;
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, validateToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
