export type colors = keyof typeof COLORS ;

export const COLORS:Record<string,string>  = {
    blue: 'bg-blue-500 hover:bg-blue-800 text-white focus:ring-blue-30',
    red: 'bg-red-500 hover:bg-red-800 text-white focus:ring-red-30',
    yellow: 'bg-amber-400 hover:bg-amber-600 text-white focus:ring-amber-30',
    pink: 'bg-pink-500 hover:bg-pink-800 text-white focus:ring-pink-30',
    gray: 'bg-gray-500 hover:bg-gray-800 text-white focus:ring-gray-30',
    violet: 'bg-violet-500 hover:bg-violet-800 text-white focus:ring-violet-30',
    green: 'bg-green-500 hover:bg-green-800 text-white focus:ring-green-30',
    success: 'bg-success-700 hover:bg-success-800 focus:ring-success-300 text-white',
    danger: 'bg-red-700 hover:bg-red-800 focus:ring-red-300 text-white',
    'gray-light': 'bg-gray-200 hover:bg-gray-500 focus:ring-gray-50 text-gray-700 hover:text-white',
    primary: 'bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 text-white',
    sky: 'bg-sky-700 hover:bg-sky-800 focus:ring-sky-300 text-white'
  };

  export const COLORS_ONLY_BG:Record<string,string>  = {
    blue: 'bg-blue-400',
    red: 'bg-red-400',
    yellow: 'bg-amber-300',
    pink: 'bg-pink-400',
    gray: 'bg-gray-400',
    violet: 'bg-violet-400',
    green: 'bg-green-400',
    success: 'bg-success-400',
    danger: 'bg-red-400',
    'gray-light': 'bg-gray-200',
    primary: 'bg-primary-400',
    sky: 'bg-sky-400'
  };

  export const COLORS_NAVBAR:Record<string,string>  = {
    blue: 'bg-blue-500',
    red: 'bg-red-500',
    yellow: 'bg-amber-400',
    pink: 'bg-pink-500',
    gray: 'bg-gray-500',
    violet: 'bg-violet-500',
    green: 'bg-green-500',
    success: 'bg-success-700',
    danger: 'bg-red-700',
    'gray-light': 'bg-gray-200',
    primary: 'bg-primary-700',
    sky: 'bg-sky-700'
  };