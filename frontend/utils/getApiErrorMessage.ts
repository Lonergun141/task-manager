import { isAxiosError } from "axios";

export default function getApiErrorMessage(
    error: unknown,
    fallback: string
) {
    if (isAxiosError(error)) {
        if (error.code === "ERR_NETWORK" || !error.response) {
            return "Unable to connect to the server. Please check your connection or try again later.";
        }

        const responseData = error.response.data;

        if (
            responseData &&
            typeof responseData === "object" &&
            "detail" in responseData &&
            typeof responseData.detail === "string"
        ) {
            return responseData.detail;
        }

        if (typeof responseData === "string" && responseData.trim()) {
            return responseData;
        }

        if (error.message) {
            return error.message;
        }
    }

    if (error instanceof Error && error.message) {
        return error.message;
    }

    return fallback;
}
