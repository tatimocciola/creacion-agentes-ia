# Corrida 02 — Después de la iteración 1

## Estado del contrato

Se conserva el contrato de la corrida 1 y se modifica únicamente **Restricciones** con la regla determinística de lluvia descrita en la Iteración 1.

## Entrada de usuario

```yaml
día: "hoy"
clima:
  descripción: "seco, templado y fresco al regreso"
  temperatura_mínima: "14 °C"
  temperatura_máxima: "22 °C"
  probabilidad_lluvia: "10%"
  humedad: "52%"
ocasión: "reunión de trabajo y cena informal"
formalidad: "prolija"
prioridad_comodidad: "normal"
preferencia_especial: "quiero usar jean"
inventario_disponible:
  - { id: camisa_blanca, nombre: "Camisa blanca", categoría: top, color: blanco, material: algodón, textura: poplín, formalidad: formal, comodidad: media, apto_lluvia: sí, sensible_al_agua: no }
  - { id: top_negro, nombre: "Top negro", categoría: top, color: negro, material: algodón, textura: lisa, formalidad: prolija, comodidad: alta, apto_lluvia: sí, sensible_al_agua: no }
  - { id: jean_flare, nombre: "Jean Zara TRF Cropped Flare", categoría: inferior, color: denim_medio, material: denim, textura: denim, formalidad: prolija, comodidad: media, apto_lluvia: sí, sensible_al_agua: no }
  - { id: jean_oscuro, nombre: "Jean azul oscuro", categoría: inferior, color: denim_oscuro, material: denim, textura: denim, formalidad: prolija, comodidad: alta, apto_lluvia: sí, sensible_al_agua: no }
  - { id: campera_corderoy, nombre: "Campera de corderoy verde seco", categoría: abrigo, color: verde_seco, material: corderoy, textura: acanalada, formalidad: prolija, comodidad: alta, apto_lluvia: no, sensible_al_agua: sí }
  - { id: campera_denim, nombre: "Campera de denim", categoría: abrigo, color: denim, material: denim, textura: denim, formalidad: relajada, comodidad: alta, apto_lluvia: no, sensible_al_agua: no }
  - { id: forum, nombre: "Adidas Forum Bold", categoría: calzado, color: blanco, material: cuero, textura: lisa, formalidad: relajada, comodidad: alta, apto_lluvia: no, sensible_al_agua: no }
  - { id: botas_negras, nombre: "Botas negras bajas", categoría: calzado, color: negro, material: cuero, textura: lisa, formalidad: prolija, comodidad: media, apto_lluvia: sí, sensible_al_agua: no }
  - { id: cartera_camel, nombre: "Cartera camel", categoría: cartera, color: camel, material: cuero, textura: lisa, formalidad: prolija, comodidad: media, apto_lluvia: no, sensible_al_agua: no }
  - { id: aros_dorados, nombre: "Aros dorados", categoría: accesorio, color: dorado, material: metal, textura: brillo_sutil, formalidad: prolija, comodidad: alta, apto_lluvia: sí, sensible_al_agua: no }
```

## Salida

## CONTEXTO INTERPRETADO
- día: hoy
- clima_clave: 14–22 °C, seco y con descenso al regreso
- ocasión_y_formalidad: reunión prolija y cena informal
- prioridad_comodidad: normal
- preferencia_aplicada: todas las opciones usan jean confirmado
- supuestos: la cena no exige mayor formalidad que la reunión

## BÁSICA
- prendas: [camisa_blanca — Camisa blanca, jean_oscuro — Jean azul oscuro]
- calzado: [botas_negras — Botas negras bajas]
- abrigo: [campera_denim — Campera de denim]
- cartera: [cartera_camel — Cartera camel]
- accesorios: [aros_dorados — Aros dorados]
- paleta: [blanco, denim oscuro, negro, camel, dorado]
- texturas: [poplín, denim, cuero, brillo sutil]
- por_qué_funciona: la camisa eleva el jean y la cartera aporta un acento cálido.
- compatibilidad_climática: adecuada
- verificación_inventario: todos los ids existen: sí; ids utilizados: [camisa_blanca, jean_oscuro, botas_negras, campera_denim, cartera_camel, aros_dorados]
- adaptación_día_noche: sumar la campera al bajar la temperatura

## JUGADA
- prendas: [camisa_blanca — Camisa blanca, jean_flare — Jean Zara TRF Cropped Flare]
- calzado: [forum — Adidas Forum Bold]
- abrigo: [campera_corderoy — Campera de corderoy verde seco]
- cartera: [cartera_camel — Cartera camel]
- accesorios: [aros_dorados — Aros dorados]
- paleta: [blanco, denim medio, verde seco, camel, dorado]
- texturas: [poplín, denim, corderoy, cuero]
- por_qué_funciona: el corderoy y el flare agregan diseño mientras las zapatillas relajan la camisa.
- compatibilidad_climática: sin lluvia prevista; sirve para el fresco
- verificación_inventario: todos los ids existen: sí; ids utilizados: [camisa_blanca, jean_flare, forum, campera_corderoy, cartera_camel, aros_dorados]
- adaptación_día_noche: usar la campera cerrada al regreso

## INESPERADA
- prendas: [top_negro — Top negro, jean_oscuro — Jean azul oscuro]
- calzado: [forum — Adidas Forum Bold]
- abrigo: [campera_corderoy — Campera de corderoy verde seco]
- cartera: [cartera_camel — Cartera camel]
- accesorios: [aros_dorados — Aros dorados]
- paleta: [negro, denim oscuro, blanco, verde seco, camel]
- texturas: [algodón, denim, corderoy, cuero]
- por_qué_funciona: la base oscura deja que el corderoy y la zapatilla construyan el contraste.
- compatibilidad_climática: compatible
- verificación_inventario: todos los ids existen: sí; ids utilizados: [top_negro, jean_oscuro, forum, campera_corderoy, cartera_camel, aros_dorados]
- adaptación_día_noche: mantener el top negro y sumar la campera para cenar

## Iteración 2

- **Problema textual detectado:** las verificaciones “`compatibilidad_climática: adecuada`” y “`compatibilidad_climática: compatible`” no explican qué dato climático se contrastó con qué atributo. Aunque no hay una violación evidente, no se puede auditar cómo llegó el agente a esa conclusión.
- **Única pieza modificada:** **Formato**.
- **Cambio:** sin agregar ni quitar campos, `compatibilidad_climática` pasa a exigir la secuencia “condición concreta → atributo concreto → decisión”; `verificación_inventario` debe enumerar todos los IDs utilizados.
- **Por qué:** mantiene idéntica la estructura entre corridas, pero vuelve repetible y auditable el contenido de dos campos que antes admitían respuestas vagas. No se modifican rol, contexto, tarea, restricciones ni ejemplos.
- **Resultado esperado después del cambio:** cada alternativa conecta explícitamente el clima recibido, las propiedades del inventario y la decisión de styling.
