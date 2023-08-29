const openAbleItems = document.querySelectorAll('.able_to_open'),
    nav = document.querySelector('.header__nav'),
    burger = document.getElementById('burger'),
    forms = document.querySelectorAll('form'),
    closeModalBtns = document.querySelectorAll('[data-modal="close"]'),
    openModalBtns = document.querySelectorAll('[data-open="callback"]'),
    phoneInputs = document.querySelectorAll('input.phone');

openAbleItems.forEach((item) => {
    item.addEventListener('click', () => {
        item.classList.toggle('active');

        openAbleItems.forEach((item2) => {
            if (item2 !== item) {
                item2.classList.remove('active');
            }
        });
    });
});

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    nav.classList.toggle('active');

    if (burger.classList.contains('active')) {
        burger.querySelector('.burger__text').textContent = 'закрыть';
    } else {
        burger.querySelector('.burger__text').textContent = 'меню';
    }
});

for (const form of forms) {
    const items = form.querySelectorAll('.input-item');

    for (const item of items) {
        const input = item.querySelector('input');

        if (input.value.length > 0) {
            input.classList.add('filled');
        }

        input.addEventListener('input', () => {
            input.classList.remove('error');

            if (input.value.length > 0) {
                input.classList.add('filled');

                const noDigitsRegex = /^[a-zа-яё ]+$/;
                if (input.classList.contains('no-digits') && noDigitsRegex.test(input.value.toLowerCase())) {
                    input.classList.add('correct');
                } else {
                    input.classList.remove('correct');
                }
            } else {
                input.classList.remove('filled');
            }
        });
    }
}

const im = new Inputmask('+7 (999) 999-99-99');
phoneInputs.forEach((phone) => im.mask(phone));


document.querySelectorAll('form').forEach((form) => {
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log('form submit');
        let flagName = true,
            flagPhone = true,
            name = '',
            phone = '';

        const formInputs = form.querySelectorAll('input');

        formInputs.forEach(input => {
            if (input.classList.contains('text')) {

                if (input.classList.contains('correct')) {
                    name = input.value;
                    flagName = true;
                } else {
                    flagName = false;
                }
            }

            if (input.classList.contains('phone')) {

                if (!input.value.includes('_')) {
                    phone = input.value;
                    flagPhone = true;
                } else {
                    flagPhone = false;
                    input.classList.add('error');
                }
            }
        });

        if (flagName && flagPhone) {
            console.log('form sending')

            form.querySelector('button').classList.add('loading');

            const xhr = new XMLHttpRequest();
            // Определяем метод и URL для отправки данных на сервер
            xhr.open("POST", "/script/sendmail.php", true);

            // Определяем заголовки запроса
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

            xhr.send("phone=" + encodeURIComponent(phone)
                + "&name=" + encodeURIComponent(name));

            // Обработчик события изменения состояния запроса
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        form.reset();

                        form.querySelectorAll('input').forEach(input => {
                            input.classList.remove('filled');
                            input.classList.remove('error');
                            input.classList.remove('correct');
                        });

                        document.querySelector('.modal__callback').classList.add('send-success');
                    } else {
                        document.querySelector('.modal__error').classList.add('active')
                    }
                }
            };

            form.querySelector('button').classList.remove('loading');
        }
    });
});

closeModalBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.modal').forEach((modal) => {
            modal.classList.remove('active');
            document.body.classList.remove('lock');
            document.querySelector('.modal__callback').classList.remove('send-success');
        });
    });
});

openModalBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.modal').forEach((modal) => {
            modal.classList.add('active');
            document.body.classList.add('lock');

            burger.classList.remove('active');
            nav.classList.remove('active');

            burger.querySelector('.burger__text').textContent = 'меню';
        });
    });
});


const swiper = new Swiper('.swiper', {
    speed: 400,
    spaceBetween: 0,
    slidesPerView: 1,

    breakpoints: {
        999: {
            enabled: false,
        },
        579: {
            slidesPerView: 2,
        }
    },

    navigation: {
        nextEl: '.swiper-next',
        prevEl: '.swiper-prev',
    }
});

const swiperElement = document.querySelector('.swiper').swiper;

