import apiDispatcher from '../Dispatcher/apiDispatcher'; 


const apiStore = {
    user: null,
    async register(user, setMessage) {
        try {
            const result = await apiDispatcher.dispatch({ type: "REGISTER", payload: user });
            setMessage(result.message || "Register success");
        } catch (error) {
            setMessage(error.message || "Registration failed");
        }
    },
    async Login(user, setMessage) {
        try {
            const result = await apiDispatcher.dispatch({ type: "LOGIN", payload: user });
            setMessage(result.message || "Login success");
        } catch (error) {
            setMessage(error.message || "Login failed");
        }
    },
     async invoices(user, setMessage) {
        try {
            const result = await apiDispatcher.dispatch({ type: "INVOICES", payload: user });
            setMessage(result.message || "invoices success");
        } catch (error) {
            setMessage(error.message || "invoices failed");
        }
    }
};

export default apiStore;

