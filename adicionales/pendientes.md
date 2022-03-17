Sprint 7

Validaciones del back-end
- (HECHO) contraseña (Opcional) → Deberá tener letras mayúsculas, minúsculas, un número y un carácter especial.  isStrongPassword(str [, options])
- (HECHO) agregar JPEG en archivos válidos de imagen. 

Creación y modificación de productos
○ Nombre 
- Obligatorio.
- Deberá tener al menos 5 caracteres.
○ Descripción
- Deberá tener al menos 20 caracteres.
○ Imagen
- Deberá ser un archivo válido (JPG, JPEG, PNG, GIF).
○ (Opcional) Tablas secundarias
- Verificar que los valores existan en base. Es decir, que los valores
de talles, colores, etc. que lleguen sean válidos en la base.
(HECHO)

- (HECHO con el front) fijarnos de evitar la cargada de imagen de multer si las extensiones no son validas, y si no se puede evitar la cargada capaz eliminarla automaticamente.



MEJORAS ESTETICAS

- mejorar el header a partir de 768 en adelante. Ejemplos:
  * (HECHO) darle un max-width a la barra de busqueda
  * (HECHO) sacar el burguer menu de 768 en adelante.
  * (HECHO) mover el logo a la izquierda y poner la barra de busqueda entre medio del logo y el carrito

- Agregar un carrusel con imagenes e información de la empresa

- (seguir viendo)mejorar el footer para que breakpoints entre 768 y 1280 px (que aparezca las redes y la ubicacion en el mismo renglon y el newsletter abajo)

- (HECHO)arreglar el link del footer para que tenga un target blank.

- achicar el min-height o min-width de los productos(sobre todo para version de 1280 en adelante)

- quizas agregar un max width a los articulos en versiones de 768 en adelante.

- arreglar un poco el product detail (quizás ponerle un max-width a la imagen en las distintas versiones de los media queries). Tambien se podria mostrar la imagen a la izquierda y el resto de la informacion a la derecha en versiones de tablet en adelante. Ver de organizar los botones de editar y eliminar

- Arreglar el desajuste de suscribite a nuestro newsletter en la vista de product-detail

- darle mas estilos al formulario de login y agrgearle responsive

- agregar responsive a los formularios de registro

- agregar responsive a los formularios de creacion y edicion de productos.

- darle algo de estilo al mensaje de no se encontraron resultados cuando la búsqueda no encuentra nada.

- En el formulario de login usuarios hay que cambiar para que solo se muestre en negrita donde dice crea tu cuenta y no todo el texto

- darle funcionalidad al burguer menu en version mobile y 481.

- Sacar carrito de compras de la lista de productos y solo dejarlo en detalle de producto

BACKEND
- (HECHO) Agregar validaciones para los productos

- Editar las clases del formulario de creación y edición del producto 
(product-edit-form.ejs linea 102)

- (HECHO) El "Hola, xxxxx" que vaya en blanquito (CSS)

- Crear vista de error 404 Not Found


SPRINT 8
- ver que onda el tema de la url de la profile picture en la api de /api/users/:id (apiUsersController 62:21)

-revisar countByCategory cualquier cosa cambiar por esto:

[
  {papel: papel.length},
  {kits: kits.length},
  {productosDeOficina: productosDeOficina.length},
  {calendarios: calendarios.length},
  {tarjetasPlantables: tarjetasPlantables.length},
  {bolsasCompostables: bolsasCompostables.length},
  {otros: otros.length}
]



