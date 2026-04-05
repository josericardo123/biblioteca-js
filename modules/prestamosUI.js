import { PrestamosRepo } from './prestamosRepo.js';
import { LibrosRepo } from './librosRepo.js';
import { UsuariosRepo } from './usuariosRepo.js';

/**
 * Módulo de UI para la gestión de préstamos
 */
export const PrestamosUI = (() => {
    let tabActual = 'activos';

    /**
     * Formatea una fecha
     */
    const formatearFecha = (fechaStr) => {
        if(!fechaStr) return 'N/A';
        const fecha = new Date(fechaStr);
        return fecha.toLocaleDateString('es-ES');
    };

    /**
     * Calcula días restantes
     */
    const calcularDiasRestantes = (fechaVencimiento) => {
        const hoy = new Date();
        const vencimiento = new Date(fechaVencimiento);
        hoy.setHours(0,0,0,0);
        vencimiento.setHours(0,0,0,0);

        const diferencia = vencimiento - hoy;
        const dias = Math.ceil(diferencia / (1000 * 60 * 60 * 24));
        return dias;
    };

    /**
     * Carga los selectores de libros y usuarios
     */
    const cargarSelectores = () => {
        const librosSelect = document.getElementById('libro-id');
        const usuarioSelect = document.getElementById('usuario-id');

        // Cargar libros disponibles
        const libros = LibrosRepo.obtenerDisponibles();
        librosSelect.innerHTML = '<option value="">Seleccionar libro...</option>';
        libros.forEach(libro => {
            librosSelect.innerHTML += `
                <option value="${libro.id}">${libro.titulo} - ${libro.autor}</option>
            `;
        });

        // Cargar usuarios activos
        const usuarios = UsuariosRepo.obtenerActivos();
        usuarioSelect.innerHTML = '<option value="">Seleccionar usuario...</option>';
        usuarios.forEach(usuario => {
            usuarioSelect.innerHTML += `
                <option value="${usuario.id}">${usuario.nombre} (${usuario.email})</option>
            `;
        });
    };

    /**
     * Renderizar la tabla de préstamos activos
     */
    const renderizarActivos = () => {
        const tbody = document.getElementById('prestamos-tbody');
        const prestamos = PrestamosRepo.obtenerActivos();
        // console.table(prestamos);
        if(prestamos.length === 0) {
            tbody.innerHTML = '<tr><td colspan="8" style="text-align: center;">No hay préstamos activos</td></tr>';
            return;
        }

        tbody.innerHTML = prestamos.map(prestamo => {
            const libro = LibrosRepo.obtenerPorId(prestamo.libroId);
            const usuario = UsuariosRepo.obtenerPorId(prestamo.usuarioId);
            const diasRestantes = calcularDiasRestantes(prestamo.fechaDevolucion);
            const estaVencido = diasRestantes < 0;

             const prestamoId = prestamo.id;
            console.log(`🔍 Renderizando préstamo ID: ${prestamoId}`); // Depuración
            return `
                <tr>
                    <td>${prestamo.id}</td>
                    <td>${libro?.titulo || 'N/A'}</td>
                    <td>${usuario?.nombre || 'N/A'}</td>
                    <td>${formatearFecha(prestamo.fechaPrestamo)}</td>
                    <td class="${estaVencido ? 'estado-vencido' : ''}">${formatearFecha(prestamo.fechaDevolucion)}</td>
                    <td class="${estaVencido ? 'estado-vencido' : 'estado-activo'}">
                        ${estaVencido ? `Vencido hace ${Math.abs(diasRestantes)} días` : `${diasRestantes} días`}
                    </td>
                    <td>${prestamo.renovaciones}/2</td>
                    <td>
                        <button class="btn-devolver" data-id="${prestamo.id}">📖 Devolver</button>
                        ${!estaVencido && prestamo.renovaciones < 2 ? 
                            `<button class="btn-renovar" data-id="${prestamo.id}">🔄 Renovar</button>` : ''}
                    </td>
                </tr>
            `; 
        }).join('');

        // Agregar event Listener
        document.querySelectorAll('.btn-devolver').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                console.log(`🖱️ Click en devolver para ID: ${id}`);
                if(id && !isNaN(id)){
                    //console.log(`ID: ${id}`);
                    devolverPrestamo(id);
                } else {
                    console.error('❌ ID inválido:', btn.dataset.id);
                    mostrarMensaje('❌ Error: ID de préstamo inválido', 'error');
                }
            });
        });

        document.querySelectorAll('.btn-renovar').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                console.log(`🖱️ Click en renovar para ID: ${id}`);
                if (id && !isNaN(id)) {
                    renovarPrestamo(id);
                } else {
                    console.error('❌ ID inválido:', btn.dataset.id);
                    mostrarMensaje('❌ Error: ID de préstamo inválido', 'error');
                }
            });
        });
    };

    /**
     * Renderizar el historial
     */
    const renderizarHistorial = () => {
        const tbody = document.getElementById('historial-tbody');
        const prestamos = PrestamosRepo.obtenerTodos().filter(p => p.estado !== 'activo');

        if(prestamos.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" style="text-align: center;">No hay historial de préstamos</td></tr>';
            return;
        }

        tbody.innerHTML = prestamos.map(prestamo => {
            const libro = LibrosRepo.obtenerPorId(prestamo.libroId);
            const usuario = UsuariosRepo.obtenerPorId(prestamo.usuarioId);

            return `
                <tr>
                    <td>${prestamo.id}</td>
                    <td>${libro?.titulo || 'N/A'}</td>
                    <td>${usuario?.nombre || 'N/A'}</td>
                    <td>${formatearFecha(prestamo.fechaPrestamo)}</td>
                    <td>${formatearFecha(prestamo.fechaDevolucion)}</td>
                    <td>
                        ${prestamo.fechaRealDevolucion ? formatearFecha(prestamo.fechaRealDevolucion) : 'N/A'}
                    </td>
                    <td class="estado-devuelto">✅ ${prestamo.estado}</td>
                </tr>
            `;
        }).join('');
    };

    /**
     * Renderizar préstamos vencidos
     */
    const renderizarVencidos = () => {
        const tbody = document.getElementById('vencidos-tbody');
        const vencidos = PrestamosRepo.obtenerVencidos();
        
        if (vencidos.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" style="text-align: center;">No hay préstamos vencidos</td></tr>';
            return;
        }

        tbody.innerHTML = vencidos.map(prestamo => {
            const libro = LibrosRepo.obtenerPorId(prestamo.libroId);
            const usuario = UsuariosRepo.obtenerPorId(prestamo.usuarioId);
            const diasRetraso = Math.abs(calcularDiasRestantes(prestamo.fechaDevolucion));
            const multa = diasRetraso * 5;

            return `
                <tr>
                    <td>${prestamo.id}</td>
                    <td>${libro?.titulo || 'N/A'}</td>
                    <td>${usuario?.nombre || 'N/A'}</td>
                    <td class="estado-vencido">${formatearFecha(prestamo.fechaDevolucion)}</td>
                    <td class="estado-vencido">${diasRetraso} días</td>
                    <td class="estado-vencido">$${multa}</td>
                    <td>
                        <button class="btn-devolver-vencido" data-id="${prestamo.id}">📖 Devolver</button>
                    </td>
                </tr>
            `;
        }).join('');
        
        // Event listeners para botones de devolución en vencidos
        document.querySelectorAll('.btn-devolver-vencido').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                if (id && !isNaN(id)) {
                    devolverPrestamo(id);
                }
            });
        });
    };

    /**
     * Renderizar según la pestaña activa
     */
    const renderizar = () => {
        cargarSelectores();

        switch(tabActual) {
            case 'activos':
                renderizarActivos();
                break;
            case 'historial':
                renderizarHistorial();
                break;
            case 'vencidos': 
                renderizarVencidos();
                break;
        }   
    };

    /**
     * Cambia de pestaña
     */
    const cambiarTab = (tabId) => {
        console.log(`📑 Cambiando a pestaña: ${tabId}`);
        tabActual = tabId;

        // Actualizar clases de los botones
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.tab === tabId) {  // ← CORREGIDO: dataset.tab
                btn.classList.add('active');
            }
        });

        // Mostrar contenido correspondiente
        document.querySelectorAll('.tab-content').forEach(content => {
            content.style.display = 'none';
        });
        
        const tabElement = document.getElementById(`tab-${tabId}`);
        if (tabElement) {
            tabElement.style.display = 'block';
        } else {
            console.error(`❌ No se encontró el elemento tab-${tabId}`);
        }

        renderizar();
    };

    /**
     * Crear nuevo préstamo
     */
    const crearPrestamo = (event) => {
        event.preventDefault();

        const libroId = parseInt(document.getElementById('libro-id').value);
        const usuarioId = parseInt(document.getElementById('usuario-id').value);
        const fechaPrestamo = document.getElementById('fecha-prestamo').value;

        if(!libroId || !usuarioId || !fechaPrestamo) {
            mostrarMensaje('❌ Todos los campos son obligatorios', 'error');
            return;
        }

        const resultado = PrestamosRepo.crearPrestamo(libroId, usuarioId, fechaPrestamo);
        if(resultado) {
            mostrarMensaje(`✅ Préstamo creado exitosamente`, 'exito');
            document.getElementById('prestamo-form').reset();
            document.getElementById('fecha-prestamo').value = new Date().toISOString().split('T')[0];
            renderizar();
        } else {
            mostrarMensaje('❌ Error al crear el préstamo', 'error');
        }
    };

    /**
     * Devolver préstamo
     */
    const devolverPrestamo = (id) => {
        console.log(`📖 Devolver préstamo llamado con ID: ${id}, tipo: ${typeof id}`);
        
        // Validar ID antes de continuar
        if (!id || isNaN(id) || id <= 0) {
            console.error('❌ ID de préstamo inválido:', id);
            mostrarMensaje('❌ Error: ID de préstamo inválido', 'error');
            return;
        }
        
        if (confirm('¿Estás seguro de registrar la devolución de este libro?')) {
            const resultado = PrestamosRepo.registrarDevolucion(id);
            if (resultado) {
                mostrarMensaje(`✅ Devolución registrada`, 'exito');
                renderizar();
            } else {
                mostrarMensaje('❌ Error al registrar devolución', 'error');
            }
        }
    };

    /**
     * Renovar préstamo
     */
    const renovarPrestamo = (id) => {
        console.log(`🔄 Renovar préstamo llamado con ID: ${id}`);
        
        if (!id || isNaN(id) || id <= 0) {
            console.error('❌ ID de préstamo inválido:', id);
            mostrarMensaje('❌ Error: ID de préstamo inválido', 'error');
            return;
        }
        
        if (confirm('¿Estás seguro de renovar este préstamo? Se añadirán 7 días más.')) {
            const resultado = PrestamosRepo.renovarPrestamo(id);
            if (resultado) {
                mostrarMensaje(`✅ Préstamo renovado. Nueva fecha: ${formatearFecha(resultado.fechaDevolucion)}`, 'exito');
                renderizar();
            } else {
                mostrarMensaje('❌ Error al renovar préstamo', 'error');
            }
        }
    };

    /**
     * Buscar préstamo
     */
    const buscarPrestamos = () => {
        const termino = document.getElementById('buscar-prestamo').value.toLowerCase();
        if (!termino) {
            renderizar();
            return;
        }

        const todos = PrestamosRepo.obtenerTodos();
        const filtrados = todos.filter(p => {
            const libro = LibrosRepo.obtenerPorId(p.libroId);
            const usuario = UsuariosRepo.obtenerPorId(p.usuarioId);
            return (libro?.titulo.toLowerCase().includes(termino) || 
                    usuario?.nombre.toLowerCase().includes(termino));
        });

        const tbody = document.getElementById('prestamos-tbody');
        if (filtrados.length === 0) {
            tbody.innerHTML = '<tr><td colspan="8" style="text-align: center;">No se encontraron resultados</td></tr>';
            return;
        }

        // Renderizar filtrados
        tbody.innerHTML = filtrados.filter(p => p.estado === 'activo').map(prestamo => {
            const libro = LibrosRepo.obtenerPorId(prestamo.libroId);
            const usuario = UsuariosRepo.obtenerPorId(prestamo.usuarioId);
            const diasRestantes = calcularDiasRestantes(prestamo.fechaDevolucion);
            const estaVencido = diasRestantes < 0;

            return `
                <tr>
                    <td>${prestamo.id}</td>
                    <td>${libro?.titulo || 'N/A'}</td>
                    <td>${usuario?.nombre || 'N/A'}</td>
                    <td>${formatearFecha(prestamo.fechaPrestamo)}</td>
                    <td>${formatearFecha(prestamo.fechaDevolucion)}</td>
                    <td>${diasRestantes} días</td>
                    <td>${prestamo.renovaciones}/2</td>
                    <td>
                        <button class="btn-devolver" data-id="${prestamo.id}">📖 Devolver</button>
                        ${!estaVencido && prestamo.renovaciones < 2 ? 
                            `<button class="btn-renovar" data-id="${prestamo.id}">🔄 Renovar</button>` : ''}
                    </td>
                </tr>
            `;
        }).join('');

        // Event listeners
        document.querySelectorAll('.btn-devolver').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                if (id && !isNaN(id)) devolverPrestamo(id);
            });
        });
        
        document.querySelectorAll('.btn-renovar').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                if (id && !isNaN(id)) renovarPrestamo(id);
            });
        });
    };

    /**
     * Muestra un mensaje
     */
    const mostrarMensaje = (mensaje, tipo = 'info') => {
        const mensajeDiv = document.createElement('div');
        mensajeDiv.className = `mensaje mensaje-${tipo}`;
        mensajeDiv.textContent = mensaje;

        const section = document.getElementById('prestamos-section');
        const existingMessage = section.querySelector('.mensaje');
        if(existingMessage) existingMessage.remove();

        section.insertBefore(mensajeDiv, section.firstChild);

        setTimeout(() => {
            mensajeDiv.remove();
        }, 3000);
    };

    /**
     * Inicializar la UI de préstamo
     */
    const inicializar = () => {
        // Configurar fecha por defecto
        document.getElementById('fecha-prestamo').value = new Date().toISOString().split('T')[0];

        // Configurar tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => cambiarTab(btn.dataset.tab));
        });

        // Configurar eventos
        document.getElementById('prestamo-form').addEventListener('submit', crearPrestamo);
        document.getElementById('btn-buscar-prestamo').addEventListener('click', buscarPrestamos);
        document.getElementById('btn-mostrar-todos-prestamos').addEventListener('click', () => renderizar());
        document.getElementById('buscar-prestamo').addEventListener('keypress', (e) => {
            if(e.key === 'Enter') buscarPrestamos();
        });
    };

    return {
        inicializar
    };
})();