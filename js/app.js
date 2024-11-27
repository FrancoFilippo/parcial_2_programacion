const contenido = document.getElementById("contenido");
const form_ingresar = document.getElementById("form_ingresar");
const form_modificar = document.getElementById("form_modificar");

document
  .getElementById("app")
  .addEventListener("hide.bs.collapse", function () {
    document.getElementById("anotar").textContent = "Anotar";
  });

document
  .getElementById("app")
  .addEventListener("show.bs.collapse", function () {
    document.getElementById("anotar").textContent = "Ocultar";
  });

filtro.addEventListener("change", function () {
  let producto_elegido = document.querySelector("option:checked");
  let cards = document.querySelectorAll("#contenido .nota");

  cards.forEach((nota) => {
    nota.classList.add("oculto");
  });
  if (producto_elegido.value == "todas") {
    cards.forEach((nota) => {
      nota.classList.remove("oculto");
    });
  } else if (producto_elegido.value == "bebida") {
    document.querySelectorAll("#contenido .bebida").forEach((nota) => {
      nota.classList.remove("oculto");
    });
  } else if (producto_elegido.value == "electronica") {
    document.querySelectorAll("#contenido .electronica").forEach((nota) => {
      nota.classList.remove("oculto");
    });
  } else if (producto_elegido.value == "indumentaria") {
    document.querySelectorAll("#contenido .indumentaria").forEach((nota) => {
      nota.classList.remove("oculto");
    });
  } else if (producto_elegido.value == "comida") {
    document.querySelectorAll("#contenido .comida").forEach((nota) => {
      nota.classList.remove("oculto");
    });
  }
});

form_ingresar.addEventListener("submit", function (e) {
  e.preventDefault();

  let producto_ingresado = producto.value;
  let descripcion_ingresada = descripcion.value;
  let tipo_ingresado = document.querySelector(
    "#productos option:checked"
  ).value;

  const div = document.createElement("div");
  div.classList.add("nota", tipo_ingresado);

  div.innerHTML = `
    <div class="container card-header d-flex notadd">
        <h3 class="mb-0 me-3 fw-bold text-dark flex-grow-1">${producto_ingresado}</h3>
        <img id="modicon" src="./images/modicon.svg" alt="boton modificar" class="me-3 flex-grow-0" data-accion="modificar" data-bs-toggle="modal" data-bs-target="#modificar">
        <img id="delicon" src="./images/delicon.svg" alt="eliminar" class="flex-grow-0" data-accion="eliminar">
        </div>
        <div class="card-body">
        <br>
        <p class="card-text"> <strong>Descripción:</strong> <span>${descripcion_ingresada}</span></p>
        </div>
    `;

  contenido.prepend(div);
  form_ingresar.reset();

  let cards_actuales = contenido.innerHTML;
  localStorage.setItem("productos", cards_actuales);
});

document.getElementById("eliminar_todo").addEventListener("click", function () {
  let rta = confirm("¿Estás seguro de eliminar la lista completa?");
  if (rta) {
    contenido.innerHTML = "";

    localStorage.clear();
  }
});

contenido.addEventListener("click", function (e) {
  if (e.target.dataset.accion == "eliminar") {
    let rta = confirm("¿Estás seguro de eliminar la nota?");
    if (rta) {
      e.target.parentElement.parentElement.remove();
      let cards_actuales = contenido.innerHTML;
      localStorage.setItem("productos", cards_actuales);
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  let cards_guardados = localStorage.getItem("productos");
  if (cards_guardados != null) {
    contenido.innerHTML = cards_guardados;
  }
});

contenido.addEventListener("click", function (e) {
  if (e.target.dataset.accion == "modificar") {
    let card = e.target.parentElement.parentElement;
    let tipo_actual;

    if (card.classList.contains("bebida")) {
      tipo_actual = "bebida";
    } else if (card.classList.contains("electronica")) {
      tipo_actual = "electronica";
    } else if (card.classList.contains("comida")) {
      tipo_actual = "comida";
    } else if (card.classList.contains("indumentaria")) {
      tipo_actual = "indumentaria";
    }

    card.dataset.modificando = tipo_actual;

    let producto_actual = document.querySelector(
      "[data-modificando] h3"
    ).textContent;
    let descripcion_actual = document.querySelector(
      "[data-modificando] p:last-of-type span"
    ).textContent;

    producto_mod.value = producto_actual;
    descripcion_mod.value = descripcion_actual;

    document.querySelectorAll("#productos_mod option").forEach((option) => {
      option.removeAttribute("selected");
    });

    document
      .querySelector(`#productos_mod option[value="${tipo_actual}"]`)
      .setAttribute("selected", "selected");
  }
});

document.getElementById("cancelar_mod").addEventListener("click", function () {
  let modificando = document.querySelector("[data-modificando]");
  modificando.removeAttribute("data-modificando");
});

form_modificar.addEventListener("submit", function (e) {
  e.preventDefault();

  let modificando = document.querySelector("[data-modificando]");
  let producto_modificado = producto_mod.value;
  let descripcion_modificada = descripcion_mod.value;
  let tipo_modificado = document.querySelector(
    "#productos_mod option:checked"
  ).value;

  let tipo_actual = modificando.dataset.modificando;

  let h3 = document.querySelector("[data-modificando] h3");
  let span_descripcion = document.querySelector(
    "[data-modificando] p:first-of-type span"
  );

  h3.textContent = producto_modificado;
  span_descripcion.textContent = descripcion_modificada;

  modificando.classList.replace(tipo_actual, tipo_modificado);

  modificando.removeAttribute("data-modificando");


  let cards_actuales = contenido.innerHTML;
    console.log(cards_actuales)
    localStorage.setItem("productos", cards_actuales);



});
