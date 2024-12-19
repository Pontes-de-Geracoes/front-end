# Ponte de Gerações | Front-end

O site desenvolvido busca conectar idosos necessiatados a pessoas que querem ajudar. Essa conexão é feita através do match entre necessidades dos idosos e habilidades dos voluntários.

## Página Home

![image](https://github.com/user-attachments/assets/553560df-7ef5-424d-a14c-3bb3eb66072c)

## Página de Cadastro

![image](https://github.com/user-attachments/assets/1f1f21ac-ad5e-4095-b08b-b5c5accdb895)

## Página de Login

![image](https://github.com/user-attachments/assets/1cce19ee-1287-4cb6-b8a3-8092a078f9c1)

## Página de Conexões

![image](https://github.com/user-attachments/assets/20069efb-8f3d-4075-9c0f-5083497aad4a)

## Página de Perfil

![image](https://github.com/user-attachments/assets/94f263f1-d02f-4069-9b49-4aa4a4e5d344)

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
