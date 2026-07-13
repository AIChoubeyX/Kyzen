import api from "../../utils/axios";

const getCurrentUser = async () => {
    try {
        const { data } = await api.get("/api/me");
        return data;
    }
    catch (error) {
        console.error("Error fetching current user:", error);
        throw error;
    }
}

export default getCurrentUser;