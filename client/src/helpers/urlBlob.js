export async function urlToBlob(url) {
   try {
      const response = await fetch(url);
      if (!response.ok) {
         throw new Error(`No se pudo obtener la imagen desde la URL. Código de estado: ${response.status}`);
      }
      const blob = await response.blob();
      return blob;
   } catch (error) {
      console.error(error);
      return null;
   }
}

export async function blobToBase64(blob) {
   return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
         resolve(reader.result);
      };

      reader.onerror = reject;

      reader.readAsDataURL(blob);
   });
}