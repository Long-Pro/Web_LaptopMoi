export const YMDTHMtoDMY=(datetime)=>{//2021-12-15T15:44:28.561Z -> 15/12/2021
  let [date,time] =datetime.split('T')
  let [y,m,d]=date.split('-')
  return [d,m,y].join('/')
}
export const YMDTHMtoHMDMY=(datetime)=>{//2021-12-15T15:44:28.561Z ->15:44 15/12/2021
  let [date,time] =datetime.split('T')
  let [y,m,d]=date.split('-')
  let [h,mi]=time.split(':')
  return [h,mi].join(':')+' '+[d,m,y].join('/')
}