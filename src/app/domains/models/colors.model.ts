export type colors = keyof typeof COLORS ;

export const COLORS:Record<string,string>  = {
    blue: 'bg-blue-700 hover:bg-blue-800 text-white focus:ring-blue-30',
    red: 'bg-red-700 hover:bg-red-800 text-white focus:ring-red-30',
    yellow: 'bg-yellow-700 hover:bg-yellow-800 text-white focus:ring-yellow-30',
    gray: 'bg-gray-700 hover:bg-gray-800 text-white focus:ring-gray-30',
    violet: 'bg-violet-700 hover:bg-violet-800 text-white focus:ring-violet-30',
    green: 'bg-green-700 hover:bg-green-800 text-white focus:ring-green-30',
    success: 'bg-success-700 hover:bg-success-800 focus:ring-success-300 text-white',
    danger: 'bg-red-700 hover:bg-red-800 focus:ring-red-300 text-white',
    'gray-light': 'bg-gray-200 hover:bg-gray-500 focus:ring-gray-50 text-gray-700',
    primary: 'bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 text-white',
    sky: 'bg-sky-700 hover:bg-sky-800 focus:ring-sky-300 text-white'
  };