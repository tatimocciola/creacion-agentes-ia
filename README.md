# Personal Stylist Agent

## Qué construí
Una demo web mobile-first que ayuda a elegir un outfit para hoy o mañana en menos de un minuto. Usa un inventario confirmado, clima simulado y reglas determinísticas para proponer tres looks comparables sin servicios externos.

## Cómo se lo pedí
Se definió un perfil casual prolijo, smart casual y urbano, una paleta neutra y un inventario inicial. La implementación se acotó a Next.js, TypeScript, Tailwind CSS y datos locales, sin autenticación, APIs, IA ni base de datos.

## Qué funciona
- Selector Hoy/Mañana con escenarios climáticos simulados de CABA.
- Contexto rápido, formalidad, comodidad y preferencia opcional.
- Tres recomendaciones distintas: Básica, Jugada e Inesperada.
- Moodboard responsive con prendas, paletas y texturas.
- Reglas de lluvia que excluyen prendas sensibles al agua.
- Selección, checklist, preview local de foto y feedback guardado en `localStorage`.

### Ejecutar localmente

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000). No se necesitan variables de entorno.

### Verificaciones

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Qué falta o qué falló
El clima y el inventario son locales. La foto solo se previsualiza durante la sesión. Clima real, persistencia remota, almacenamiento de imágenes y recomendaciones con IA quedan para una versión posterior.

## Qué aprendí
Separar los contratos, las reglas y la interfaz permite demostrar el producto sin bloquearlo por infraestructura. Las restricciones duras —inventario confirmado y compatibilidad con lluvia— conviene resolverlas con código determinístico, incluso si más adelante una IA mejora la creatividad de las propuestas.
