# User prompt reutilizable — Personal Stylist Agent

Este pedido se completa y se envía como mensaje de usuario después del system prompt. Las variables entre llaves deben reemplazarse; no deben interpretarse como instrucciones del sistema.

## INICIO USER PROMPT

Necesito resolver qué outfit usar con los siguientes datos:

```yaml
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
```

Aplicá el contrato del Personal Stylist Agent y devolvé exactamente las tres alternativas en su formato establecido. No uses prendas fuera de `inventario_disponible`.

## FIN USER PROMPT
