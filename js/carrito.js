// 1. Inicializar carrito
import { productos } from "./productos.js";

// Comprobamos si localStorage existe antes de intentar leerlo
let carrito = [];

if (typeof localStorage !== 'undefined') {
    // Estamos en el navegador
    carrito = JSON.parse(localStorage.getItem('carrito')) || [];
} else {
    // Estamos en VS Code (Node.js), iniciamos vacío sin leer nada
    console.log("Nota: localStorage no está disponible en este entorno. Se inicia carrito vacío.");
}

// Función auxiliar para guardar el carrito si se cierra el navegador
const saveCart = () => {
    if (typeof localStorage !== 'undefined') {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }
};

// 2. Obtener carrito
const getCart = () => {
    return carrito;
};

// 3. Añadir al carrito
const addToCart = (productId) => {
    const productInfo = productos.find(p => p.id === productId); // Buscamos el producto en la lista importada (productos.js)

    if (!productInfo) {
        console.error("Producto no encontrado con ID:", productId);
        return;
    }

    const existingItem = carrito.find(item => item.id === productId);

    if (existingItem) {
        if (existingItem.cantidad < productInfo.stock) { // CASO A: YA EXISTE EN EL CARRITO 
            existingItem.cantidad++; // Validamos Stock antes de sumar
            console.log(`Sumado 1. Ahora tienes ${existingItem.cantidad} de ${productInfo.nombre}`);
        } else {
            console.warn(`No hay suficiente stock disponible. Solo quedan ${productInfo.stock} unidades.`);
            return;
        }
    } else { // CASO B: ES NUEVO EN EL CARRITO
        if (productInfo.stock > 0) { // Validamos que haya al menos 1 en stock
            carrito.push({ id: productId, cantidad: 1 });
            console.log(`Producto ${productInfo.nombre} añadido al carrito.`);
        } else {
            console.warn("El producto está agotado.");

            return;
        }
    }
    saveCart(); // Guardar cambios en localStorage
};


// 4. Actualizar cantidad en el carrito
const updateQuantity = (productId, newQuantity) => {
    const existingItem = carrito.find(item => item.id === productId);
    const productInfo = productos.find(p => p.id === productId);

    if (existingItem && productInfo) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else if (newQuantity > productInfo.stock) {
            console.warn(`No puedes pedir ${newQuantity}, solo hay ${productInfo.stock}.`);
        } else {
            existingItem.cantidad = newQuantity;
            saveCart();
            console.log(`Cantidad actualizada a ${newQuantity}.`);
        }
    }
};

// 5. Eliminar del carrito
const removeFromCart = (productId) => {
    carrito = carrito.filter(item => item.id !== productId);
    saveCart();
    console.log(`Producto ${productId} eliminado.`);
};

// 6. Calcular Total
const calculateTotal = () => {
    const productMap = new Map(productos.map(p => [p.id, p.precio]));
    let total = 0;

    for (const item of carrito) {
        const price = productMap.get(item.id);
        if (price !== undefined) {
            total += price * item.cantidad;
        }
    }
    return total;
};



// --- ZONA DE PRUEBAS ---

if (typeof window !== 'undefined') {
    window.addToCart = addToCart;
    window.removeFromCart = removeFromCart;
    window.updateQuantity = updateQuantity;
    window.getCart = getCart;
    window.calculateTotal = calculateTotal;
    window.clearCart = () => { carrito = []; saveCart(); console.log("Carrito vaciado"); };
}