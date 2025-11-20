// pages/AuthPage.jsx
import React, { useState } from "react";
import { BookHeart, Eye, EyeOff } from "lucide-react";

const AuthPage = ({ onLogin, themeHex, darkMode }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simular login bem-sucedido
    onLogin({
      name: formData.name || "Usuário Teste",
      email: formData.email,
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-gray-950">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-slate-200 dark:border-gray-800 p-8 shadow-2xl">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-white"
                style={{ backgroundColor: themeHex }}
              >
                <BookHeart size={32} />
              </div>
            </div>
            <h1 className="text-2xl font-bold mb-2">
              {isLogin ? "Bem-vindo de volta" : "Crie sua conta"}
            </h1>
            <p className="text-slate-600 dark:text-gray-400">
              {isLogin
                ? "Entre na sua conta para continuar"
                : "Comece sua jornada conosco"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Nome completo
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                  placeholder="Seu nome completo"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">E-mail</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                placeholder="seu@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Senha</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                  placeholder="Sua senha"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl text-white font-medium"
              style={{ backgroundColor: themeHex }}
            >
              {isLogin ? "Entrar" : "Criar conta"}
            </button>
          </form>

          <div className="text-center mt-6">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm hover:underline"
              style={{ color: themeHex }}
            >
              {isLogin ? "Criar uma conta" : "Já tenho uma conta"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
