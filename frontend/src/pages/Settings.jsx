import React from "react";
import {
  Settings as SettingsIcon,
  Moon,
  Sun,
  Bell,
  Shield,
  Palette,
} from "lucide-react";

export default function Settings({ darkMode, setDarkMode, themeHex }) {
  return (
    <div
      className={`rounded-[2.5rem] p-8 shadow-sm transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-gray-300" : "bg-white text-slate-600"
      }`}
    >
      <h2
        className={`text-3xl font-bold mb-8 flex items-center gap-3`}
        style={{ color: themeHex }}
      >
        <SettingsIcon size={28} /> Configurações
      </h2>

      <div className="space-y-8">
        {/* Seção de Aparência */}
        <section>
          <h3
            className={`text-xl font-bold mb-4 flex items-center gap-2 ${
              darkMode ? "text-gray-100" : "text-slate-800"
            }`}
          >
            <Palette size={20} className="opacity-70" /> Aparência
          </h3>
          <div
            className={`p-5 rounded-2xl flex items-center justify-between ${
              darkMode ? "bg-gray-800" : "bg-slate-50"
            }`}
          >
            <div>
              <p
                className={`font-medium ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}
              >
                Modo Escuro
              </p>
              <p className="text-sm opacity-70">
                Alterne entre temas claros e escuros.
              </p>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative w-16 h-9 rounded-full p-1 transition-colors duration-300 flex items-center ${
                !darkMode ? "bg-slate-300" : ""
              }`}
              style={{ backgroundColor: darkMode ? themeHex : undefined }}
            >
              <div
                className={`w-7 h-7 rounded-full bg-white shadow-md transform transition-transform duration-300 flex items-center justify-center ${
                  darkMode ? "translate-x-7" : ""
                }`}
              >
                {darkMode ? (
                  <Moon size={14} className="text-slate-700" />
                ) : (
                  <Sun size={14} className="text-yellow-500" />
                )}
              </div>
            </button>
          </div>
        </section>

        {/* Seção de Notificações (Exemplo) */}
        <section>
          <h3
            className={`text-xl font-bold mb-4 flex items-center gap-2 ${
              darkMode ? "text-gray-100" : "text-slate-800"
            }`}
          >
            <Bell size={20} className="opacity-70" /> Notificações
          </h3>
          <div
            className={`divide-y ${
              darkMode ? "divide-gray-700" : "divide-slate-200"
            }`}
          >
            <div className="py-4 flex items-center justify-between">
              <p className="font-medium">Alertas de Group Order (GO)</p>
              <input
                type="checkbox"
                defaultChecked
                className="toggle"
                style={{ accentColor: themeHex }}
              />
            </div>
            <div className="py-4 flex items-center justify-between">
              <p className="font-medium">Novos itens na Wishlist</p>
              <input
                type="checkbox"
                defaultChecked
                className="toggle"
                style={{ accentColor: themeHex }}
              />
            </div>
          </div>
        </section>

        {/* Seção de Conta */}
        <section>
          <h3
            className={`text-xl font-bold mb-4 flex items-center gap-2 ${
              darkMode ? "text-gray-100" : "text-slate-800"
            }`}
          >
            <Shield size={20} className="opacity-70" /> Conta
          </h3>
          <div className="space-y-3">
            <button
              className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-colors ${
                darkMode
                  ? "bg-gray-800 hover:bg-gray-700 text-white"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700"
              }`}
            >
              Alterar Senha
            </button>
            <button
              className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-colors ${
                darkMode
                  ? "bg-gray-800 hover:bg-gray-700 text-white"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700"
              }`}
            >
              Gerenciar E-mails Conectados
            </button>
            <button className="w-full text-left px-4 py-3 rounded-xl font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors">
              Excluir Conta
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
