function controlarFinDePartidaJugadas(){
	/*Matriz de las posibles jugadas*/
	const posiblesJugadas = [
		[0,1,2],
		[3,4,5],
		[6,7,8],
		[0,3,6],
		[1,4,7],
		[2,5,8],
		[0,4,8],
		[2,4,6]
	]

	for (let i=0; i<8; i++){
		if (vector_de_ingreso[posiblesJugadas[i][0]] == vector_de_ingreso[posiblesJugadas[i][1]] && vector_de_ingreso[posiblesJugadas[i][0]] == vector_de_ingreso[posiblesJugadas[i][2]] && vector_de_ingreso[posiblesJugadas[i][0]] != 0){
			if (vector_de_ingreso[posiblesJugadas[i][0]] == 1){
				return 1
			}else{
				return 2
			}
		}
	}
	return 0;
}
	
/*Traer elemento html a javascript*/
const rellenarVector = (str) => {
	const vector = [9]
	for(let i=0; i<9; i++){
		vector[i] = document.getElementById(str+i)
	}
	return vector
}

const tomarAccion = (i) => {
	if(ganador == 0 && se_puede[i]){
		if(jugada){
			texto[i].innerText="x"
			texto[i].classList.add("elemento-x")
			vector_de_ingreso[i] = 1;

			turno_x.classList.remove("esta-activo")
			turno_o.classList.add("esta-activo")
		}else{
			texto[i].innerText="o"
			texto[i].classList.add("elemento-o")
			vector_de_ingreso[i] = 2;

			turno_o.classList.remove("esta-activo")
			turno_x.classList.add("esta-activo")
		}
		jugada = !jugada
		se_puede[i] = false;
	}
	ganador = controlarFinDePartidaJugadas()
	// console.log(`Ganador ${ganador}`)
	if(ganador == 1){
		mensaje_final.style.display="flex"
		elemento_ganador_x.innerHTML="x"
		elemento_ganador_o.innerHTML=""
		mensaje_ganador.innerHTML="¡GANADOR!"
	}else if(ganador == 2){
		mensaje_final.style.display="flex"
		elemento_ganador_o.innerHTML="o"
		elemento_ganador_x.innerHTML=""
		mensaje_ganador.innerHTML="¡GANADOR!"
	}else if(!controlarFinDePartidaVector()){
		mensaje_final.style.display="flex"
		elemento_ganador_x.innerHTML="x"
		elemento_ganador_o.innerHTML="o"
		mensaje_ganador.innerHTML="¡EMPATE!"
	}
}
const controlarFinDePartidaVector = () => {
	for(let i=0; i<9; i++){
		if(se_puede[i]){
			return true
		}
	}
	return false
}
const eventoClick = () => {
	const vector = [9]
	
	for(let i=0; i<9; i++){
		vector[i] = caja[i].addEventListener("click", () => tomarAccion(i) )
	}

	return vector
}

const reiniciarJuego = () => {
	mensaje_final.style.display="none"
	se_puede = [
		true,true,true,true,true,true,true,true,true
	]
	vector_de_ingreso = [
		0,0,0,0,0,0,0,0,0
	]
	jugada = true
	ganador = 0

	for(let i=0; i<9; i++){
		texto[i].classList.remove("elemento-x")
		texto[i].classList.remove("elemento-o")
		texto[i].innerText=""
	}
	turno_x.classList.add("esta-activo")
	turno_o.classList.remove("esta-activo")
}

let jugada = true;
let ganador = 0;

const turno_x = document.getElementById("turno-x")
const turno_o = document.getElementById("turno-o")

const caja = rellenarVector("caja-");
const texto = rellenarVector("texto-");

const mensaje_final = document.getElementById("mensaje-final")
const elemento_ganador_x = document.getElementById("elemento-ganador-x")
const elemento_ganador_o = document.getElementById("elemento-ganador-o")


const mensaje_ganador = document.getElementById("mensaje-ganador")
const boton_reinicio = document.getElementById("boton-reinicio")

const boton_presionado = boton_reinicio.addEventListener("click", reiniciarJuego)

let cajas_activas = eventoClick()

let vector_de_ingreso = [
	0,0,0,0,0,0,0,0,0
]

let se_puede = [
	true,true,true,true,true,true,true,true,true
]
