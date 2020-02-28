console.log('JavaScript load on client side.')

const form = document.querySelector('form');
const locationTxt = form.querySelector('input');
const msg1 = document.querySelector('#msg-1');
const msg2 = document.querySelector('#msg-2');


form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    msg1.textContent = 'Loading...'
    msg2.textContent = ''

    fetch(`/weather?address=${locationTxt.value}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msg1.textContent = data.error;
                msg2.textContent = '';
            } else {
                msg1.textContent = data.forecast.text;
                msg2.textContent = data.location;
            }
        });
    });
});
