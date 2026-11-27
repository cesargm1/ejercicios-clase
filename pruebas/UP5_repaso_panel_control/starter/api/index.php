<?php
/* =====================================================================
   ✅ Dado · API del panel de administración · No la modifiques
   ---------------------------------------------------------------------
   Un solo fichero, sin base de datos. Se llama así:

     GET api/?r=resumen          → { ventasHoy, pedidosHoy, ticketsAbiertos }
     GET api/?r=pedidos          → [ { id, clienteId, total, estado }, ... ]
     GET api/?r=clientes/{id}    → { id, nombre, ciudad }       (404 si no existe)
     GET api/?r=actividad        → { hora, texto }               (un evento nuevo cada vez)

   Cada respuesta tarda entre 0,3 y 1,2 s, como un servidor real.
   Con &fallos=1, la mitad de las peticiones responden 500.
   Los errores siempre llegan como JSON: { "error": "mensaje", "codigo": 404 }
   ===================================================================== */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');      // por si el HTML se abre con Live Server
header('Cache-Control: no-store');

function responder(int $codigo, $datos): never {
    http_response_code($codigo);
    echo json_encode($datos, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}
function fallar(int $codigo, string $mensaje): never {
    responder($codigo, ['error' => $mensaje, 'codigo' => $codigo]);
}

const RESUMEN = ['ventasHoy' => 1840.5, 'pedidosHoy' => 23, 'ticketsAbiertos' => 4];

const PEDIDOS = [
    ['id' => 1021, 'clienteId' => 3, 'total' => 54.9,  'estado' => 'enviado'],
    ['id' => 1022, 'clienteId' => 1, 'total' => 129.0, 'estado' => 'enviado'],
    ['id' => 1023, 'clienteId' => 4, 'total' => 18.5,  'estado' => 'preparando'],
    ['id' => 1024, 'clienteId' => 2, 'total' => 89.95, 'estado' => 'pendiente de pago'],
];

const CLIENTES = [
    1 => ['id' => 1, 'nombre' => 'Laura Gómez', 'ciudad' => 'Benidorm'],
    2 => ['id' => 2, 'nombre' => 'Marc Soler',  'ciudad' => 'Alicante'],
    3 => ['id' => 3, 'nombre' => 'Ana Ruiz',    'ciudad' => 'Elche'],
    4 => ['id' => 4, 'nombre' => 'Pablo Martí', 'ciudad' => 'La Vila Joiosa'],
];

const EVENTOS = [
    'Nuevo pedido recibido', 'Pago confirmado', 'Ticket de soporte abierto',
    'Ticket de soporte cerrado', 'Producto sin stock', 'Nuevo cliente registrado',
    'Pedido enviado', 'Valoración de 5 estrellas',
];

if ($_SERVER['REQUEST_METHOD'] !== 'GET') fallar(405, 'Esta API solo admite GET.');

usleep(random_int(300, 1200) * 1000);                       // latencia de red simulada

if (($_GET['fallos'] ?? '') === '1' && random_int(0, 1) === 1) {
    fallar(500, 'Error interno del servidor (simulado).');
}

$ruta = trim($_GET['r'] ?? '', '/');
$partes = explode('/', $ruta);

switch (true) {
    case $ruta === 'resumen':
        responder(200, RESUMEN);

    case $ruta === 'pedidos':
        responder(200, PEDIDOS);

    case $partes[0] === 'clientes' && isset($partes[1]):
        $id = (int) $partes[1];
        if (!isset(CLIENTES[$id])) fallar(404, "No existe el cliente $id.");
        responder(200, CLIENTES[$id]);

    case $ruta === 'actividad':
        date_default_timezone_set('Europe/Madrid');
        responder(200, ['hora' => date('H:i:s'), 'texto' => EVENTOS[array_rand(EVENTOS)]]);

    default:
        fallar(404, "No existe la ruta «{$ruta}».");
}
