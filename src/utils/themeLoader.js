export const loadTheme = (theme) => {
  const root = document.documentElement;
  if (theme === "femenino") {
    root.style.setProperty("--primary", "#e91e63");
    root.style.setProperty("--background", "#fff0f5");
    root.style.setProperty("--card-bg", "#ffe4ec");
    root.style.setProperty("--accent-color", "#a6005e");
    root.style.setProperty("--text-color", " #4a4a4a");
  } else {
    root.style.setProperty("--primary", "#2196f3");
    root.style.setProperty("--background", "#f0f8ff");
    root.style.setProperty("--card-bg", "#e0f2f1");
    root.style.setProperty("--accent-color", "#001f3f");
  }
};
