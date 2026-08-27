# Corrida 01 — Contrato inicial

## Estado del contrato

Primera ejecución. El contrato ya separaba rol, contexto, tarea, restricciones, formato y ejemplos, pero la restricción climática inicial decía solamente: **“Respetá el clima y elegí materiales adecuados”**. Todavía no explicitaba qué hacer con lluvia, propiedades desconocidas o prendas sensibles al agua.

## Entrada de usuario

```yaml
día: "mañana"
clima:
  descripción: "lluvia durante la tarde"
  temperatura_mínima: "12 °C"
  temperatura_máxima: "17 °C"
  probabilidad_lluvia: "80%"
  humedad: "86%"
ocasión: "trabajo y café después de la oficina"
formalidad: "prolija"
prioridad_comodidad: "alta"
preferencia_especial: "usar tonos tierra si es posible"
inventario_disponible:
  - { id: sweater_crema, nombre: "Sweater crema con rayas negras", categoría: top, color: crema/negro, material: tejido fino, textura: punto, formalidad: prolija, comodidad: alta, apto_lluvia: desconocido, sensible_al_agua: no }
  - { id: pantalon_negro, nombre: "Pantalón negro", categoría: inferior, color: negro, material: sastrero, textura: lisa, formalidad: prolija, comodidad: media, apto_lluvia: sí, sensible_al_agua: no }
  - { id: bomber_camel, nombre: "Bomber Rita Ora camel", categoría: abrigo, color: camel, material: textura sensible, textura: texturada, formalidad: prolija, comodidad: alta, apto_lluvia: no, sensible_al_agua: sí }
  - { id: campera_acolchada, nombre: "Campera acolchada negra", categoría: abrigo, color: negro, material: técnico, textura: acolchada, formalidad: relajada, comodidad: alta, apto_lluvia: sí, sensible_al_agua: no }
  - { id: botas_negras, nombre: "Botas negras bajas", categoría: calzado, color: negro, material: cuero, textura: lisa, formalidad: prolija, comodidad: media, apto_lluvia: sí, sensible_al_agua: no }
  - { id: zapatillas_negras, nombre: "Zapatillas negras", categoría: calzado, color: negro, material: mixto, textura: deportiva, formalidad: relajada, comodidad: alta, apto_lluvia: sí, sensible_al_agua: no }
  - { id: cartera_negra, nombre: "Cartera negra", categoría: cartera, color: negro, material: cuero, textura: lisa, formalidad: prolija, comodidad: media, apto_lluvia: sí, sensible_al_agua: no }
  - { id: aros_dorados, nombre: "Aros dorados", categoría: accesorio, color: dorado, material: metal, textura: brillo_sutil, formalidad: prolija, comodidad: alta, apto_lluvia: sí, sensible_al_agua: no }
```

## Salida

## CONTEXTO INTERPRETADO
- día: mañana
- clima_clave: 12–17 °C, lluvia 80% y humedad alta
- ocasión_y_formalidad: trabajo prolijo con café posterior
- prioridad_comodidad: alta
- preferencia_aplicada: camel como tono tierra protagonista
- supuestos: el traslado incluye exposición breve a la lluvia

## BÁSICA
- prendas: [sweater_crema — Sweater crema con rayas negras, pantalon_negro — Pantalón negro]
- calzado: [botas_negras — Botas negras bajas]
- abrigo: [campera_acolchada — Campera acolchada negra]
- cartera: [cartera_negra — Cartera negra]
- accesorios: [aros_dorados — Aros dorados]
- paleta: [crema, negro, dorado]
- texturas: [punto, sastrería, acolchado, cuero]
- por_qué_funciona: la base neutra se siente prolija y el tejido suma abrigo.
- compatibilidad_climática: compatible con lluvia
- verificación_inventario: todos los ids existen: sí; ids utilizados: [sweater_crema, pantalon_negro, botas_negras, campera_acolchada, cartera_negra, aros_dorados]
- adaptación_día_noche: mantener el abrigo para el regreso fresco

## JUGADA
- prendas: [sweater_crema — Sweater crema con rayas negras, pantalon_negro — Pantalón negro]
- calzado: [zapatillas_negras — Zapatillas negras]
- abrigo: [bomber_camel — Bomber Rita Ora camel]
- cartera: [cartera_negra — Cartera negra]
- accesorios: [aros_dorados — Aros dorados]
- paleta: [crema, negro, camel, dorado]
- texturas: [punto, sastrería, textura marcada, deportivo]
- por_qué_funciona: la bomber camel responde a la preferencia tierra y contrasta con el pantalón pulido.
- compatibilidad_climática: la bomber abriga para los 12 °C
- verificación_inventario: todos los ids existen: sí; ids utilizados: [sweater_crema, pantalon_negro, zapatillas_negras, bomber_camel, cartera_negra, aros_dorados]
- adaptación_día_noche: cerrar la bomber al bajar la temperatura

## INESPERADA
- prendas: [sweater_crema — Sweater crema con rayas negras, pantalon_negro — Pantalón negro]
- calzado: [zapatillas_negras — Zapatillas negras]
- abrigo: [campera_acolchada — Campera acolchada negra]
- cartera: [cartera_negra — Cartera negra]
- accesorios: [aros_dorados — Aros dorados]
- paleta: [crema, negro, dorado]
- texturas: [punto, sastrería, acolchado, deportivo]
- por_qué_funciona: mezcla sastrería con piezas deportivas sin perder la base neutra.
- compatibilidad_climática: compatible con el pronóstico
- verificación_inventario: todos los ids existen: sí; ids utilizados: [sweater_crema, pantalon_negro, zapatillas_negras, campera_acolchada, cartera_negra, aros_dorados]
- adaptación_día_noche: conservar los aros como detalle pulido para el café

## Iteración 1

- **Problema textual detectado:** “`abrigo: [bomber_camel — Bomber Rita Ora camel]`” aparece en la opción Jugada aunque el inventario declara `apto_lluvia: no` y `sensible_al_agua: sí`, frente a una probabilidad de lluvia del 80%. La frase “la bomber abriga” solo consideró temperatura.
- **Única pieza modificada:** **Restricciones**.
- **Cambio:** se reemplazó la indicación climática genérica por una regla determinística: con lluvia o piso mojado se excluyen como exterior las piezas sensibles al agua o no aptas para lluvia; una aptitud desconocida nunca se presenta como impermeable.
- **Por qué:** el contrato inicial permitía interpretar “adecuado” de forma ambigua. La nueva restricción hace verificable una condición de seguridad material sin cambiar rol, contexto, tarea, formato ni ejemplos.
- **Resultado esperado después del cambio:** ninguna opción lluviosa utiliza `bomber_camel` como abrigo exterior.
