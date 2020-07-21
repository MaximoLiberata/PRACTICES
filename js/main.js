
var Form = document.getElementById("Form"),
    Usuario = document.getElementById("Usuario"),
    Nombre = document.getElementById("Nombre"),
    Password = document.getElementById("Password"),
    PasswordRepeat = document.getElementById("PasswordRepeat"),
    PasswordSee = document.getElementById("PasswordSee"),
    Correo = document.getElementById("Correo"),
    Telefono = document.getElementById("Telefono"),
    BtnEnviar = document.getElementById("BtnEnviar"),
    inputs = document.getElementsByTagName("input");

window.onload = () => {

    for(i = 0; i < inputs.length; i++)
    {
        inputs[i].value = "";
    }

    var maskTelefono = {
        mask: '000-000-0000'
    };
    
    IMask(Telefono, maskTelefono);
}


function AddCorrectParcial(element)
{
    element.classList.remove("Form_Input_Write_Error");
    element.parentElement.children[1].classList.remove("Form_Input_Icon_Error");
    element.parentElement.parentElement.children[2].classList.remove("Form_Input_Error_Activo");

    element.parentElement.children[1].className = "fas fa-check-circle Form_Input_Icon";
}

function AddErrorParcial(element)
{
    element.classList.add("Form_Input_Write_Error");
    element.parentElement.children[1].className = "fas fa-times-circle Form_Input_Icon";
    element.parentElement.children[1].classList.add("Form_Input_Icon_Error");
}
    
function AddCorrect(element)
{
    element.classList.remove("Form_Input_Write_Error");
    element.parentElement.children[1].classList.remove("Form_Input_Icon_Error");
    element.parentElement.parentElement.children[2].classList.remove("Form_Input_Error_Activo");

    element.parentElement.children[1].className = "fas fa-check-circle Form_Input_Icon";
    element.parentElement.children[1].classList.add("Form_Input_Icon_Valido");
}

function AddError(element)
{
    element.classList.add("Form_Input_Write_Error");
    element.parentElement.children[1].className = "fas fa-times-circle Form_Input_Icon";
    element.parentElement.children[1].classList.add("Form_Input_Icon_Error");
    element.parentElement.parentElement.children[2].classList.add("Form_Input_Error_Activo");
}

function ValidateRegex(element, condition)
{
    var text = element.value;

    AddCorrect(element);

    if(!condition.test(text))
    {
        AddError(element);
    }
}


Usuario.addEventListener("keyup", (e) => {
    var regEx = /^[(a-z_*)|(0-9)*]{4,16}$/gi;
    ValidateRegex(Usuario, regEx);
});


Nombre.addEventListener("keyup",  (e) => {
    var regex = /^[a-zA-Z]+[\sa-zA-Z]*$/g;
    ValidateRegex(Nombre, regex);
});


Password.addEventListener("keyup", (e) => {

    var text1 = Password.value,
        text2 = PasswordRepeat.value,
        regex = /^[(a-z_*@*-@)|(0-9)*]{4,16}$/gi;
    ValidateRegex(Password, regex);

    if(text1 != text2)
    {
        AddError(PasswordRepeat);
    }
    else
    {
        AddCorrect(PasswordRepeat);
    }

});


PasswordRepeat.addEventListener("keyup", (e) => {

    var text1 = Password.value,
        text2 = PasswordRepeat.value,
        regex = /^[(a-z_*@*-@)|(0-9)*]{4,16}$/gi;
    ValidateRegex(PasswordRepeat, regex);

    if(text1 != text2)
    {
        AddError(PasswordRepeat);
    }
    else
    {
        AddCorrect(PasswordRepeat);
    }

});


Correo.addEventListener("keyup", (e) => {
    var regex = /^[\.*\-*\w]{1,60}@(?:[a-z]{2,20})\.(?:[a-z]){1,15}$/i;
    ValidateRegex(Correo, regex);
});


Telefono.addEventListener("keypress", (e) => {
    if(e.charCode == 46 || e.charCode == 8 || e.charCode == 37 || e.charCode == 39) { }
    else if(e.charCode < 48 || e.charCode > 57)
    {
        e.preventDefault();
    }
});


Telefono.addEventListener("keyup", (e) => {
    if(this.value != "")
    {
        var regex = /^[0-9\-\(\)]{12}$/;
        ValidateRegex(Telefono, regex);
    }
    else
    {
        AddCorrectParcial(Telefono);
    }
});


PasswordSee.addEventListener("mousedown", (e) => {
    Password.type = "text";
    PasswordRepeat.type = "text";
});


PasswordSee.addEventListener("mouseup", (e) => {
    Password.type = "password";
    PasswordRepeat.type = "password";
});


BtnEnviar.addEventListener("click", (e) => {

    var validar = true,
        array = new Array;

    for(i = 0; i < inputs.length; i++)
    {
        if(inputs[i].name != "BtnEnviar" && inputs[i].name != "Telefono" && inputs[i].value == "")
        {
            array.push(inputs[i]);
            validar = false;
        }
        else if(inputs[i].name != "BtnEnviar" && inputs[i].classList.contains("Form_Input_Write_Error"))
        {
            if(!array.includes(inputs[i]))
            {
                array.push(inputs[i]);
            }
            validar = false;
        }
    }
    
    if(validar)
    {
        Form.submit();
    }
    else
    {
        for(i = 0; i < array.length; i++)
        {
            AddErrorParcial(array[i]);
        }
    }

});