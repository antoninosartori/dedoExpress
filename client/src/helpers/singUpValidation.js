import validarCorreoElectronico from "./validateEmail"

export default function singUpValidation(name, username, email, password, repeatedPassword, cellphone, avatarBase64) {
   const regex = /^[0-9]*$/
   const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/

   if (!name) {
      return { message: 'Por favor, escribe tu nombre' }
   }
   else if (regex.test(name)) {
      return { message: 'Tu nombre no puede contener numeros' }
   }
   else if (name.length < 3) {
      return { message: 'Tu nombre debe ser mayor a 3 letras' }
   }
   else if (name.length > 30) {
      return { message: 'Tu nombre no puede ser tan largo' }
   }
   else if (!username) {
      return { message: 'Por favor, escribe un username' }
   }
   else if (username.length < 3) {
      return { message: 'Por favor, escribe un username mas largo' }
   }
   else if (username.length > 30) {
      return { message: 'Por favor, escribe un username mas corto' }
   }
   else if (!email) {
      return { message: 'Por favor, escribe tu email' }
   }
   else if (!validarCorreoElectronico(email)) {
      return { message: 'Por favor, un email correcto' }
   }
   else if (!password) {
      return { message: 'Por favor, escribe tu contraseña' }
   }
   else if (!regexPassword.test(password)) {
      return { message: 'Tu contraseña debe ser entre 8 y 30 caracteres. Debe tener al menos una letra minuscula y al menos una mayuscula. Debe tener al menos un numero y un caracter especial(# $ % & ! > ? <)' }
   }
   else if (!repeatedPassword) {
      return { message: 'Por favor, escribe tu contraseña nuevamente' }
   }
   else if (repeatedPassword !== password) {
      return { message: 'Tus contraseñas no coinciden' }
   }
   else if (!cellphone) {
      return { message: 'Por favor, escribe tu numero de celular' }
   }
   else if (cellphone.length !== 10) {
      return { message: 'Tu numero de celular es muy largo o muy corto. Recuerda agregar la caracteristica sin el numero 15' }
   }
   else if (!avatarBase64) {
      return { message: 'Por favor, sube una foto de perfil' }
   }
}