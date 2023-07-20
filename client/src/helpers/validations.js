export const validateInput = (inputType, inputValue) => {
   let validation = ''
   switch (inputType) {
      case 'name':
         if(inputValue.lenght < 3){
            return validation = 'el username tiene que ser mayor a 3 letras'
         }
         break;
   
      default: console.log('default')
         break;
   }
}