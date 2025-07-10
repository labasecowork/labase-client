import type {
    ChangePasswordData,
    ForgotPasswordData,
    LoginCredentials,
    LoginResponse,
    RegisterData,
} from "./auth.types";
import { axiosInstance } from "@/lib/axios";
import { isAxiosError, AxiosError } from "axios";
import { getErrorMessageByStatus } from "@/utilities/error_utilities";
import type { ErrorResponse } from "@/types";

// Helper error message 
const getErrorMessage = (error: unknown) => {
    if (isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        return getErrorMessageByStatus(axiosError.response?.status, axiosError);
    }
    return "An unexpected error occurred.";
};

// --- Login ---
export const login = async (
    credentials: LoginCredentials
): Promise<LoginResponse> => {
    try {
        const { data } = await axiosInstance.post<{ data: LoginResponse }>(
            "/auth/login",
            credentials
        );
        return data.data;
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};

// --- Register ---
export const requestRegister = async (registerData: RegisterData) => {
    try {
        const { data } = await axiosInstance.post(
            "/auth/register/request",
            registerData
        );
        return data;
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};

export const verifyCode = async (code: string, email: string) => {
    try {
        const { data } = await axiosInstance.post("/auth/register/verify-code", {
            code,
            email,
        });
        return data;
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};

// --- Password Reset ---
export const requestPasswordReset = async (resetData: ForgotPasswordData) => {
    try {
        const { data } = await axiosInstance.post(
            "/auth/password-reset/request",
            resetData
        );
        return data;
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};

export const verifyPasswordResetCode = async (code: string, email: string) => {
    try {
        const { data } = await axiosInstance.post(
            "/auth/password-reset/verify-code",
            { code, email }
        );
        return data;
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};

export const confirmNewPassword = async (
    confirmData: ChangePasswordData & { email: string }
) => {
    try {
        const { data } = await axiosInstance.post(
            "/auth/password-reset/confirm",
            confirmData
        );
        return data;
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
}; 