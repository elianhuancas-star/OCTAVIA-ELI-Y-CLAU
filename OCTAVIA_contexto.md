# OCTAVIA — contexto completo del proyecto

> Pega este archivo y el `index.html` en el nuevo chat de Claude, con un mensaje como:
> "Este es mi proyecto Octavia. Lee el contexto y el código, y seguimos desde aquí. No cambies la estructura ni quites funciones sin preguntarme."

Estado: versión 7 (11 nov 2026): nueva pantalla Hoy (plan del día). Antes, v6: diseño «Coro» + racha en riesgo, resumen semanal, modo concentración, plantillas por nivel y biblioteca de técnica. Autora del proyecto: Claudia Fernanda Villavicencio Cortés.

---

## 1. Qué es

Octavia es una app web de acompañamiento estudiantil para **pianistas clásicos en Perú**, del **ciclo I al X** (básico a avanzado). Su objetivo es formar **disciplina** con una **rutina de estudio efectiva**, y que la **profesora vea cómo estudia cada alumno** sin esperar a la clase.

- Público: jóvenes de 17 a 35 años. Repertorio mayormente clásico, con obras peruanas y latinoamericanas.
- Frase guía: **"Classroom controla entregas; Octavia acompaña el proceso de estudio."**

| | Google Classroom | Octavia |
|---|---|---|
| Hecho para | Cualquier materia | Solo pianistas: el estudio diario |
| Unidad | La tarea | La rutina y la obra |
| Qué ve el profesor | Si entregó | Cómo estudia: días, minutos, columna y compases de cada obra |
| Avance | Notas | Tablero de 6 columnas, compases seguros |
| Organización | Por curso | Por ciclo I–X y repertorio personal |
| Comentarios | Generales | Sobre una grabación concreta |
| Disciplina | No la mide | Racha, diario y meta semanal |
| Pedagogía | Ninguna | Método incluido |

## 2. Usuarios y acceso

- **Alumno:** entra con su Gmail y ve **solo su propio atril** (repertorio personal; cada alumno tiene partituras distintas).
- **Profesora (dueña):** ve a todos. Hoy es una sola profesora; más adelante habrá varias, cada una con sus alumnos.
- La dueña puede **"Ver como alumno"** con un **atril de prueba** con datos de ejemplo, que puede borrar.
- Cada alumno ve solo su propia racha; los compañeros no se ven entre sí.
- Las partituras son **enlaces de Google Drive** ("Cualquier persona con el enlace · Lector"). Las suben profesores y alumnos, y se publican directo en el atril del alumno; la profesora puede editar o borrar cualquiera.

## 3. Método: el tablero de una obra (diseñado por Claudia — no cambiar)

Cada obra avanza por **6 columnas**:

1. **Sin empezar:** se registra la obra con título, compositor, catálogo, **total de compases**, tonalidad, compás, enlace de Drive y motivo.
2. **Lectura a primera vista:** leer la obra completa sin análisis previo (en básico, manos separadas). Se anotan 3 impresiones: qué fue difícil, qué gustó, qué no se entendió.
3. **Control sin piano:** seguir leyendo y analizar, en dos partes:
   - **Armonía:** el acorde de cada compás.
   - **Mapa de la obra:** secciones A, A', B…, marcando si cada una es nueva, igual o similar y qué cambia.
   Además se escuchan 2 versiones grabadas. Las secciones **iguales se descuentan** de los compases por aprender.
4. **Primer bloque:** sacar la obra **por fragmentos sin cortar frases**, con notas seguras aunque sea lento. Para cada fragmento: manos separadas → manos juntas lento → enlazar con el anterior.
5. **Construcción:** visión de conjunto y la técnica que pide la obra (resistencia, velocidad…), con tempo actual y tempo meta.
6. **Terminada:** queda registrada con su historial (fechas por columna y minutos dedicados). Se puede reactivar como repaso.

Principios: primero leer y después analizar; los fragmentos respetan las frases; la técnica sale de la obra.

**Fragmentos.** Cada fragmento tiene dificultad, estado (sin trabajar → en proceso → seguro) y desafío técnico.

| Dificultad | Ejemplo | Tiempo esperado |
|---|---|---|
| Accesible | Melodía con acompañamiento simple | 1–2 días |
| Exigente | Cambios de posición, saltos | 3–4 días |
| Pasaje crítico | Polirritmia, coordinación compleja | hasta 1–2 semanas |

