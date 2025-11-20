import React from "react";
import { User, Star } from "lucide-react";

export default function Profile({ darkMode, themeHex }) {
  return (
    <div
      className={`rounded-[2.5rem] p-8 shadow-sm transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-gray-300" : "bg-white text-slate-600"
      }`}
    >
      <h2
        className={`text-3xl font-bold mb-6 flex items-center gap-3`}
        style={{ color: themeHex }}
      >
        <User size={28} /> Meu Perfil
      </h2>

      <div className="space-y-4">
        <p>
          Bem-vindo ao seu painel pessoal! Esta área é para gerenciar sua conta,
          vendedores preferidos e resumos da coleção.
        </p>

        <div
          className={`p-4 rounded-2xl flex items-center gap-3 ${
            darkMode ? "bg-gray-800" : "bg-slate-50"
          }`}
        >
          <Star
            size={24}
            style={{ color: themeHex, fill: themeHex, fillOpacity: 0.2 }}
          />
          <div>
            <p className="text-sm opacity-70">Nível de Colecionador Atual</p>
            <p
              className={`text-lg font-bold ${
                darkMode ? "text-white" : "text-slate-900"
              }`}
            >
              StayNeverland de Elite
            </p>
          </div>
        </div>

        <div className="pt-6 space-y-4">
          <h3
            className={`text-xl font-bold ${
              darkMode ? "text-gray-100" : "text-slate-800"
            }`}
          >
            Resumo de Estatísticas
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div
              className={`p-4 rounded-2xl text-center ${
                darkMode ? "bg-gray-800" : "bg-slate-50"
              }`}
            >
              <p
                className={`text-2xl font-bold ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}
                style={{ color: themeHex }}
              >
                342
              </p>
              <p className="text-xs opacity-70">Photocards Coletados</p>
            </div>
            <div
              className={`p-4 rounded-2xl text-center ${
                darkMode ? "bg-gray-800" : "bg-slate-50"
              }`}
            >
              <p
                className={`text-lg font-bold ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}
              >
                Stray Kids
              </p>
              <p className="text-xs opacity-70">Grupo Favorito</p>
            </div>
            <div
              className={`p-4 rounded-2xl text-center ${
                darkMode ? "bg-gray-800" : "bg-slate-50"
              }`}
            >
              <p
                className={`text-lg font-bold ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}
              >
                R$ 6.447,50
              </p>
              <p className="text-xs opacity-70">Total Investido</p>
            </div>
          </div>
        </div>

        <div className="pt-6">
          <button
            className={`px-6 py-3 rounded-2xl font-semibold text-white transition-transform hover:scale-105 active:scale-95 shadow-lg`}
            style={{
              backgroundColor: themeHex,
              boxShadow: `0 10px 20px -10px ${themeHex}66`,
            }}
          >
            Editar Perfil Público
          </button>
        </div>
      </div>
    </div>
  );
}
