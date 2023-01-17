const input = document.querySelector('input')
const button = document.querySelector('button')
const pokemonContainer = document.querySelector('.pokemon-container')
const $fetchAsync = document.getElementById("fetch-async")

button.addEventListener('click', (e) => {
    e.preventDefault(); //para que no se recargue la pagina
    traerPokemon(input.value);
    
})

const traerPokemon = async(pokemonName) => {
    
    try {
        
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.trim().toLowerCase()}/`)
        console.log(respuesta);
        if(!pokemonName) return //Clausula guarda 
        if(respuesta.status === 200){
            const datos = await respuesta.json();
            crearPokemon(datos)
            console.log(datos.name);
        }
        if(!respuesta.ok) throw { //ES UN RETURN QUE MANDA EL FLUJO AL CATCH
            status: respuesta.status,
            statusText: respuesta.statusText
        };

    } catch (error) {
        const message = error.statusText || "Elemento vacío";//Si viene vacio se le pone el texto
        $fetchAsync.innerHTML = `Error ${error.status}: ${message}`;
        
    }
}
const crearPokemon = async(pokemon) => {
    console.log(pokemon);
    //Para crear la img
    const img = document.createElement('img');
    img.src = pokemon.sprites.front_default;
    //para crear donde pondrá el nombre
    const h3 = document.createElement('h3');
    h3.textContent = pokemon.name;
    //Juntamos ambos elementos en un div
    const div = document.createElement('div');
    div.appendChild(img);
    div.appendChild(h3);

    //Pasamos al contenedor
    pokemonContainer.appendChild(div);

 }


