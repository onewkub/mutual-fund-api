import { INAVFund } from '../../interface/SEC'
import { httpRequest_SEC_daily } from '../../lib/sec_api'
// import { getFundSQL } from '../Fund'


export async function getNAVfromCurrentToRegist(project_id: string) {
  // const project = await getFundSQL(project_id)
  //0-11

  // console.log(currMouth, currYear)
  let n = 0
  let NAVs = []
  let currDate = new Date()

  while (n <= 40) {
    // console.log(currMouth)
    let currMouth = currDate.getUTCMonth() + 1
    let currYear = currDate.getUTCFullYear()
    NAVs.push(getNAV(project_id, currMouth, currYear))
    currDate.setMonth(currDate.getMonth() - 1)
    // console.log(currDate)
    n++
  }

  const res = (await Promise.all(NAVs)).filter((element) => element !== '')

  const date = (res.map((element) => element.nav_date)).reverse()
  const nav = (res.map((element) => element.last_val)).reverse()

  const rlt = { date, nav }
  // console.log(rlt)
  return rlt
  // console.log(project)
}

async function getNAV(project_id: string, mouth: number, year: number) {
  try {
    let day = 1

    const nav = await httpRequest_SEC_daily.get<INAVFund>(
      `/FundDailyInfo/${project_id}/dailynav/${findWorkingDayOnMouth(
        mouth,
        year,
        day,
      )}`,
    )
    return nav.data
  } catch (err) {
    console.log(err)
    return err
  }
}

function findWorkingDayOnMouth(mouth: number, year: number, start: number = 1) {
  let curDay = start
  // console.log(year, mouth, curDay)
  while (true) {
    let currDate = new Date(
      `${year}-${`${mouth}`.padStart(2, '0')}-${`${curDay}`.padStart(2, '0')}`,
    )
    // console.log(currDate)
    if (currDate.getDay() !== 0 && currDate.getDay() !== 6) {
      return currDate.toISOString().split('T')[0]
    }
    curDay++
  }
}

export async function test() {
  await getNAVfromCurrentToRegist('M0131_2562')
}

// test()
