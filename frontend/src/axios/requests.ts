import axios, { AxiosRequestConfig } from "axios";
import axiosInstance from "./axiosInstance";

export default class Requests {


    public static async getRequest<T>(path: string, configuration?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await axiosInstance.get<T>(
                path, 
                configuration
            );
            
            return response.data;

        } catch (error: any) {
            
            if(axios.isAxiosError(error)) {
                console.error(`Axios Error => ${error.response?.data}`);

                if(error.response && error.response.data) {
                    return error.response?.data;
                }
            }

            console.log(`An error ocurred => ${error.message}`);

            return {} as T;
        }
    }

    public static async postRequest<T>(path: string, payload: any, configuration?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await axiosInstance.post<T>(
                path, 
                payload,
                configuration
            );
            
            return response.data;

        } catch (error: any) {

            if(axios.isAxiosError(error)) {
                console.error(`Axios Error => ${error.response?.data}`);

                if(error.response && error.response.data) {
                    return error.response?.data;
                }
            }

            console.log(`An error ocurred => ${error.message}`);
            return {} as T;
        }
    }

    public static async deleteRequest<T>(path: string, configuration?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await axiosInstance.delete<T>(
                path,
                configuration
            );

            return response.data;

        } catch (error: any) {

            if(axios.isAxiosError(error)) {
                console.error(`Axios Error => ${error.response?.data}`);

                if(error.response && error.response.data) {
                    return error.response?.data;
                }
            }

            console.log(`An error ocurred => ${error.message}`);
            return {} as T;
        }
    }

    public static async putRequest<T>(path: string, payload: any, configuration?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await axiosInstance.put<T>(
                path, 
                payload, 
                configuration
            );
            
            return response.data;

        } catch (error: any) {

            if(axios.isAxiosError(error)) {
                console.error(`Axios Error => ${error.response?.data}`);

                if(error.response && error.response.data) {
                    return error.response?.data;
                }
            }

            console.log(`An error ocurred => ${error.message}`);
            return {} as T;
        }
    }

}