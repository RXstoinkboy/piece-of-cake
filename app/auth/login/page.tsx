import { LoginForm } from "@/components/molecules/login-form";
import { CakeSlice } from "lucide-react";

export default function Login() {
  return (
    <div>
      <section className="flex flex-col items-center justify-center py-14">
        <CakeSlice size={80} className="stroke-cyan-100" />
      </section>
      <LoginForm mode="login" />
    </div>
  );
}
