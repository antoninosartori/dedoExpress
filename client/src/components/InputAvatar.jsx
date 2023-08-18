import './InputAvatar.css'
import addAvatarIcon from '../assets/addAvatar.svg'

export default function InputAvatar({ register, handleAvatarChange, avatarPreview }) {
   return (
      <div className='inputAvatar-container'>
         <div className='inputFile-container'>
            <input
               {...register('avatar')}
               type="file"
               accept='image/png, image/jpeg'
               onChange={handleAvatarChange} />
            <img src={avatarPreview ? avatarPreview : addAvatarIcon} alt="avatar de tu usuario" />
         </div>
         <span>Foto de perfil</span>
      </div>
   )
}