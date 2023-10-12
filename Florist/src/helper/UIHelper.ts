import { useLoadingStore } from '@/stores/LoadingManager'
export function ShowLoading() {
  const { setLoading } = useLoadingStore()
  setLoading(true)
}

export function HideLoading() {
  const { setLoading } = useLoadingStore()
  setLoading(false)
}

export function formatNumber(n: number) {
  return n
    .toString()
    .replace(/\D/g, '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export function isNullorEmpty(value: string) {
  if (value == null || value == '') {
    return true
  }
  return false
}

export function validatePhone(phoneNumber: string) {
  const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g
  return phoneNumber.match(regexPhoneNumber) ? true : false
}
