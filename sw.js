//Archivos a cachear
const nombreCache = 'apv-v6'
const archivos = [
    "/",
    "/index.html",
    "/css/bootstrap.css",
    "/css/styles.css",
    "/error.html",
    "/js/app.js",
    "/js/appSW.js"
]

self.addEventListener('install', e => {
    console.log('Instalando el sw')
 //El metodo waitUntil espera a que se descarguen todos los archivos de cache
    e.waitUntil(
        caches.open(nombreCache)
            .then( cache => {
                console.log('cacheando')
                //El metodo addAll sirve para agregar un arreglo de archivos, si fuese solo uno usariamos el metodo add
                cache.addAll(archivos)
            })
    )
})

//Activar el SW
self.addEventListener('activate', e => {
    console.log('Sw activado')

    e.waitUntil(
        caches.keys()
            .then( keys => {
                // console.log(keys)
                return Promise.all(  
                    keys.filter(key => key !== nombreCache )
                        .map( key => caches.delete(key))
                )
            })
    )
})

// //Evento fetch para descargar
// self.addEventListener('fetch', e => {
//     console.log('Fetching...', e)
//     e.respondWith( 
//         caches.match(e.request)
//             .then( respuestaCache => {
//                 return respuestaCache
//             })
//         )
// })

// // Evento fetch para descargar
// self.addEventListener('fetch', e => {
    

//     e.respondWith(
//         caches.match(e.request)
//             .then(respuestaCache => {
//                 // Si hay una respuesta en caché, la devolvemos
//                 if (respuestaCache) {
//                     return respuestaCache;
//                 }

//                 // Si no hay respuesta en caché, hacemos la solicitud a la red
//                 return fetch(e.request)
//                     .then(respuestaRed => {
//                         // Aquí puedes agregar la respuesta a la caché antes de devolverla
//                         // Ejemplo: caches.open(nombreCache).then(cache => cache.put(e.request, respuestaRed));

//                         return respuestaRed;
//                     })
//                     .catch(() => caches.match('/error.html')
//                     // {
//                     //     // Manejo de errores al realizar la solicitud a la red
//                     //     console.error('Error en la solicitud de red:', error);

//                     //     // Puedes devolver una respuesta de error personalizada si lo deseas
//                     //     // Ejemplo: return new Response('Error en la solicitud de red', { status: 500 });
//                     // }
//                     );
//             })
//     );
// });

// Fetch events para el CSS, HTML, imagenes JS, y hasta llamados a fetch..
self.addEventListener('fetch', e => {

    e.respondWith(
        caches.match(e.request)
            .then(respuestaCache => {
                return respuestaCache || fetch(e.request);
            })
            .catch( () => caches.match('/error.html'))
    );
});