**La meta diaria es de proceso, no de compases por día.** Claudia lo pidió así porque hay pasajes que toman una semana.

**Escalera para pasajes críticos** (un escalón por sesión cuenta como avance):
1. Solo el ritmo en la mesa, diciéndolo en voz alta
2. Encontrar el ritmo común y los puntos de unión
3. Manos separadas, lento
4. Una mano toca y la otra marca el ritmo en la tapa
5. Manos juntas muy lento con metrónomo
6. Subir el tempo de 4 en 4
7. Enlazar con el compás anterior y el siguiente

**Desafíos técnicos en Construcción.** El alumno identifica el desafío desde Primer bloque y elige 1 o 2. Los trabaja con el **mismo pasaje de la obra**: transportándolo, con variantes rítmicas, acentos móviles, en bloque o con pausas antes del cambio difícil.

| Desafío | Material |
|---|---|
| Saltos y octavas | Kullak Op. 48 · Czerny Op. 553 |
| Velocidad | Czerny Op. 299 / Op. 740 |
| Independencia | Hanon · Pischna |
| Polirritmia | Bartók: Mikrokosmos |
| Resistencia | Hanon · Czerny Op. 299 |
| Cantabile | Bach: Invenciones · Mendelssohn: Romanzas sin palabras |
| Pedal | Heller Op. 45 y 47 |

**Básico vs. intermedio**

| | Básico (I–III) | Intermedio (IV–VI) |
|---|---|---|
| Obras a la vez | 2–3 | 3–4 |
| Fragmentos | 4–8 compases | 8–16 compases |
| Análisis | Acordes por nombre | Forma, cadencias, grados |
| Obras en Primer bloque | 1 | 2 |
| Objetivo técnico | Lo sugiere la profesora | Lo propone el alumno |

## 4. Rutina, racha y evidencias

- **Rutina semanal por bloques:** el alumno la **propone** y la profesora la **aprueba** o pide ajuste. Se renueva cada semana. Reparto sugerido:
  - Técnica 15–20 %
  - Estudio 15–20 %
  - **Repertorio lento 35–40 %**
  - Pasada completa 10–15 %
  - Primera vista 5–10 %
  - Cierre en el diario 2–3 min
