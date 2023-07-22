import './Avatar.css'

export default function Avatar({ avatarSrc, username }) {
   return (
      <img className='avatarImage' src={avatarSrc} alt={`usuario ${username}`} />
   )
}
