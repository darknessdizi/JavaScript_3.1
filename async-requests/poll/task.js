const request = new XMLHttpRequest();
request.open('GET', 'https://students.netoservices.ru/nestjs-backend/poll');
request.send();

request.addEventListener('load', () => {
    if (request.status == 200) {
        const response = JSON.parse(request.response);
        const div = document.getElementById('poll__title');
        div.textContent = response.data.title;

        const nextDiv = div.nextElementSibling;
        for (let i=0; i<response.data.answers.length; i++) {
            const btn = document.createElement('button');
            btn.classList.add('poll__answer');
            btn.textContent = response.data.answers[i];
            nextDiv.insertAdjacentElement('beforeend', btn);
        }

        const buttons = document.getElementById('poll__answers');
        const listButton = buttons.querySelectorAll('button');
        listButton.forEach((element, key) => {
            element.addEventListener('click', () => {
                alert('Спасибо, Ваш голос засчитан!');
                const textPost = `vote=${response.id}&answer=${key}`;
                const requestPost = new XMLHttpRequest();
                requestPost.open('POST', 'https://students.netoservices.ru/nestjs-backend/poll');
                requestPost.setRequestHeader( 'Content-type', 'application/x-www-form-urlencoded' );
                requestPost.send(textPost);
                requestPost.addEventListener('load', () => {
                    if (requestPost.status == 201) {
                        const responsePost = JSON.parse(requestPost.response);
                        nextDiv.innerHTML = '';
                        let count = 0;
                        for (let i=0; i<responsePost.stat.length; i++) {
                            count += responsePost.stat[i].votes;
                        }
                        for (let i=0; i<responsePost.stat.length; i++) {
                            const div = document.createElement('div');
                            div.className = 'poll__answer';
                            const answer = responsePost.stat[i].answer;
                            const value = ((100 * responsePost.stat[i].votes) / count).toFixed(2);
                            div.innerHTML = `${answer}: <strong>${value}%</strong>`;
                            nextDiv.insertAdjacentElement('beforeend', div);
                        }
                    }
                });
            });
        });
    }
});