- **Temporizador por bloques** dentro de Octavia. **Meta semanal medible** y meta del día de proceso.
- **Racha:** un día cuenta si cumple el mínimo del ciclo: **30 min** (básico), **60** (intermedio), **90** (avanzado). Tiene **un día de descanso fijo** elegido por el alumno (opción A), que no rompe la racha. **6 de 7 días = semana cumplida.**
- **Evidencias:** una grabación por semana con **picd.in** (https://picd.in/record). No pide cuenta, graba con la cámara del celular, dura máximo 5 min y se borra tras un año sin abrirse. La profesora responde con **comentario de texto**.
- **Motivación:**
  - Minutos del mes.
  - 9 insignias: primera sesión, semana completa, 4 semanas, racha de 30, analista, pasaje vencido, obra terminada, 10 horas, primera grabación.
  - "Siguiente logro" con barra de progreso.
- **Ranking solo para la profesora:** puntaje = minutos del mes + 60 por semana cumplida + 100 por obra terminada. **Al primer puesto lo invitan a comer entre todos los pianistas.**
- Si la constancia cuenta en la nota lo decide cada profesor. El plan de cada ciclo combina el sílabo oficial con los ajustes de Claudia.

## 5. Pantallas (versión 5)

**Alumno**
- **Hoy:**
  - Saludo con pastillas de estado (minutos de hoy, racha, minutos del mes).
  - **Teclado de la semana**: cada día es una tecla que suena; el descanso es una tecla oscura con 𝄽.
  - **"En tu atril"**: el fragmento de hoy con un botón por compás, "Marcar compás como seguro" y la escalera si es crítico.
  - 3 pendientes.
  - **Cajón desplegable "Mis obras en el atril"**, con "Poner en el atril".
- **Atril:** tablero de 6 columnas; cada obra abre un detalle con pestañas Ficha, Lectura, Análisis, Fragmentos, Construcción e Historial.
- **Estudiar:** temporizador grande por bloques, obra, fragmento y meta del día, diario de cierre y rutina semanal.
- **Progreso:** minutos del mes, calendario, recorrido por columnas, racha, logros y plan del ciclo.
- **Evidencias:** 3 pasos para grabar en picd.in, formulario e historial con comentarios.
- **Método:** guías cortas de todo lo anterior.
- **Consola de práctica fija abajo, como un reproductor:**
  - Play/pausa y el bloque de la rutina.
  - **Metrónomo con sonido** y péndulo animado.
  - Reloj, Guardar y Evidencia.
- **Diapasón La 440 Hz.**
- Se celebra al cumplir el día y al asegurar un fragmento.

**Profesora**
- **Panel:**
  - Estudiaron hoy, grabaciones por revisar y rutinas por aprobar.
  - Alertas (3 o más días sin estudio).
  - Constancia de 14 días.
  - Calendario del grupo con eventos (clase, audición, recital, entrega).
  - Ranking.
- **Alumnos:** detalle de cada uno con Atril (editable), Rutina (aprobar o pedir ajuste), Evidencias (comentar) y Estudio.
- **Método.**

### Agregado en la v6 (11 nov 2026)
- **Racha en riesgo:** desde las 6 p. m., si hoy no es su descanso y no llegó al mínimo, Hoy muestra un aviso naranja con los minutos que faltan, las horas que quedan y el botón «Estudiar ahora». La profesora recibe la misma alerta en su Panel.
- **Resumen semanal automático:** en Progreso, con selector «Esta semana / Semana pasada». Incluye minutos frente a la meta (mínimo × 6), días cumplidos, tira de 7 días, tiempo por obra, avances de columna y si envió grabación. El botón «Copiar resumen» lo deja listo para pegar en WhatsApp. Los lunes y martes aparece un resumen corto en Hoy. La profesora ve «Esta semana» y «Semana pasada» en la pestaña Estudio de cada alumno.
- **Modo concentración:** pantalla completa desde Estudiar o desde la consola. Tiene la partitura de Drive incrustada al lado (se convierte el enlace a `/preview`), un reloj grande, Empezar/Pausar, Guardar bloque, metrónomo (±1 y ±4) y botones por compás para marcar seguro, más la escalera si el pasaje es crítico. Mantiene la pantalla encendida (Wake Lock) y se cierra con Esc o con «Salir».
- **Recursos (profesora), nueva sección del menú:**
  - **Plantillas de rutina por nivel** (básico, intermedio y avanzado). Si hay una plantilla guardada, el alumno parte de ella al proponer su rutina; si no, del reparto sugerido del método.
  - **Biblioteca de técnica:** ejercicios con tipo, nivel e indicación. Se asignan con chips a cada alumno o a todo un nivel, también al atril de prueba. El alumno los ve en Estudiar («Técnica asignada») y con «Practicar con el temporizador» los pasa a la meta del bloque de técnica. La profesora los ve en la pestaña Rutina de cada alumno.
- **Datos:** las plantillas y la biblioteca están en `eventos/recursos-octavia` (`cfg: true`), porque `eventos` es lo único que todos pueden leer. Ese documento se filtra del calendario. Las asignaciones se guardan en `alumnos/<id>.tecnica` (lista de ids).

## 6. Diseño

### v6 (11 nov 2026): estilo «Coro» — VIGENTE
- Se adoptó el sistema visual del kit «Coro» (guía en `kit-diseno-coro/DISENO.md`). Se copió solo el **estilo**; el contenido, el método y todas las funciones de Octavia se conservan.
- Fondo gris claro **#F3F5F9**, tarjetas blancas de radio 18 sin sombras, tinta **#18202E**, texto secundario **#5B6474**.
- **Un solo acento azul #2F49C9** (oscuro #1E338F, suave #E6EAFB). Éxito #0F766E, aviso #7A3D00, nota #6B4E00, rojo #C2312F (grabar, borrar).
- **Tipografía:** Plus Jakarta Sans (400–800); números con cifras tabulares.
- **Navegación:** menú lateral oscuro de 232 px en computadora (alumno y profesora); barra inferior blanca de 72 px en celular. La consola de práctica sigue fija abajo, en color tinta.
- **Columnas del tablero** con la paleta de categorías: Sin empezar gris, Lectura amarillo, Control sin piano naranja, Primer bloque azul, Construcción morado, Terminada verde (siempre con su nombre).
- Encabezados de pantalla sin franja de color: antetítulo gris + título grande. Tarjeta destacada azul en el atril y en el temporizador.
- Se quitó el modo oscuro de la v5 (el kit Coro solo tiene modo claro).
- En el código, los nombres de variables de la v5 (`--brand`, `--sun`, `--coral`, `--green`…) se mantienen pero apuntan a los colores Coro; la capa «Coro» está al final del `<style>`.

### Historial (v1–v5, ya reemplazado por la v6)
- Claudia quiere que se sienta como una **app** moderna y con color: **ni dashboard, ni plataforma genérica, ni infantil, ni escueta**. La versión 1 (beige, poco color) **no le gustó**.
- **Paleta:**
  - Morado **#67418A** (marca)
  - Amarillo **#E8B94F** (energía, racha)
  - Coral **#EF887B** (acciones, alertas)
  - Verde **#A8C9B6** (progreso)
  - Marfil **#F5F0E8**
  - Carbón **#302B35**
  - Fondo lila claro **#F6F3FA**
- **Tipografías (v5):** Unbounded (títulos), Figtree (texto), Martian Mono (minutos, compases y tempo).
- **Sin logotipo todavía:** un cuadro morado con "O" y el signo **8va** punteado encima. Debe poder reemplazarse.
- **Navegación:** riel angosto de íconos en computadora; pestañas abajo y la consola flotante en el celular.
- Cada columna del tablero tiene su color: gris lila, amarillo, coral, morado, morado oscuro y verde.
- La estructura de la v5 se basó en un HTML de referencia que Claudia compartió (le gustó la estructura, no su diseño).

## 7. Parte técnica

- Es un **solo archivo HTML** (CSS y JS dentro), sin frameworks.
- **Dentro de Claude** (artifact): usa la base de datos compartida del artifact (`db`) y la identidad del usuario (`user`). Reglas de acceso:
  - `alumnos` → solo la dueña lee y escribe.
  - `alumnos/{self}` → cada alumno lee y escribe solo lo suyo.
  - `eventos` → todos leen, solo la dueña escribe.
- **Fuera de Claude** (abrir `index.html` en el navegador): entra en **modo local**. Guarda en el navegador (`localStorage`), abre en la vista de alumno con el atril de prueba y todo funciona, pero los datos no se comparten.
- Datos: `alumnos/<id>` (perfil + resumen para la profesora), `.../obras`, `.../sesiones/<fecha>`, `.../rutinas/<lunes>`, `.../evidencias`, `eventos`.
- Limitaciones dentro de Claude:
  - Los alumnos deben ser invitados como **Editor** y necesitan cuenta de Claude.
  - Para muchos alumnos o varios profesores conviene un **sitio propio** (por ejemplo, Firebase o Supabase) con su propio inicio de sesión.

## 8. Pendientes

- [ ] Feedback de Claudia sobre la v5 (pantalla Hoy, consola, tipografías)
- [x] Detalle de cada obra y vista de profesora con el mismo estilo (v6, diseño «Coro»)
- [ ] Nombre definitivo de la última columna (provisional: "Terminada")
- [x] Biblioteca común de técnica asignable a varios alumnos (v6)
- [ ] Indicaciones de Claudia sobre la redistribución del tiempo de la rutina
- [ ] Lista de obras peruanas y latinoamericanas por ciclo
- [x] Hechas en la v6: modo concentración con visor de partitura, aviso de "racha en riesgo", resumen semanal automático, plantillas de rutina por nivel
- [ ] Idea pendiente: respuesta de la profesora con grabación
- [ ] Logotipo definitivo
- [ ] Probar con un alumno real
- [ ] Evaluar un sitio web propio

## 9. Cómo trabajar con Claudia en este proyecto

- Respetar su método del tablero: proponer mejoras **sin cambiar el método**.
- No borrar funciones ya acordadas; mantener todo al rediseñar.
- Le gusta elegir entre opciones marcables cuando hay decisiones.
- Es muy visual: mostrar capturas o el resultado, no solo describirlo.
- Responder en español.

## 10. Pantalla «Hoy» v7 (11 nov 2026): plan del día al estilo calendario de Notion
- **De arriba abajo:**
  1. Encabezado «Hoy · fecha» con «Tu plan del día» y las pastillas de siempre (minutos de hoy, racha, mes).
  2. Aviso de racha en riesgo (desde las 6 p. m.).
  3. Semana en 7 tarjetas que suenan al tocarlas. Cada una muestra bloques hechos de 9, barra y tiempo real. Hoy lleva borde azul y el descanso es una tarjeta oscura con 𝄽. Al tocar un día se ve su plan.
  4. Tarjeta «Tiempo de hoy»: botones 30 min a 3 h + «Otro», barra de colores por bloque, «X de 9 bloques», «Planificado X de T min» y el campo «Hora real».
  5. Lista del día con 9 bloques en este orden: Control sin piano, Calentamiento, Lectura B, Objetivo, Repertorio lento, Pasada completa, Reto, Video y Cierre en el diario.
  6. «En tu atril» plegable y el cajón «Mis obras en el atril».
- **Minutos por bloque:** son una guía y se pueden editar (decisión de Claudia). Salen de la rutina aprobada:
  - Técnica se divide en Calentamiento y Reto (mitad y mitad).
  - Estudio pasa a Control sin piano y Primera vista a Lectura B.
  - Lento y Pasada quedan igual.
  - Cierre dura 3 min.
  - Video lleva 5 min solo hasta que se envía la grabación de la semana.
  - Objetivo, 0 min.
  - Todo se redondea a 5 min.
- **Obras en cada bloque:** se proponen solas según su columna y el alumno puede añadir o quitar chips.
  - Control sin piano → columna Control sin piano.
  - Lectura B → columna Lectura a primera vista.
  - Repertorio lento → Primer bloque y Construcción.
  - Pasada completa → Construcción con todos los fragmentos seguros, o terminadas en repaso.
  - Reto → obras con desafío elegido.
- **Botón ▶:** carga el bloque y la obra en la consola y arranca el temporizador. En el Cierre abre el diario dentro de la lista; marcar el Cierre también lo abre.
- **Pendientes fusionados:** la rutina y el próximo evento van como pastillas en la tarjeta; la grabación y los comentarios, en el renglón Video.
- **Hora real:** el día cuenta el MAYOR entre el temporizador y la hora real, nunca la suma (función `dayMin`). Se aceptan formatos como «1 h 20», «1:20» u «80».
- **Datos:** en `alumnos/<id>/sesiones/<fecha>` se guardan `tiempoDisponible`, `horaReal`, `hechos` (ids de bloque), `planObras` ({bloque: [ids de obra]}), `planMin` (minutos editados) y `objetivo`.
- **Profesora:** en la pestaña Estudio, cada día muestra el plan elegido, los bloques hechos, la hora real y el objetivo.
- La tipografía sigue siendo Plus Jakarta Sans (decisión de Claudia: no volver a Unbounded/Figtree/Martian).

## 11. Avances del 11 nov 2026 (tarde)
- **Acceso libre en Supabase.** El alumno entra solo con su nombre (cuenta anónima por dispositivo) y la profesora con un código secreto en «Soy la profesora» (`#profesora`). La función `entrar_como_profesora` ya está instalada. El código se guarda en `public.ajustes` y se ve con: `select valor from public.ajustes where clave = 'codigo_profesora';`
- **Consola v8.**
  - Metrónomo con Web Audio: ♩ = 40 a 208, número editable, compás 2/4, 3/4, 4/4 o 6/8 con el primer tiempo acentuado, y «Con sonido / Sin sonido».
  - Botón ↺ con aviso «¿Guardar antes de reiniciar?».
  - Se puede ocultar con una pestaña; el reloj y el metrónomo siguen corriendo.
- **Explicación de los bloques** (desplegable en «Tiempo de hoy» y un «?» por renglón). Se hacen TODOS los bloques; solo cambian los minutos. Los textos siguen el método de Claudia:
  - **Control sin piano:** comprender la obra (época, forma, armonía, repeticiones, ostinatos) para no partir frases.
  - **Repertorio lento (primer bloque):** por frases completas, manos separadas, solfeando ritmo y notas.
  - **Reto (construcción):** velocidad, resistencia y agógica, por ejemplo en las cadenzas.
- **Cierre de la obra terminada** (pestaña Historial):
  - 4 preguntas: en qué ayudó, qué aprendí, cómo ayudó técnicamente y qué conocí del compositor y del contexto.
  - Fragmentos de mantenimiento (máximo 5 min al día), que aparecen en Hoy dentro de «Pasada completa».
- **Pendiente para mañana:** subir a GitHub, publicar en Vercel (enlace para todos los alumnos) y generar el APK.
