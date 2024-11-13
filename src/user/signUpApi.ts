import {Session, SessionCallback, ErrorCallback, User} from "../model/common";
import {CustomError} from "../model/CustomError";
import { useNavigate } from 'react-router-dom';
export function signUpUser(user: User, onError: ErrorCallback, navigate: (path: string) => void) {
    
    fetch("/api/signup",
        {
            method: "POST", // ou 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        }).then(async (response) => {
            if (response.ok) {
                navigate('/');
                console.log("Good inscription");
            } else {
                const error = await response.json() as CustomError;
                onError(error);
            }
        });
        
}