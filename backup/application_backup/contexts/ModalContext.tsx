"use client";

import { createContext } from "react";

export const ModalContext = createContext<{
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}>({
  isModalOpen: false,
  setIsModalOpen: () => {}
});
