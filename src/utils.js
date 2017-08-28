export const titleCase = str => str.replace(/\w\S*/g, txt => `${txt.charAt(0).toUpperCase()}${txt.substr(1).toLowerCase()}`)

export const lbs2kg = lb => lb / 2.2046

export const calories = (weight, metsVal, start, end) => {
  if (!weight) {
    return 'unknown'
  }
  end = end || Date.now()
  const time = (end - start) / 3.6e+6
  return (lbs2kg(weight) * time * metsVal) / 1000
}
