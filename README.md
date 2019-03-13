# Markdown Links

## Preámbulo

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...), y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

Dentro de una comunidad de código abierto, nos han propuesto crear una
herramienta usando [Node.js](https://nodejs.org/), que lea y analice archivos
en formato `Markdown`, para verificar los links que contengan y reportar
algunas estadísticas.

## Diagrama de Flujo

![Diagrama de flujo md](https://3.bp.blogspot.com/-STcCkd0b2lw/XIZq8L9W89I/AAAAAAAALXI/k-KC8wf6-oo46D0GQ2RyHeaKwet3HMongCLcBGAs/s1600/diagrama%2Bde%2Bflujo%2Bmd.jpg)

### Instalación 

```js
npm install JoanLazo/md-links md-links
```

### Modo de uso

#### `mdLinks(path, options)`

##### Argumentos

- `path`: Ruta absoluta o relativa al archivo o directorio.
- `options`: Un objeto con las siguientes propiedades:
  * `validate`: Booleano que determina si se desea validar los links
    encontrados.

#### Ejemplo

```js
const mdLinks = require("md-links");

mdLinks("./some/example.md")
  .then(links => {
    // => [{ href, text, file }]
  })
  .catch(console.error);

mdLinks("./some/example.md", { validate: true })
  .then(links => {
    // => [{ href, text, file, status, ok }]
  })
  .catch(console.error);

mdLinks("./some/dir")
  .then(links => {
    // => [{ href, text, file }]
  })
  .catch(console.error);
```

### CLI (Command Line Interface - Interfaz de Línea de Comando)

El ejecutable de nuestra aplicación debe poder ejecutarse de la siguiente
manera a través de la terminal:

`md-links <path-to-file> [options]`

Por ejemplo:

![md-links route](https://3.bp.blogspot.com/-Ql9JFlEfjpI/XIlorvxHBcI/AAAAAAAALY4/mdm2OsYreFEx5jeIC9sJf87nl93qYbrwACLcBGAs/s1600/md-links%2Bruta.png)

#### Options

##### `--validate`

Si pasamos la opción `--validate`, el módulo debe hacer una petición HTTP para
averiguar si el link funciona o no. Si el link resulta en una redirección a una
URL que responde ok, entonces consideraremos el link como ok.

Por ejemplo:

![md-links validate](https://1.bp.blogspot.com/-tbOvuZAIHZg/XIlorwc_ZMI/AAAAAAAALZA/VRaLFvi4BUgApMP924S5z-d4v-OiMcn4ACLcBGAs/s1600/md-links%2Bvalidate.png)

Vemos que el _output_ en este caso incluye la palabra `ok` o `fail` después de
la URL, así como el status de la respuesta recibida a la petición HTTP a dicha
URL.

##### `--stats`

Si pasamos la opción `--stats` el output (salida) será un texto con estadísticas
básicas sobre los links.

![md-links stats](https://1.bp.blogspot.com/-4-yRZNJCX6w/XIlor4zQgRI/AAAAAAAALY8/bnf5PgKFWZs8M_Lt7zVt7E9ewd0jdN2PgCLcBGAs/s1600/md-links%2Bstats.png)

También podemos combinar `--stats` y `--validate` para obtener estadísticas que
necesiten de los resultados de la validación.

![md-links s-v](https://3.bp.blogspot.com/-2VlAGhuI3EQ/XIlqu6d1suI/AAAAAAAALZQ/jWchNFiP5xMlcTm0z3BN8O-XzLCWSVQOACLcBGAs/s1600/md-links%2Bstats-validate.png)

### Planificación

![markdown-planificación](https://1.bp.blogspot.com/-_fuVdQ-TSA0/XIlnFVTXlfI/AAAAAAAALYo/Caqkm0_5jbE_Xm5OowNJ6cgngMF2bgyPgCLcBGAs/s1600/boards-mdlinks.png)