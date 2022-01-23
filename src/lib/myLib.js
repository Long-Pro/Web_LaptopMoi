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
export const DatetimeToYMD=(d)=>{//Sat Jan 15 2022 15:18:57 GMT+0700 (Indochina Time) -> 2020-12-15
  var month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [year, month, day].join('-')
}
export const YMDTHMtoObjDate=(str)=>{//2021-01-01T00:00:00.000+00:00 -> Sat Jan 15 2022 15:18:57 GMT+0700 (Indochina Time) 
  const objDate = new Date();

  let [date,time] =str.split('T')
  let [y,m,d]=date.split('-')
  objDate.setFullYear(parseInt(y))
  objDate.setMonth(m-1)
  objDate.setDate(d)
  objDate.setHours(0)
  

  return objDate
}