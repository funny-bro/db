const BuildingDao = require('../db/building/dao')

describe('building.dao : single usage', async ()=>{
  const timestamp = (new Date()).getTime()

  it('create', async ()=>{
    const res = await BuildingDao.create({
      cityCode: `cityCode-${timestamp}`,
      townCode: `townCode-${timestamp}`,
      sectCode: `sectCode-${timestamp}`,
      landBuildMax: timestamp,
      project: `project-${timestamp}`,
    })

    expect(res.cityCode).toBe(`cityCode-${timestamp}`)
    expect(res.townCode).toBe(`townCode-${timestamp}`)
    expect(res.sectCode).toBe(`sectCode-${timestamp}`)
    expect(res.landBuildMax).toBe(timestamp)
    expect(res.project).toBe(`project-${timestamp}`)
    expect(typeof res.updatedAt).toBe('object') //date object
    expect(typeof res.createdAt).toBe('object') //date object
  })

  it('update & findOne', async ()=>{
    const cityCode = `cityCode-${timestamp}`
    const sectCode = `foo-${timestamp}`
    await BuildingDao.update({sectCode}, {cityCode})
    const res =  await BuildingDao.findOne({sectCode})
    expect(res.cityCode).toBe(cityCode)
  })

  it('desctory', async ()=>{
    const cityCode = `cityCode-${timestamp}`
    const res1 =  await BuildingDao.findOne({cityCode})
    expect(res1.cityCode).toBe(cityCode)

    await BuildingDao.destroy({cityCode})
    const res2 =  await BuildingDao.findOne({cityCode})
    expect(res2).toBe(null)
  })
})


describe('building.dao : multi usage', async ()=>{
  const timestamp = (new Date()).getTime()

  it('create 2 building', async ()=>{
    const common = 987
    await BuildingDao.create({
      cityCode: `cityCode-1-${timestamp}`,
      townCode: `townCode-1-${timestamp}`,
      sectCode: `sectCode-1-${timestamp}`,
      project: `project-1-${timestamp}`,
      landBuildMax: common,
    })

    await BuildingDao.create({
      cityCode: `cityCode-2-${timestamp}`,
      townCode: `townCode-2-${timestamp}`,
      sectCode: `sectCode-2-${timestamp}`,
      project: `project-2-${timestamp}`,
      landBuildMax: common,
    })

    const res0 = await BuildingDao.findAndCountAll({landBuildMax: common})

    expect(res0.count).toBe(2)
    expect(res0.data[0].cityCode).toBe(`cityCode-1-${timestamp}`)
    expect(res0.data[1].cityCode).toBe(`cityCode-2-${timestamp}`)

    await BuildingDao.destroy({landBuildMax: common})
    const res1 = await BuildingDao.findAndCountAll({landBuildMax: common})
    expect(res1.count).toBe(1)

    await BuildingDao.destroy({landBuildMax: common})
    const res2 = await BuildingDao.findAndCountAll({landBuildMax: common})
    expect(res2.count).toBe(0)
  })
})