import { useState } from "react"

import { LoginForm } from "@/components/login-form"
import { toast } from "sonner"


import { LoginResponseVo, LoginVo, LoginVoKeys } from "@app/server/src/api/sys/auth"
import { Result } from "@app/server/src/types"
import { fetchSysAuthLogin } from "@/api/sys/auth";

import { useMutation } from "@tanstack/react-query";


export default function Page() {

  const [loginData, setLoginData] = useState<LoginVo>({
    username: "",
    password: ""
  })

  // 使用 useMutation 来执行登录操作
  const { mutate, isPending: loginPending } = useMutation<Result<LoginResponseVo>, Error, LoginVo>({
    mutationFn: fetchSysAuthLogin,
    onSuccess: (res) => {
      const { message, data } = res
      toast("Success", {
        description: "Login is" + message,
        action: {
          label: "Ok",
          onClick: () => console.log("Undo"),
        },
      })
    },
    onError: (error) => {
      // 处理登录失败时的错误信息
      console.error('Login failed:', error.message);
    },
  })

  const handleChange = (key: LoginVoKeys, value: string) => {
    setLoginData(prevData => ({
      ...prevData,
      [key]: value
    }))
  }

  const handleLogin = () => {
    // 1.Call the login interface
    mutate(loginData)
  }

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <LoginForm loginLoading={loginPending} loginData={loginData} onChange={handleChange} onLogin={handleLogin} />
    </div>
  )
}
