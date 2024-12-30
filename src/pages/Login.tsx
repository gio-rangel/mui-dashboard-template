import { useNavigate } from "react-router-dom"

export default function Login() {
    const navigate = useNavigate()

    return <>
        <h2>Login prximamente...</h2>
        <button onClick={() => navigate('/dashboard')}>Ir al dashboard</button>
    </>
}