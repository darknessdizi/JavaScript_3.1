const BYTES_IN_MB = 1048576;
const progressBar = document.getElementById('progress');

const myForm = document.getElementById('form');
myForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const request = new XMLHttpRequest();
    request.upload.addEventListener('progress', progressHandler);
    request.addEventListener('readystatechange', () => {
        if (request.readyState == 4) {
            console.log('Данные полностью загружены на сервер!');
        }
    });

    request.open('POST', 'https://students.netoservices.ru/nestjs-backend/upload');
    const file = new FormData(myForm);
    request.setRequestHeader('Content-Type', 'application/x-www-form-url');
    request.send(file);
});

function progressHandler(event) {
    // считаем размер загруженного и процент от полного размера
    const loadedMb = (event.loaded/BYTES_IN_MB).toFixed(1);
    const totalSizeMb = (event.total/BYTES_IN_MB).toFixed(1);
    const percentLoaded = Math.round((event.loaded / event.total) * 100);

    progressBar.value = percentLoaded;
    console.log(`${loadedMb} из ${totalSizeMb} МБ`);
    console.log( `Загружено ${percentLoaded}% |`);
  }