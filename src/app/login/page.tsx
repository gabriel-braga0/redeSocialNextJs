import LoginForm from "../../../components/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      {/* Podes adicionar um logo ou título da tua rede social aqui, se quiseres */}
      {/* <h1 className="text-4xl font-bold text-white mb-8">Entrar na Rede Social</h1> */}
      <LoginForm />
    </div>
  );
}
