// Estado global del juego (Debe sincronizarse vía WebRTC/Firebase)
let gameState = {
    status: 'lobby', // lobby, playing, ended
    timeRemaining: 900, // 15 minutos en segundos
    score: 0,
    viento: 'N',
    transformador: {
        modeloActivo: 'TX-90',
        configurado: false,
        cargaPorcentaje: 0,
        quemado: false
    },
    subestacionActiva: false,
    energiaBateria: 0,
    zonas: {
        centro: { demanda: 15, cobertura: 0 },
        este: { demanda: 25, cobertura: 0 },
        oeste: { demanda: 25, cobertura: 0 },
        lago: { demanda: 40, cobertura: 0 }
    }
};

let currentRole = null;

// --- NAVEGACIÓN DE VISTAS ---
document.getElementById('btn-start-game').addEventListener('click', () => {
    document.getElementById('screen-lobby').classList.add('hidden');
    document.getElementById('screen-roles').classList.remove('hidden');
});

document.querySelectorAll('.role-card').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const role = e.target.getAttribute('data-role');
        assignRole(role);
    });
});

function assignRole(role) {
    currentRole = role;
    
    // Ocultar selección de roles
    document.getElementById('screen-roles').classList.add('hidden');
    
    // Mostrar top bar
    document.getElementById('top-bar').classList.remove('hidden');
    document.getElementById('current-role-display').innerText = `Rol: ${role.toUpperCase()}`;
    
    // Ocultar todos los paneles de rol
    document.querySelectorAll('.role-view').forEach(el => el.classList.add('hidden'));
    
    // Mostrar el panel específico
    document.getElementById(`role-${role}`).classList.remove('hidden');
}

// --- BUCLE PRINCIPAL DEL JUEGO (Debe correr en el Host) ---
function gameLoop() {
    if (gameState.status !== 'playing') return;
    
    // 1. Lógica de viento (Cambia cada 20-50s)
    // 2. Cálculo de eficiencia y energía
    // 3. Chequeo de sobrecargas y alertas
    // 4. Degradación de zonas
    // 5. Actualización de puntaje
    
    updateUI();
    requestAnimationFrame(gameLoop);
}

function updateUI() {
    document.getElementById('score-display').innerText = `${Math.floor(gameState.score)} pts`;
    // Aquí se actualizan los DOMs específicos según el currentRole
}
