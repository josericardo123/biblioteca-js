import { LibrosRepo } from './librosRepo.js';

/**
 * Módulo de UI para gestión de libros
 */
export const LibrosUI = (() => {
    let modoEdicion = false;
    let libroEditandoId = null;

    /**
     * Renderiza la tabla de libros
     */
    const renderizarTabla = () => {
        const tboby = document.getElementById("libros-tbody");
        const libros = LibrosRepo.obtenerTodos();

        if(!libros) return;

        if(libros.length === 0) {
            tboby.innerHTML = '<tr><td colspan="7" style="text-align: center;">No hay libros registrados</td></tr>';
            return;
        }

        tboby.innerHTML = libros.map(libro => 
            `
                <tr>
                    <td>${libro.id}</td>
                    <td>${escapeHTML(libro.titulo)}</td>
                    <td>${escapeHTML(libro.autor)}</td>
                    <td>${escapeHTML(libro.isbn)}</td>
                    <td>${libro.anioPublicacion}</td>
                    <td class="${libro.disponible ? 'estado-disponible' : 'estado-prestado'}">
                        ${libro.disponible ? '✅ Disponible' : '❌ Prestado'}
                    </td>
                    <td>
                        <button class="btn-editar" data-id="${libro.id}">✏️ Editar</button>
                        <button class="btn-eliminar" data-id="${libro.id}">🗑️ Eliminar</button>
                    </td>
                </tr>
            `).join('');
        document.querySelectorAll('.btn-editar').forEach(btn => {
            btn.addEventListener('click', () => editarLibro(parseInt(btn.dataset.id)));
        });

        document.querySelectorAll('.btn-eliminar').forEach(btn => {
            btn.addEventListener('click', () => eliminarLibro(parseInt(btn.dataset.id)));
        });
    };

    /**
     * Escapa caracteres HTML para evitar XSS
     */
    const escapeHTML = (str) => {
        if(!str) return '';
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;') 
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    };

    /**
     * Limpia el formulario
     */
    const limpiarFormulario = () => {
        document.getElementById('titulo').value = '';
        document.getElementById('autor').value = '';
        document.getElementById('isbn').value = '';
        document.getElementById('anio').value = '';
        document.getElementById('disponible').value = 'true';
        modoEdicion = false;
        libroEditandoId = null;
        document.getElementById('form-title').textContent = '➕ Agregar nuevo libro';
        document.getElementById('btn-cancelar').style.display = 'none';
        document.getElementById('btn-guardar').textContent = '📖 Guardar libro'
    };

    /**
     * Muestra un mensaje 
     */
    const mostrarMensaje = (mensaje, tipo = 'info') => {
        const mensajeDiv = document.createElement('div');
        mensajeDiv.className = `mensaje mensaje-${tipo}`;
        mensajeDiv.textContent = mensaje;

        const section = document.getElementById('libros-section');
        section.insertBefore(mensajeDiv, section.firstChild);

        setTimeout(() => {
            mensajeDiv.remove();
        }, 3000);
    };

    /**
     * Guarda un libro (nuevo o actualizado)
     */
    const guardarLibro = (event) => {
        event.preventDefault();
        const titulo = document.getElementById('titulo').value.trim();
        const autor = document.getElementById('autor').value.trim();
        const isbn = document.getElementById('isbn').value.trim();
        const anio = parseInt(document.getElementById('anio').value)
        const disponible = document.getElementById('disponible').value === 'true';

        if(!titulo || !autor || !isbn || !anio) {
            mostrarMensaje('❌ Todos los campos son obligatorios', 'error');
            return;
        }

        const datosLibro = {
            titulo,
            autor,
            isbn,
            anioPublicacion: anio,
            disponible
         };

         let resultado;
         if(modoEdicion && libroEditandoId) {
            resultado = LibrosRepo.actualizar(libroEditandoId, datosLibro);
            if(resultado) {
                mostrarMensaje(`✅ Libro "${resultado.titulo}" actualizado`, 'exito');
            }
         } else {
            resultado = LibrosRepo.agregar(datosLibro);
            if(resultado) {
                mostrarMensaje(`✅ Libro "${resultado.titulo}" agregado`, 'exito');
            }
         }

         if(resultado) {
            limpiarFormulario();
            renderizarTabla();
         } else {
            mostrarMensaje(`❌ Error al guardar el libro`, 'error');
         }
    };

    /**
     * Edita un libro existente
     */
    const editarLibro = (id) => {
        const libro = LibrosRepo.obtenerPorId(id);
        if(!libro) {
            mostrarMensaje(`❌ Libro no encontrado`, 'error');
            return;
        }

        document.getElementById('titulo').value = libro.titulo;
        document.getElementById('autor').value = libro.autor;
        document.getElementById('isbn').value = libro.isbn;
        document.getElementById('anio').value = libro.anioPublicacion;
        document.getElementById('disponible').value = libro.disponible ? 'true' : 'false';
        modoEdicion = true;
        libroEditandoId = id;
        document.getElementById('form-title').textContent = `✏️ Editar libro`;
        document.getElementById('btn-cancelar').style.display = 'inline-block';
        document.getElementById('btn-guardar').textContent = 'Actualizar libro';

        // Scroll al formulario
        document.getElementById('libro-form').scrollIntoView({ behavior: 'smooth'} );
    };

    /**
    * Elimina un libro
    */
    const eliminarLibro = (id) => {
        const libro = LibrosRepo.obtenerPorId(id);
        if(!libro) {
            mostrarMensaje(`❌ Libro no encontrado`, 'error');
            return;
        }

        if(confirm(`¿Estás seguro de eliminar el libro "${libro.titulo}"?`)) {
            const eliminado = LibrosRepo.eliminar(id);
            if(eliminado) {
                mostrarMensaje(`✅ Libro "${libro.titulo}" eliminado`, 'exito');
                renderizarTabla();
                if(modoEdicion && libroEditandoId === id) {
                    limpiarFormulario();
                }
            } else {
                mostrarMensaje(`❌ Error al eliminar el libro`, 'error');
            }
        }
    };

    /**
     * Busca libro por término
     */
    const buscarLibros = () => {
        const termino = document.getElementById('buscar-libro').value.trim();
        if(!termino) {
            renderizarTabla();
            return;
        }

        const resultados = LibrosRepo.buscar(termino);
        const tbody = document.getElementById('libros-tbody');

        if(resultados.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" style="text-align: center;">No se encontraron resultados</td></tr>';
            return;
        }

        tbody.innerHTML = resultados.map(libro => 
            `
                <tr>
                    <td>${libro.id}</td>
                    <td>${escapeHTML(libro.titulo)}</td>
                    <td>${escapeHTML(libro.autor)}</td>
                    <td>${escapeHTML(libro.isbn)}</td>
                    <td>${libro.anioPublicacion}</td>
                    <td class="${libro.disponible ? 'estado-disponible' : 'estado-prestado'}">
                        ${libro.disponible ? '✅ Disponible' : '❌ Prestado'}
                    </td>
                    <td>
                        <button class="btn-editar" data-id="${libro.id}">✏️ Editar</button>
                        <button class="btn-eliminar" data-id="${libro.id}">🗑️ Eliminar</button>
                    </td>
                </tr>
            `).join('');
        
        // Resignar event listeners
        document.querySelectorAll('.btn-editar').forEach(btn => {
            btn.addEventListener('click', () => editarLibro(parseInt(btn.dateset.id)));
        });

        document.querySelectorAll('.btn-eliminar').forEach(btn => {
            btn.addEventListener('click', () => eliminarLibro(parseInt(btn.dataset.id)))
        });
    };

    /**
     * Mostrar todos los libros
     */
    const mostrarTodos = () => {
        document.getElementById('buscar-libro').value = '';
        renderizarTabla();
    };

    /**
     * Inicializa la UI
     */
    const inicializar = () => {
        renderizarTabla();

        document.getElementById('libro-form').addEventListener('submit', guardarLibro);
        document.getElementById('btn-cancelar').addEventListener('click', limpiarFormulario);
        document.getElementById('btn-buscar').addEventListener('click', buscarLibros);
        document.getElementById('btn-mostrar-todos').addEventListener('click', mostrarTodos);
        document.getElementById('buscar-libro').addEventListener('keypress', (e) => {
            if(e.key === 'Enter') buscarLibros();
        });
    };

    return {
        inicializar
    };

})();