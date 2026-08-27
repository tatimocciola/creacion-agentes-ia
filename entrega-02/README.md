# Personal Stylist Agent — Entrega 02

## Qué construí

Documenté el contrato y la evaluación del **Personal Stylist Agent** para la tarea recurrente: “Recomendar qué outfit usar según ocasión, formalidad, comodidad, clima e inventario disponible”. La entrega separa el system prompt del pedido reutilizable del usuario y registra tres corridas comparables con dos iteraciones controladas de mejora.

El agente produce exactamente tres alternativas —Básica, Jugada e Inesperada— usando solo IDs del inventario provisto. La documentación no incorpora APIs, autenticación, Supabase, persistencia remota ni capacidades diferentes de la demo implementada.

## Cómo se lo pedí

Los siguientes son textualmente los prompts principales utilizados. Sus versiones completas, con el formato y los ejemplos, están en [`system_prompt.md`](./system_prompt.md) y [`user_prompt.md`](./user_prompt.md).

### System prompt utilizado

> Sos **Personal Stylist Agent**, un asistente de estilo personal. Tu criterio combina practicidad, coherencia visual y comodidad. Tu objetivo es reducir el esfuerzo de decidir qué ponerse, no exhibir creatividad a costa de las necesidades de la persona.
>
> Recibís en cada pedido el día, el clima, la ocasión, el nivel de formalidad, la prioridad de comodidad, una preferencia especial opcional y un inventario disponible. El inventario provisto es la única fuente de verdad sobre las prendas que posee la persona.
>
> Recomendá exactamente tres outfits completos y genuinamente diferentes: BÁSICA, JUGADA e INESPERADA. Usá exclusivamente ítems presentes en `inventario_disponible` y copialos con su `id` exacto. No inventes, completes ni des por poseída ninguna prenda, atributo o propiedad que no figure en el inventario.
>
> Si hay lluvia, piso mojado o alta probabilidad de precipitación, excluí como capa exterior todo ítem con `sensible_al_agua: sí` o `apto_lluvia: no`; aplicá el mismo criterio al calzado expuesto. Si la aptitud es desconocida, no afirmes que la prenda es impermeable y declaralo en la verificación climática.
>
> Respondé únicamente con las secciones `CONTEXTO INTERPRETADO`, `BÁSICA`, `JUGADA` e `INESPERADA`. En cada alternativa conservá los campos prendas, calzado, abrigo, cartera, accesorios, paleta, texturas, por_qué_funciona, compatibilidad_climática, verificación_inventario y adaptación_día_noche. En `compatibilidad_climática`, vinculá condición concreta → atributo concreto → decisión tomada. En `verificación_inventario`, enumerá todos los IDs usados.

### User prompt utilizado

```text
Necesito resolver qué outfit usar con los siguientes datos:

día: "{{hoy | mañana | fecha}}"
clima:
  descripción: "{{condición general}}"
  temperatura_mínima: "{{valor y unidad}}"
  temperatura_máxima: "{{valor y unidad}}"
  probabilidad_lluvia: "{{porcentaje}}"
  humedad: "{{porcentaje o no informado}}"
ocasión: "{{actividad o combinación de actividades}}"
formalidad: "{{relajada | prolija | formal}}"
prioridad_comodidad: "{{normal | alta | sensible al frío | otra}}"
preferencia_especial: "{{preferencia o ninguna}}"
inventario_disponible:
  - id: "{{id único}}"
    nombre: "{{nombre confirmado}}"
    categoría: "{{categoría}}"
    color: "{{color}}"
    material: "{{material o no informado}}"
    textura: "{{textura o no informada}}"
    formalidad: "{{nivel}}"
    comodidad: "{{nivel}}"
    apto_lluvia: "{{sí | no | desconocido}}"
    sensible_al_agua: "{{sí | no | desconocido}}"

Aplicá el contrato del Personal Stylist Agent y devolvé exactamente las tres alternativas en su formato establecido. No uses prendas fuera de inventario_disponible.
```

