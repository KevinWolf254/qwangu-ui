export interface DecodedToken {
  user: {
    isCredentialsExpired: boolean,
    isEnabled: boolean,
    fullNames: {
      firstName: string,
      otherNames: string,
      surname: string
    },
    isAccountLocked: boolean,
    isAccountExpired: boolean
  },
  authorities: Array<string>
}
