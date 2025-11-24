let carrito = [];

const getCart = () => {
    return carrito;
};

const addToCart = (productId, quantity = 1) => {
    const existingItem = carrito.find(item => item.id === productId); 

    if (existingItem) {
        existingItem.cantidad += quantity; 
    } else { 
        carrito.push({ id: productId, cantidad: quantity })
    };
}

const removeFromCart = (productId) => {
    carrito = carrito.filter(item => item.id !== productId);
}


// *************** INICIO DE LA SECCIÓN DE PRUEBAS **************

console.log("--- Prueba 1: Añadir ítems nuevos ---");
addToCart(101, 2); 
addToCart(202, 1); 
console.log(getCart());

console.log("--- Prueba 2: Incrementar ítem 101 ---");
addToCart(101, 3); 
console.log(getCart());

console.log("--- Prueba 3: Eliminar ítem 202 ---");
removeFromCart(202);
console.log(getCart());


const productsData = [
    { id: 101, name: "Camiseta Básica", price: 15.00 },
    { id: 202, name: "Pantalón Denim", price: 40.00 },
    { id: 303, name: "Zapatillas Deportivas", price: 80.00 }
];


// *************** FIN DE LA SECCIÓN DE PRUEBAS **************


const calculateTotal = (productsData) => { 

    const productMap = new Map(productsData.map(p => [p.id, p.price])); 

    let total = 0;

    for (const item of carrito) {
        const price = productMap.get(item.id);
        // Usamos price !== undefined o price > 0, ya que price puede ser 0
        if (price !== undefined) { 
            total += price * item.cantidad;
        }
    }
    return total;
};



// *************** INICIO DE LA SECCIÓN DE PRUEBAS **************


carrito = [];

console.log("PRUEBA DE CÁLCULO DE TOTAL");


addToCart(101, 2); 
addToCart(202, 1); 

console.log("Estado actual del Carrito:", getCart());

let total1 = calculateTotal(productsData); 
console.log("Total Calculado 1:", total1); 

