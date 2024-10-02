import Input from "../../components/Input";
import { signup } from "../../api/member";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  /* 각각 따로
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); */

  // json으로 한꺼번에
  const [member, setMember] = useState({
      id: "",
      password : "",
      email : "",
      phone: "",
  });
  const submit = async () => {
    const result = await signup(member);
    if(result.status === 200) {
      alert("회원가입 성공");
      navigate("/login");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-md max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-8">회원가입</h1>
        <div>
          <Input label="아이디" type="text"
          placeholder="아이디를 입력해주세요"
          value={member.id}
          change={(e) => setMember({...member, id : e.target.value})}
          />
          <Input label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={member.password}
            change={(e) => setMember({...member, password : e.target.value})}
          />
          <Input label="이메일"
            type="email"
            placeholder="이메일을 입력해주세요"
            value={member.email}
            change={(e) => setMember({...member, email : e.target.value})}
          />
          <Input
            label="전화번호"
            type="tel"
            placeholder="전화번호를 입력해주세요"
            value={member.phone}
            change={(e) => setMember({...member, phone : e.target.value})}
          />
          <button
            type="button"
            className="bg-black text-white w-full py-3 font-bold rounded hover:bg-red-600"
            onClick={submit}
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
