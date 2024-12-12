export const authSessions = new Map();

export const createSession = ({ userEmail, verificationCode }) => {
    authSessions.set(userEmail, verificationCode);
    console.log(authSessions)
};

export const getSession = (userEmail) => {
    return authSessions.get(userEmail);
};
