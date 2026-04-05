// Datos iniciales de libros
export const librosIniciales = [
    {
        id: 1,
        titulo: "Cien años de soledad",
        autor: "Gabriel García Márquez",
        isbn: "978-84-376-0494-7",
        anioPublicacion: 1967,
        disponible: true,
        fechaRegistro: "2024-01-15"
    },
    {
        id: 2,
        titulo: "El Quijote",
        autor: "Miguel de Cervantes",
        isbn: "978-84-239-7948-6",
        anioPublicacion: 1605,
        disponible: true,
        fechaRegistro: "2024-01-15"
    },
    {
        id: 3,
        titulo: "1984",
        autor: "George Orwell",
        isbn: "978-84-9759-329-8",
        anioPublicacion: 1949,
        disponible: true,
        fechaRegistro: "2024-01-15"
    }
];

export const UsuariosIniciales = [
    {
        id: 1,
        nombre: "Ana García",
        email: "ana.garcia@email.com",
        telefono: "555-1234",
        fecha: "2024-01-15",
        activo: true,
        prestamosActivos: 0
    },
    {
        id: 2,
        nombre: "Carlos Rodríguez",
        email: "carlos.rodriguez@email.com",
        telefono: "555-5678",
        fechaRegistro: "2024-01-20",
        activo: true,
        prestamosActivos: 1
    },
    {
        id: 3,
        nombre: "María López",
        email: "maria.lopez@email.com",
        telefono: "555-9012",
        fechaRegistro: "2024-02-01",
        activo: true,
        prestamosActivos: 0
    }
];

export const prestramosIniciales = [{
    id: 1,
    libroId: 3,
    usuarioId: 2,
    fechaPrestamo: "2024-01-20",
    fechaDevolucion: "2024-02-03",
    fechaRealDevolucion: null,
    estado: "activo",
    renovaciones: 0
}];

