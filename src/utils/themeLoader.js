export const loadTheme = (theme) => {
  const id = "dynamic-theme";

  // Elimina el tema anterior si existe
  const existing = document.getElementById(id);
  if (existing) {
    existing.remove();
  }

  // Crea un nuevo link con el nuevo tema
  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = `/themes/theme-${theme}.css`; // ← nota: debe estar en /public
  document.head.appendChild(link);
};