async function updateUsersWithResetToken() {
   try {
      // Conecta a la base de datos
      await connect(connectionString);

      console.log('Database connected');

      // Encuentra todos los usuarios que no tienen un resetToken
      const usersToUpdate = await User.find({ resetToken: { $exists: false } });

      // Itera sobre los usuarios y agrega el campo resetToken
      for (const user of usersToUpdate) {
         user.resetToken = null; // O puedes asignarle un valor por defecto
         await user.save();
      }

      console.log('Campos resetToken agregados a los usuarios existentes');

      //   // Cierra la conexión a la base de datos
      await connection.close();
      console.log('Database connection closed');
   } catch (error) {
      console.error('Error durante la actualización:', error);
   }
}

async function getOldestTravel (){
   try {
      await connect(connectionString)
      console.log('Database connected');
      const oldTravels = await Travel.find({})
      console.log(oldTravels)
   } catch (error) {
      console.error('Error durante la actualización:', error);
   }
}

// Llama a la función de actualización
//  updateUsersWithResetToken();