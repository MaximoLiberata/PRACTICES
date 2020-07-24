
const Form = document.getElementById('Form'),
      Telefono = document.getElementById('Telefono'),
      BtnEnviar = document.getElementById('BtnEnviar'),
      inputs = document.querySelectorAll('#Form input'); /*Selecciona todos los elementos dentro del elemento input
                                                           dentro del elemento con el id 'Form' (se debe de utilizar '#'
                                                           para declarar el id y el 'All' significa un grupo de elementos
                                                           esto devuelve un array de elementos)
                                                         */


const regExs = { //Creación de un array de objetos
    usuario: /^[a-zA-Z_*0-9*]{4,16}$/, //Expresiones regulares
    nombre: /^[a-zA-Z]+[\sa-zA-Z]*$/,
    password: /^[a-zA-Z_*@*\-*0-9*]{4,16}$/,
    correo: /^[\.*\-*\w]{1,60}@(?:[a-zA-Z]{2,20})\.(?:[a-zA-Z]){1,15}$/,
    telefono: /^[0-9\-]{12}$/
}


const AddCorrectParcial = (elementID) => { // = (parameters) => 'function arrow'
    let element = document.getElementById(elementID);
    element.classList.remove('Form_Input_Write_Error');
    element.parentElement.children[1].classList.remove('Form_Input_Icon_Error');
    element.parentElement.parentElement.children[2].classList.remove('Form_Input_Error_Activo');

    element.parentElement.children[1].className = 'fas fa-check-circle Form_Input_Icon';
}

const AddErrorParcial = (elementID) => {
    let element = document.getElementById(elementID);
    element.classList.add('Form_Input_Write_Error');
    element.parentElement.children[1].className = 'fas fa-times-circle Form_Input_Icon';
    element.parentElement.children[1].classList.add('Form_Input_Icon_Error');
}
    
const AddCorrect = (elementID) => {
    let element = document.getElementById(elementID);
    element.classList.remove('Form_Input_Write_Error');
    element.parentElement.children[1].classList.remove('Form_Input_Icon_Error');
    element.parentElement.parentElement.children[2].classList.remove('Form_Input_Error_Activo');
    element.parentElement.children[1].className = 'fas fa-check-circle Form_Input_Icon';
    element.parentElement.children[1].classList.add('Form_Input_Icon_Valido');
}

const AddError = (elementID) => {
    let element = document.getElementById(elementID);
    element.classList.add('Form_Input_Write_Error');
    element.parentElement.children[1].className = 'fas fa-times-circle Form_Input_Icon';
    element.parentElement.children[1].classList.add('Form_Input_Icon_Error');
    element.parentElement.parentElement.children[2].classList.add('Form_Input_Error_Activo');
}


const ValidatePasswords = () =>
{
    let password1 = document.getElementById('Password'),
        password2 = document.getElementById('PasswordRepeat');
        
    if(password1.value != password2.value)
    {
        AddError(password2.id);
    }
    else
    {
        AddCorrect(password2.id);
    }
    
}


const ValidateRegex = (elementID, value, condition) => {
    if(condition.test(value))
        AddCorrect(elementID);
    else
        AddError(elementID);
}


ValidateInput = (e) =>
{
    let name = e.target.name,
        ID = e.target.id,
        value = e.target.value;

    switch (name) {
        case 'Usuario':
        {
            ValidateRegex(ID, value, regExs.usuario);
            break;
        }
        case 'Nombre':
        {
            ValidateRegex(ID, value, regExs.nombre);
            break;
        }
        case 'Password':
        {
            ValidateRegex(ID, value, regExs.password);
            ValidatePasswords();
            break;
        }
        case 'PasswordRepeat':
        {
            ValidateRegex(ID, value, regExs.password);
            ValidatePasswords();
            break;
        }
        case 'Correo':
        {
            ValidateRegex(ID, value, regExs.correo);
            break;
        }
        case 'Telefono':
        {
            if(e.target.value != '')
            {
                ValidateRegex(ID, value, regExs.telefono);
            }
            else
            {
                AddCorrectParcial(ID);
            }
            break;
        }
    }
}


window.onload = () => {

    inputs.forEach(input => {
        input.value = '';
        input.addEventListener('keyup', ValidateInput);
    });

    var maskTelefono = {
        mask: '000-000-0000'
    };
    
    IMask(Telefono, maskTelefono);
}


Telefono.addEventListener('keypress', (e) => {
    if(e.charCode == 46 || e.charCode == 8 || e.charCode == 37 || e.charCode == 39) { }
    else if(e.charCode < 48 || e.charCode > 57)
    {
        e.preventDefault();
    }
});


PasswordSee.addEventListener('mousedown', (e) => {
    Password.type = 'text';
    PasswordRepeat.type = 'text';
});


PasswordSee.addEventListener('mouseup', (e) => {
    Password.type = 'password';
    PasswordRepeat.type = 'password';
});


BtnEnviar.addEventListener('click', (e) => {

    var validar = true;

    inputs.forEach(input => { //Solo se hace el forEach a un array

        if(input.name != 'BtnEnviar' && input.name != 'Telefono' && input.value == '')
        {
            AddErrorParcial(input.id);
            validar = false;
        }
        else if(input.name != 'BtnEnviar' && input.classList.contains('Form_Input_Write_Error'))
        {
            validar = false;
        }

    });
    
    if(validar)
    {
        Form.submit();
    }

});