interface PixelToastProps {
  message: string
  type?: 'success' | 'error'
}

function PixelToast({ message, type }: PixelToastProps) {
  const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500'

  return <div className={`flex items-center justify-center text-white px-4 py-2 ${bgColor}`}>{message}</div>
}

export default PixelToast
