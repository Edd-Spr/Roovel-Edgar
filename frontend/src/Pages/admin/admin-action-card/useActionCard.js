import { useNavigate } from 'react-router-dom'

export default function useActionCard( path ) {
  const navigation = useNavigate()

  function handleClick() {
    navigation(path)
  }

  return {
    handleClick,
  }
}
