import './EmptyComponent.css'

export default function EmptyComponent() {
   const defaultImg = 'https://www.primeraescuela.com/imagestn/cpl/animals/donkey-2-266w.gif'
  return (
    <section className='emptyComponent-container'>
      <p>ups, no se ha encontrado nada</p>
      <img src={defaultImg} alt="no se ha encontrado viajes, mulita" />
    </section>
  )
}
