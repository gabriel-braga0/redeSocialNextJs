// context/ThemeContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  // Poderíamos expandir para theme: 'light' | 'dark' | 'system' como sugeri antes,
  // mas vamos manter 'isDark' por enquanto, que é o que já tens.
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = "app-theme"; // Para consistência com a sugestão anterior

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState<boolean>(() => {
    // Tenta carregar do localStorage na inicialização
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      return storedTheme === "dark";
    }
    // Se não houver nada no localStorage, podes definir um padrão
    // ou verificar a preferência do sistema (mais avançado)
    // Por agora, vamos começar com o tema claro se nada estiver guardado.
    return false;
  });

  // Efeito para aplicar a classe 'dark' ao HTML e guardar no localStorage
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem(THEME_STORAGE_KEY, "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem(THEME_STORAGE_KEY, "light");
    }
  }, [isDark]); // Este useEffect é suficiente, o duplicado foi removido.

  const toggleTheme = useCallback(() => {
    setIsDark((prevIsDark) => !prevIsDark);
  }, []);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme deve ser usado dentro de um ThemeProvider");
  }
  return context;
}
