import { ROLES } from './common'

export const permissionGroups = (user) => {
  if (!user || !user.role || !ROLES.includes(user.role)) {
    return false
  }
  switch (user.role) {
    case 'seller':
      sellerPermissions()
      break;
    case 'leader':
      leaderPermissions()
      break;
    case 'manager':
      managerPermissions()
      break;
    case 'root':
      rootPermissions()
      break;
    default:
      break;
  }
  return true
}

const sellerPermissions = () => {
  return true
}

const leaderPermissions = () => {
  return true
}

const managerPermissions = () => {
  return true
}

const rootPermissions = () => {
  return true
}