## Qué funciona

Se construyó y ejecutó una demo local del Personal Stylist Agent. Su flujo permite elegir Hoy o Mañana, ingresar un contexto rápido y generar tres recomendaciones a partir de un inventario confirmado y escenarios de clima simulados. También permite comparar paletas y texturas, elegir un outfit, completar un checklist, previsualizar localmente una foto y guardar feedback textual en el dispositivo.

En esta entrega académica:

- el system prompt identifica explícitamente Rol, Contexto, Tarea, Restricciones, Formato y Ejemplos;
- el user prompt permite sustituir variables sin alterar el contrato;
- las tres corridas conservan exactamente las mismas cuatro secciones y los mismos campos de salida;
- los IDs vuelven auditable que no se inventaron prendas;
- las reglas de lluvia vuelven determinística la exclusión de materiales sensibles.

## Qué falta o qué falló

Al ejecutar la demo en GitHub Codespaces apareció el error:

```text
Cannot find native binding. npm has a bug related to optional dependencies.
```

Se resolvió deteniendo el servidor, eliminando `node_modules` y `package-lock.json`, ejecutando `npm install` nuevamente y reiniciando `npm run dev`. Fue un problema de instalación de dependencias opcionales del entorno, no una integración externa de la aplicación.

La versión actual sigue usando clima e inventario simulados. La foto tiene preview local y no se persiste. La documentación de esta entrega evalúa respuestas escritas y no afirma aprendizaje automático, análisis visual, clima real ni almacenamiento remoto.

## Iteraciones de mejora

### Iteración 1

**ANTES** → La restricción decía de forma genérica: “Respetá el clima y elegí materiales adecuados”.

**PROBLEMA TEXTUAL** → En la Corrida 1 apareció: “`abrigo: [bomber_camel — Bomber Rita Ora camel]`”, aun cuando la entrada indicaba lluvia 80%, `apto_lluvia: no` y `sensible_al_agua: sí`.

**PIEZA MODIFICADA** → Restricciones, y solamente Restricciones.

**CAMBIO** → Se agregó una regla explícita para excluir como exterior las prendas sensibles al agua o no aptas para lluvia. Una aptitud desconocida tampoco puede describirse como impermeable.

**DESPUÉS** → La Corrida 2 aplica el contrato actualizado. En futuros escenarios lluviosos, la bomber camel y el corderoy sensible quedan fuera de las capas exteriores.

### Iteración 2

**ANTES** → El formato admitía afirmaciones breves de compatibilidad sin exigir evidencia.

**PROBLEMA TEXTUAL** → En la Corrida 2 aparecieron “`compatibilidad_climática: adecuada`” y “`compatibilidad_climática: compatible`”, que no permiten auditar qué condición ni qué atributo se evaluó.

**PIEZA MODIFICADA** → Formato, y solamente Formato.

**CAMBIO** → Sin alterar los campos, se exigió escribir condición concreta → atributo concreto → decisión tomada, además de enumerar todos los IDs en la verificación de inventario.

**DESPUÉS** → La Corrida 3 mantiene la misma estructura, pero cada opción explica la relación entre pronóstico, atributo de la prenda y decisión. Así se puede comparar el resultado sin cambiar simultáneamente otra pieza del contrato.

## Qué aprendí

Separar el system prompt del user prompt ayuda a distinguir las reglas estables del agente de los datos variables de cada día. Las restricciones explícitas reducen comportamientos inesperados: “respetar el clima” fue demasiado ambiguo hasta convertirlo en una regla verificable sobre lluvia y materiales.

También comprobé que un formato estable permite comparar corridas sin confundir una mejora de contenido con un cambio de presentación. Finalmente, iterar una sola pieza por vez permite atribuir el resultado al cambio realizado: primero se corrigió Restricciones y después Formato, manteniendo intactas las demás partes en cada paso.
