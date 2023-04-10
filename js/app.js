document.addEventListener('DOMContentLoaded', function() {

    const email = {
        email: '',
        subject: '',
        message: ''
    }

    //Select UI elements

    const inputEmail = document.querySelector("#email");

    const inputSubject = document.querySelector("#subject");
    
    const inputMessage = document.querySelector("#message");

    const btnSubmit = document.querySelector('#form button[type="submit"]')

    const btnReset = document.querySelector('#form button[type="reset"]')

    const spinner = document.querySelector('#spinner')

    

    //Assing events

    inputEmail.addEventListener('input', validate);

    inputSubject.addEventListener('input', validate); 

    inputMessage.addEventListener('input', validate);

    form.addEventListener('submit', sendEmail)

    btnReset.addEventListener('click', function(e) {
        e.preventDefault()

        // Restart Object
        resetForm()
    })

    function sendEmail(e) {
        e.preventDefault()

        
        
        spinner.classList.remove('hidden');
            
        setTimeout(() => {
            spinner.classList.add('hidden');

            resetForm()

            // create alert

            const alertDone = document.createElement('P');
            alertDone.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
            alertDone.textContent = "Mail Send It"

            form.appendChild(alertDone)

            setTimeout(() => {
                alertDone.remove()
            }, 3000);
            
        }, 3000);


        
    }

    function validate(e) {

        if(e.target.value.trim() === ''){
            showAlert(`The ${e.target.id} is mandatory`, e.target.parentElement);
            email[e.target.name] = ''
            proveEmail();
            return;
            
        }

        if(e.target.id === 'email' && !validateEmail(e.target.value)) {
            showAlert('Email is not valid', e.target.parentElement);
            email[e.target.name] = ''
            proveEmail();
            return;

            
        }

        cleanAlert(e.target.parentElement);

        //Assing Values

        email[e.target.name] = e.target.value.trim().toLowerCase();
        
        // Prove object email
        proveEmail()
    }

    function showAlert(message, reference) {

        // Alert Exist?
       cleanAlert(reference);
       
        //Alert in HTML
        const error = document.createElement('P');
        error.textContent = message
        error.classList.add('bg-red-500', 'text-white', 'p-2', 'text-center');


        // HTML Injection to the form
        reference.appendChild(error)
    }

    function cleanAlert(reference) {
        const alert = reference.querySelector('.bg-red-500');
        if(alert) {
            alert.remove();
        }

    }

    function validateEmail(email) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const result = regex.test(email)
        return result;
    }

    function proveEmail() {
        
        if(Object.values(email).includes('')) {
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return;

        }
         btnSubmit.classList.remove('opacity-50');
         btnSubmit.disabled = false;
         return;
        
    }

    function resetForm() {
        email.email = '',
        email.subject = '';
        email.message = ''

        form.reset();
        proveEmail();
    }


})


