import type { Metadata } from "next";
import ContractBuilder from "@/components/ui/contract-builder";

export const metadata: Metadata = {
  title: "Devis — Klinkr",
  description: "Estimez le coût de votre projet web sur-mesure avec notre configurateur interactif.",
};

export default function ContractPage() {
  return <ContractBuilder />;
}
