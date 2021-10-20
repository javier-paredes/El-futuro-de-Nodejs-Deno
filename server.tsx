import React from "https://dev.jspm.io/react/index.js";
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js";
import { contentTypeFilter,createApp } from "https://deno.land/x/servest@v1.3.1/mod.ts";
// import { } from "https://deno.land/std@0.112.0/fmt/colors.ts"; //colors

const app = createApp();
const colores: Array<string> = [];

app.post(
  '/',
  contentTypeFilter("application/x-www-form-urlencoded"),
  async(req) => {
    const formColores = await req.formData()
    console.log(formColores.value("color"))
    colores.push(formColores.value("color"))
})

// function listadoColores(props:Array<string>) {
//   let colores = props.colores
//   let listaColores = colores.map((color) =>
//     <li>{color}</li>
//   );
//   return (
//     <ul>{listaColores}</ul>
//   );
// }

app.handle("/", async (req) => {
  await req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "text/html; charset=UTF-8",
    }),
    body: ReactDOMServer.renderToString(
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>Desafio 47</title>
        </head>
        <body style={{ backgroundColor: "black" }}>

          <form action="/" method="POST">
            <h3 style={{color: "white" }}>Servest - Listado de colores</h3>
            <input type="text" name="color" placeholder="Ingrese un color" />
            <button type="submit">Ingresar</button>
          </form>

          <ul style={{color:"white"}}>
            { colores.map((color) => 
              <li key={color} style={ {color:`${color}`}}>{ color }</li> ) }
          </ul>

        </body>

      </html>
    ),
  });
});
app.listen({ port: 8899 });
