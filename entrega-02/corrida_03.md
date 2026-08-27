# Corrida 03 — Contrato final

## Estado del contrato

Se conserva la mejora climática de Restricciones y se aplica la única modificación de la Iteración 2 en **Formato**. Este es el contrato final documentado en `system_prompt.md`.

## Entrada de usuario

```yaml
día: "mañana"
clima:
  descripción: "nublado, húmedo y sin lluvia prevista"
  temperatura_mínima: "9 °C"
  temperatura_máxima: "15 °C"
  probabilidad_lluvia: "25%"
  humedad: "78%"
ocasión: "clases y salida casual por la tarde"
formalidad: "relajada"
prioridad_comodidad: "sensible al frío"
preferencia_especial: "base neutra y un solo gesto de styling"
inventario_disponible:
  - { id: sweater_rayas, nombre: "Sweater crema con rayas negras", categoría: top, color: crema/negro, material: tejido fino, textura: punto, formalidad: prolija, comodidad: alta, apto_lluvia: desconocido, sensible_al_agua: no }
  - { id: sweater_gris, nombre: "Sweater gris", categoría: top, color: gris, material: tejido, textura: punto, formalidad: prolija, comodidad: alta, apto_lluvia: desconocido, sensible_al_agua: no }
  - { id: jean_flare, nombre: "Jean Zara TRF Cropped Flare", categoría: inferior, color: denim_medio, material: denim, textura: denim, formalidad: prolija, comodidad: media, apto_lluvia: sí, sensible_al_agua: no }
  - { id: pantalon_negro, nombre: "Pantalón negro", categoría: inferior, color: negro, material: sastrero, textura: lisa, formalidad: prolija, comodidad: media, apto_lluvia: sí, sensible_al_agua: no }
  - { id: campera_acolchada, nombre: "Campera acolchada negra", categoría: abrigo, color: negro, material: técnico, textura: acolchada, formalidad: relajada, comodidad: alta, apto_lluvia: sí, sensible_al_agua: no }
  - { id: sobretodo_negro, nombre: "Sobretodo negro", categoría: abrigo, color: negro, material: paño, textura: paño, formalidad: formal, comodidad: media, apto_lluvia: no, sensible_al_agua: no }
  - { id: zapatillas_negras, nombre: "Zapatillas negras", categoría: calzado, color: negro, material: mixto, textura: deportiva, formalidad: relajada, comodidad: alta, apto_lluvia: sí, sensible_al_agua: no }
  - { id: botas_plataforma, nombre: "Botas negras con plataforma baja", categoría: calzado, color: negro, material: cuero, textura: lisa, formalidad: prolija, comodidad: media, apto_lluvia: sí, sensible_al_agua: no }
  - { id: cartera_verde, nombre: "Cartera verde", categoría: cartera, color: verde, material: no_informado, textura: lisa, formalidad: prolija, comodidad: media, apto_lluvia: desconocido, sensible_al_agua: desconocido }
  - { id: gorra_neutra, nombre: "Gorra neutra", categoría: accesorio, color: neutro, material: algodón, textura: lona, formalidad: relajada, comodidad: alta, apto_lluvia: sí, sensible_al_agua: no }
  - { id: aros_plateados, nombre: "Accesorios plateados", categoría: accesorio, color: plateado, material: metal, textura: brillo_sutil, formalidad: prolija, comodidad: alta, apto_lluvia: sí, sensible_al_agua: no }
```

## Salida

## CONTEXTO INTERPRETADO
- día: mañana
- clima_clave: 9–15 °C, humedad 78%, nublado y lluvia baja de 25%
- ocasión_y_formalidad: clases y salida casual, formalidad relajada
- prioridad_comodidad: alta por sensibilidad al frío
- preferencia_aplicada: base neutra con un único gesto distintivo por opción
- supuestos: los traslados son urbanos y el pronóstico se mantiene sin lluvia

## BÁSICA
- prendas: [sweater_gris — Sweater gris, jean_flare — Jean Zara TRF Cropped Flare]
- calzado: [zapatillas_negras — Zapatillas negras]
- abrigo: [campera_acolchada — Campera acolchada negra]
- cartera: [cartera_verde — Cartera verde]
- accesorios: [ninguno]
- paleta: [gris, denim, negro, verde]
- texturas: [punto, denim, acolchado, liso]
- por_qué_funciona: la base cómoda y neutra se resuelve con la cartera verde como único acento.
- compatibilidad_climática: mínima de 9 °C y sensibilidad al frío → campera_acolchada tiene comodidad alta y material técnico → se incluye como capa exterior; lluvia 25% → la aptitud desconocida de cartera_verde no se presenta como impermeable
- verificación_inventario: todos los ids existen: sí; ids utilizados: [sweater_gris, jean_flare, zapatillas_negras, campera_acolchada, cartera_verde]
- adaptación_día_noche: mantener la campera; no requiere sumar piezas no inventariadas

## JUGADA
- prendas: [sweater_rayas — Sweater crema con rayas negras, pantalon_negro — Pantalón negro]
- calzado: [zapatillas_negras — Zapatillas negras]
- abrigo: [campera_acolchada — Campera acolchada negra]
- cartera: [ninguno]
- accesorios: [gorra_neutra — Gorra neutra]
- paleta: [crema, negro, gris neutro]
- texturas: [punto, sastrería, acolchado, lona]
- por_qué_funciona: sastrería con zapatillas crea el contraste y la gorra es el único gesto de styling.
- compatibilidad_climática: máxima de 15 °C con humedad 78% → campera_acolchada tiene material técnico y comodidad alta → se prioriza sobre sobretodo_negro; zapatillas_negras tienen apto_lluvia: sí → resultan prácticas aunque cambie el piso
- verificación_inventario: todos los ids existen: sí; ids utilizados: [sweater_rayas, pantalon_negro, zapatillas_negras, campera_acolchada, gorra_neutra]
- adaptación_día_noche: retirar la gorra en interior conserva una versión más pulida

## INESPERADA
- prendas: [sweater_gris — Sweater gris, pantalon_negro — Pantalón negro]
- calzado: [botas_plataforma — Botas negras con plataforma baja]
- abrigo: [sobretodo_negro — Sobretodo negro]
- cartera: [ninguno]
- accesorios: [aros_plateados — Accesorios plateados]
- paleta: [gris, negro, plateado]
- texturas: [punto, sastrería, paño, cuero, brillo sutil]
- por_qué_funciona: el sobretodo formal sobre una base cotidiana mezcla códigos; el brillo plateado queda como único detalle.
- compatibilidad_climática: mínima de 9 °C → sobretodo_negro aporta una capa de paño y botas_plataforma cubren el pie → se eligen para el frío; lluvia 25% → como sobretodo_negro tiene apto_lluvia: no, se usa solo bajo el pronóstico actual sin lluvia y debe cambiarse por campera_acolchada si aumenta la precipitación
- verificación_inventario: todos los ids existen: sí; ids utilizados: [sweater_gris, pantalon_negro, botas_plataforma, sobretodo_negro, aros_plateados]
- adaptación_día_noche: conservar el sobretodo y los aros; no hace falta agregar otra pieza

## Evaluación final

La salida conserva exactamente los mismos campos y el mismo orden que las corridas anteriores. A diferencia de la corrida 1, no usa una pieza sensible en lluvia. A diferencia de la corrida 2, cada compatibilidad climática vincula condición, atributo y decisión, y cada alternativa enumera sus IDs para auditar el inventario.
