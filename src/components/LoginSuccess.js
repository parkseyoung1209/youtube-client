import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LoginSuccess = () => {
    
    const navigate = useNavigate();
    // url에서 토큰 추출
    useEffect(() => {
        const url = new URLSearchParams(window.location.search);
        const token = url.get("token");
   
    // 토큰 로컬스토리지에 저장
        localStorage.setItem("token", token);
    // 메인 페이지로 이동
    navigate("/");
}, []);
    return null;
}
export default LoginSuccess;