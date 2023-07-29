export const validateInputs = (error, inputNameToMessage, minLength, maxLenght) => {
   if(!error){
      return false
   }
   if(error.type === 'required'){
      return `No has completado el campo del ${inputNameToMessage}`   
   }
   if(error.type === 'minLength'){
      return `El campo ${inputNameToMessage} tiene que ser mayor a ${minLength} caracteres`   
   }
   if(error.type === 'maxLength'){
      return `El campo ${inputNameToMessage} tiene que ser menor a ${maxLenght} caracteres`   
   }
}