import { UsuariosRepo } from "./usuariosRepo.js";

/**
 * Módulo de UI para la gestión de usuarios
 */

export const UsuariosUI = (() => {
    let modoEdicion = false;
    let usuarioEditandoId = null;

    /**
     * Escapa caracteres HTML
     */
    const escapeHTML = (str) => {
        if (!str) return '';
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    };

    /**
     * Formatea la fecha
     */
    const formatearFecha = (fechaStr) => {
        if(!fechaStr) return 'N/A';
        const fecha = new Date(fechaStr);
        return fecha.toLocaleDateString('es-ES');
    };

    /**
     * Renderizar la tabla de usarios
     */
    const renderizarTabla = () => {
        const tbody = document.getElementById('usuarios-tbody');
        const usuarios = UsuariosRepo.obtenerTodos();

        if(!tbody) return;

        if(usuarios.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="8" style="text-align: center;">
                        No hay usuarios registrados
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = usuarios.map(usuario => 
            `
                <tr>
                    <td>${usuario.id}</td>
                    <td>${escapeHTML(usuario.nombre)}</td>
                    <td>${escapeHTML(usuario.email)}</td>
                    <td>${escapeHTML(usuario.telefono)}</td>
                    <td>${formatearFecha(usuario.fechaRegistro)}</td>
                    <td class="${usuario.prestamosActivos > 0 ? 'estado-prestado' : ''}">
                        📚 ${usuario.prestamosActivos}
                    </td>
                    <td class="${usuario.activo ? 'estado-disponible' : 'estado-prestado'}">
                        ${usuario.activo ? '✅ Activo' : '❌ Inactivo'}
                    </td>
                    <td>
                        <button class="btn-editar" data-id="${usuario.id}">✏️ Editar</button>
                        <button class="btn-eliminar" data-id="${usuario.id}">🗑️ Eliminar</button>

                        ${usuario.activo ? 
                            `<button class="btn-desactivar" data-id="${usuario.id}">❌ Desactivar</button>` : 
                            `<button class="btn-activar" data-id="${usuario.id}">✅ Activar</button>`
                        }
                    </td>
                </tr>
            `
        ).join('');

        // Agregar event listener a los botones
        document.querySelectorAll('.btn-editar').forEach(btn => {
            btn.addEventListener('click', () => editarUsuario(parseInt(btn.dataset.id)));
        });

        document.querySelectorAll('.btn-eliminar').forEach(btn => {
            btn.addEventListener('click', () => eliminarUsuario(parseInt(btn.dataset.id)));
        });

        document.querySelectorAll('.btn-desactivar').forEach(btn => {
            btn.addEventListener('click', () => desactivarUsuario(parseInt(btn.dataset.id)));
        });

        document.querySelectorAll('.btn-activar').forEach(btn => {
            btn.addEventListener('click', () => activarUsuario(parseInt(btn.dataset.id)));
        });
    };

    /**
     * limpiarFormulario
     */
    const limpiarFormulario = () => {
        document.getElementById('nombre').value = '';
        document.getElementById('email').value = '';
        document.getElementById('telefono').value = '';
        document.getElementById('usuario-activo').value = 'true';
        modoEdicion = false;
        usuarioEditandoId = null;
        document.getElementById('form-title-usuario').textContent = '➕ Agregar nuevo usuario';
        document.getElementById('btn-cancelar').style.display = 'none';
        document.getElementById('btn-guardar').textContent = '💾 Guardar usuario';
    };

    /**
     * Mostrar un mensaje
     */
    const mostrarMensaje = (mensaje, tipo = 'info') => {
        const mensajeDiv = document.createElement('div');
        mensajeDiv.className = `mensaje mensaje-${tipo}`;
        mensajeDiv.textContent = mensaje;
        const section = document.getElementById('usuarios-section');
        const existingMessage = section.querySelector('.mensaje');
        if(existingMessage) existingMessage.remove();

        section.insertBefore(mensajeDiv, section.firstChild);

        setTimeout(() => {
            mensajeDiv.remove();
        }, 3000);
    };

    /**
     * Guarda un usuario (nuevo o actualiza)
     */

    const guardarUsuario = (event) => {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const activo = document.getElementById('usuario-activo').value === 'true';

        if(!nombre || !email || !telefono) {
            mostrarMensaje('❌ Todos los campos son obligatorios', 'error');
            return;
        }

        const datosUsuario =  {
            nombre,
            email,
            telefono,
            activo
        };

        let resultado;
        if(modoEdicion && usuarioEditandoId) {
            resultado = UsuariosRepo.actualizar(usuarioEditandoId, datosUsuario);
            if(resultado) {
                mostrarMensaje(`✅ Usuario "${resultado.nombre}" actualizado`, 'exito');
            }
        } else {
            resultado = UsuariosRepo.agregar(datosUsuario);
            if(resultado) {
                mostrarMensaje(`✅ Usuario "${resultado.nombre}" agregado`, 'exito');
            }
        }

        if(resultado) {
            limpiarFormulario();
            renderizarTabla();
        } else {
            mostrarMensaje(`❌ Error al guardar el usuario`, 'error');
        }
    };

    /**
     * Editar un usuario existente
     */
    const editarUsuario = (id) => {
        const usuario = UsuariosRepo.obtenerPorId(id);
        if(!usuario) {
            mostrarMensaje(`❌ Usuario no encontrado`, 'error');
            return;
        }

        document.getElementById('nombre').value = usuario.nombre;
        document.getElementById('email').value = usuario.email;
        document.getElementById('telefono').value = usuario.telefono;
        document.getElementById('usuario-activo').value = usuario.activo ? 'true' : 'false';

        modoEdicion = true;
        usuarioEditandoId = id;
        document.getElementById('form-title-usuario').textContent = '✏️ Editar usuario';
        document.getElementById('btn-cancelar').style.display = 'inline-block';
        document.getElementById('btn-guardar').textContent = '💾 Actualizar usuario';
        document.getElementById('usuario-form').scrollIntoView({ behavior: 'smooth' });
    };

    /**
     * Eliminar un usuario
     */
    const eliminarUsuario = (id) => {
        const usuario = UsuariosRepo.obtenerPorId(id);
        if(!usuario) {
            mostrarMensaje(`❌ Usuario no encontrado`, 'error');
            return;
        }

        if(usuario.prestamosActivos > 0) {
            mostrarMensaje(`❌ No se puede eliminar. Usuario tiene ${usuario.prestamosActivos} préstado(s) activo(s)`, 'error');
            return;
        }

        if(confirm(`¿Estás seguro de eliminar al usuario "${usuario.nombre}"`)) {
            const eliminado = UsuariosRepo.eliminar(id);
            if(eliminado) {
                mostrarMensaje(`✅ Usuario "${usuario.nombre}" eliminado`, 'error');
                renderizarTabla();
                if(modoEdicion && usuarioEditandoId === id) {
                    limpiarFormulario();
                }
            } else {
                mostrarMensaje(`❌ Error al eliminar el usuario`, 'error');
            }
        }
    };

    /**
     * Desactiva un usuario
     */
    const desactivarUsuario = (id) => {
        const usuario = UsuariosRepo.obtenerPorId(id);
        if(!usuario) {
            mostrarMensaje('❌ Usuario no encontrado', 'error');
            return;
        }

        try {
            usuario.desactivar();
            renderizarTabla();
            mostrarMensaje(`✅ Usuario "${usuario.nombre}" desactivado`, 'exito');
        } catch(error) {
            mostrarMensaje(`❌ ${error.message}`, 'error');
        }
    };

    /**
     * Activa un usuario
     */
    const activarUsuario = (id) => {
        const usuario = UsuariosRepo.obtenerPorId(id);
        if(!usuario) {
            mostrarMensaje(`❌ Usuario no encontrado`, 'error');
            return;
        }

        try {
            usuario.activar();
            renderizarTabla();
            mostrarMensaje(`✅ Usuario "${usuario.nombre}" activado`, 'exito');
        } catch(error) {
            mostrarMensaje(`❌ ${error.message}`, 'error');
        }
    };

    /**
     * Busca usuarios por término
     */
    const buscarUsuarios = () => {
        const termino = document.getElementById('buscar-usuario').value.trim();
        if(!termino) {
            renderizarTabla();
            return;
        }

        const resultados = UsuariosRepo.buscar(termino);
        const tbody = document.getElementById('usuarios-tbody');

        if(resultados.length === 0) {
            tbody.innerHTML = '<tr><td colspan="8" style="text-align: center;">No se encontraron resultados</td></tr>';
            return;
        }

        tbody.innerHTML = resultados.map(usuario => 
            `
                <tr>
                    <td>${usuario.id}</td>
                    <td>${escapeHTML(usuario.nombre)}</td>
                    <td>${escapeHTML(usuario.email)}</td>
                    <td>${escapeHTML(usuario.telefono)}</td>
                    <td>${formatearFecha(usuario.fechaRegistro)}</td>
                    <td>📚 ${usuario.prestamosActivos}</td>
                    <td class="${usuario.activo ? 'estado-disponible' : 'estado-prestado'}">
                        ${usuario.activo ? '✅ Activo' : '❌ Inactivo'}
                    </td>
                    <td>
                        <button class="btn-editar" data-id="${usuario.id}">✏️ Editar</button>
                        <button class="btn-eliminar" data-id="${usuario.id}">🗑️ Eliminar</button>
                        ${usuario.activo ? 
                            `<button class="btn-desactivar" data-id="${usuario.id}">🔴 Desactivar</button>` : 
                            `<button class="btn-activar" data-id="${usuario.id}">🟢 Activar</button>`
                        }
                    </td>
                </tr>
            `).join('');

            // Reasignar event listener
            document.querySelectorAll('.btn-editar').forEach(btn => {
                btn.addEventListener('click', () => editarUsuario(parseInt(btn.dataset.id)));
            });
            document.querySelectorAll('.btn-eliminar').forEach(btn => {
                btn.addEventListener('click', () => eliminarUsuario(parseInt(btn.dataset.id)));
            });
            document.querySelectorAll('.btn-desactivar').forEach(btn => {
                btn.addEventListener('click', () => desactivarUsuario(parseInt(btn.dataset.id)));
            });
            document.querySelectorAll('.btn-activar').forEach(btn => {
                btn.addEventListener('click', () => activarUsuario(parseInt(btn.dataset.id)));
            });
    };

    /**
     * Muestra todos los usuarios
     */
    const mostrarTodos = () => {
        document.getElementById('buscar-usuario').value = '';
        renderizarTabla();
    };

    /**
     * Inicializar la UI de usuarios
     */
    const inicializar = () => {
        renderizarTabla();
        
        // Event listeners
        document.getElementById('usuario-form').addEventListener('submit', guardarUsuario);
        document.getElementById('btn-cancelar').addEventListener('click', limpiarFormulario);
        document.getElementById('btn-buscar-usuario').addEventListener('click', buscarUsuarios);
        document.getElementById('btn-mostrar-todos-usuarios').addEventListener('click', mostrarTodos);
        document.getElementById('buscar-usuario').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') buscarUsuarios();
        });
    };

    return {
        inicializar
    };
})();