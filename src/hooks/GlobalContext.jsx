import React, { useContext } from "react";
import { GlobalContext } from "../components/Context/GlobalContext";

export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (context === null) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
}
