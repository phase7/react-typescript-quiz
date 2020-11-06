// export const shuffleArray = (array: string[]) => {
//     [...array].sort(() => Math.random() - 0.5)
// }


export const shuffleArray = (array: any[]) =>
  [...array].sort(() => Math.random() - 0.5);