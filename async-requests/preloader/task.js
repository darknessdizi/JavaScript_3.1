let request = new XMLHttpRequest();
request.open('GET', 'https://students.netoservices.ru/nestjs-backend/slow-get-courses');
request.responseType = 'json';
request.send();

request.onload = () => {
    if (request.status == 200) {
        let img = document.getElementById('loader');
        alert('Произошло обновление страницы');
        if (img.className.includes('active')) {
            img.classList.remove('loader_active');
        }
        const obj = document.getElementById('items');
        obj.innerHTML = '';
        const list = request.response.response.Valute;
        const storage = {};
        for (let key in list) {
            const newDiv = `
                <div class="item">
                    <div class="item__code">
                        ${list[key].CharCode}
                    </div>
                    <div class="item__value">
                        ${list[key].Value}
                    </div>
                    <div class="item__currency">
                        руб.
                    </div>
                </div>
                <span>**********</span>
            `;
            storage[list[key].CharCode] = list[key].Value;
            obj.insertAdjacentHTML('beforeend', newDiv);
        }
        localStorage.setItem('currencyRate', JSON.stringify(storage));
    } 
};

request.onprogress = (event) => {
        console.log(`Загрузка ${event.loaded}, ${event.total}, ${event.lengthComputable}`);
};


function currency() {
    const obj = JSON.parse(localStorage.getItem('currencyRate'));
    if (obj) {
        let img = document.getElementById('loader');
        if (img.className.includes('active')) {
            img.classList.remove('loader_active');
        }
        const div = document.getElementById('items');
        for (let key in obj) {
            const newDiv = `
                <div class="item">
                    <div class="item__code">
                        ${key}
                    </div>
                    <div class="item__value">
                        ${obj[key]}
                    </div>
                    <div class="item__currency">
                        руб.
                    </div>
                </div>
            `;
            div.insertAdjacentHTML('beforeend', newDiv);
        }
    }
}

currency();