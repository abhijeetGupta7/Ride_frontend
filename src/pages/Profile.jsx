import { getAutoCompleteSuggestions } from "../apis/map.api"
import UserLogoutButton from "../components/UserLogoutButton"

async function some(params) {
  const a=await getAutoCompleteSuggestions(params)
  console.log(a);
}

const Profile = () => {
  return (
    <div>

      <button onClick={() => {
        some('delhi')
      }}> Check </button>

      Profile
      <UserLogoutButton />
    </div>
  )
}

export default Profile
