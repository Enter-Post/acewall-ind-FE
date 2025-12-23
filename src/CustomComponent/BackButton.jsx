// src/components/BackButton.jsx

import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button"; // Adjust path if needed

const BackButton = ({ label = "Back", className = "" }) => {
  const navigate = useNavigate();

  return (
    <Button
      variant="outline"
      onClick={() => navigate(-1)}
      className={`flex items-center gap-2 ${className}`}
      // 1. Explicit ARIA label for clarity, using the passed label
      aria-label={`${label} to previous page`}
      // 2. Keyboard support is inherently provided by the <Button> element.
    >
      {/* 3. Icon is decorative, hide from screen readers */}
      <ArrowLeft size={16} aria-hidden="true" />
      {label}
    </Button>
  );
};

export default BackButton;